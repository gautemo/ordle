import { readFileSync, createReadStream, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { once } from 'node:events'
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
let page = await browser.newPage()

const currentWordList: { solutions: number[], list: string[] } = JSON.parse(readFileSync('src/game/wordList.json', 'utf-8'))
const fiveLetterWords = readFileSync('words/data/nsf2023.txt', 'utf-8')
  .split(/\r?\n/)
  .filter(w => w.length === 5)
const bannedWords = readFileSync('words/data/banned.txt', 'utf-8').split(/\r?\n/)
const notBannedWords = readFileSync('words/data/ignore_ban.txt', 'utf-8').split(/\r?\n/)

const ordbok = await getOrdbok()
await browser.close()
const avisNgram = await getNgram('ngram-2022-digavis-unigram.csv', 'digavis.json', false)
const bokNgram = await getNgram('ngram-2022-digibok-unigram.csv', 'digibok.json', true)

const result = fiveLetterWords.map(word => {
  const inOrdbok = ordbok.find(w => w.word === word)
  if(!inOrdbok) {
    return { word, validSolution: false }
  }
  if(!notBannedWords.includes(word) && (bannedWords.includes(inOrdbok.word) || bannedWords.some(banned => inOrdbok.information.includes(banned)))) {
    return { word, validSolution: false }
  }
  const avisWord = avisNgram.find(w => w.word === word)
  const bokWord = bokNgram.find(w => w.word === word)
  const bestFreq = Math.max(avisWord?.frequency ?? 0, bokWord?.frequency ?? 0)
  return { word, validSolution: bestFreq >= 1_500 }
})

const alradyPlayed = currentWordList.solutions.slice(0, (daysSinceStart() % currentWordList.solutions.length) + 1)
const alradyPlayedWords = currentWordList.list.filter((_, i) => alradyPlayed.includes(i)).map(it => it.toLowerCase())
const solutionIndexes = result.map((w, i) => (w.validSolution ? i : null)).filter(i => i !== null)
const solutions = Object.groupBy(solutionIndexes, i => {
  const word = result[i]!.word
  if(alradyPlayedWords.includes(word)) {
    return 'played'
  }
  return 'unplayed'
})

const words = {
  solutions: [...solutions.played ?? [], ...solutions.unplayed?.sort(() => 0.5 - Math.random()) ?? []],
  list: result.map(w => w.word)
}

// writeFileSync('words/data/testWordList.json', JSON.stringify(words, null, 2))
writeFileSync('src/game/wordList.json', JSON.stringify(words))

type Ngram = { word: string; frequency: number }
async function getNgram(filename: string, processedFilename: string, withLang: boolean): Promise<Ngram[]> {
  try {
    const data = readFileSync(`words/data/${processedFilename}`, 'utf-8')
    return JSON.parse(data)
  } catch {
    const readLine = createInterface({
      input: createReadStream(`words/data/${filename}`, 'utf-8'),
      crlfDelay: Infinity,
    })
    const words: Ngram[] = []
    readLine.on('line', line => {
      const data = line.split(',')
      const word = data[0]!.toLowerCase().replaceAll('"', '')
      const lang = withLang ? data[1] : null
      const frequency = Number(withLang ? data[2] : data[1])
      const isWord = /^([a-z]|æ|ø|å)+$/i.test(word)
      if (isWord && word.length === 5 && frequency && (lang === null || lang === 'nob') && fiveLetterWords.includes(word)) {
        const exists = words.find(w => w.word === word)
        if(exists) {
          exists.frequency += frequency
        } else {
          words.push({ word, frequency })
        }
      }
    })
    await once(readLine, 'close')
    writeFileSync(`words/data/${processedFilename}`, JSON.stringify(words, null, 2))
    return words
  }
}

type OrdbokWord = { word: string; information: string }
async function getOrdbok(): Promise<OrdbokWord[]> {
  try {
    const data = readFileSync(`words/data/ordbok.json`, 'utf-8')
    return JSON.parse(data)
  } catch {
    const words: OrdbokWord[] = []
    for (const word of fiveLetterWords) {
      const wordInOrdbok = await getWordOrdbok(word, 1_000)
      if (wordInOrdbok) {
        words.push(wordInOrdbok)
      }
    }
    writeFileSync(`words/data/ordbok.json`, JSON.stringify(words, null, 2))
    return words
  }
}

async function getWordOrdbok(word: string, retryIn: number): Promise<OrdbokWord | null> {
  try {
    await page.goto(`https://ordbokene.no/nob/bm/${word}`)
    const articleEl = await page.$('.article-title')
    if(articleEl) {
      const definitionEl = await page.$('.definitions')
      const expressionsEl = await page.$('.expressions')
      let information = ''
      if (definitionEl) {
        const definition = await page.evaluate(el => el.textContent, definitionEl)
        if (definition) {
          information += definition
        }
      }
      if (expressionsEl) {
        const expression = await page.evaluate(el => el.textContent, expressionsEl)
        if (expression) {
          information += expression
        }
      }
      if(!information) {
        console.error(`${word}: missing information`)
      }
      return { word, information }
    }
    try {
      await page.waitForSelector('.suggestions', { timeout: 2_000 })
    } catch {
      // ignore
    }
    const suggestionsEl = await page.$('.suggestions')
    if (suggestionsEl) {
      const text = await page.evaluate(el => el.textContent, suggestionsEl)
      if (text && text.includes('Bøyde former')) {
        return { word, information: text }
      }
    }
    return null
  } catch (e) {
    if (retryIn > 60_000 * 5) {
      console.error(e)
      throw new Error('retry also failed')
    }
    await sleep(retryIn)
    await page.close()
    page = await browser.newPage()
    return getWordOrdbok(word, (retryIn *= 4))
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function daysSinceStart() {
  const today = new Date()
  const dateWithoutHours = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((dateWithoutHours.getTime() - new Date(2022, 0, 15).getTime()) / (24 * 60 * 60 * 1000))
}