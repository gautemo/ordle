import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import fs from 'fs'

type Word = {
  word: string
  validSolution: boolean
}
const bannedWordsInSolution: string[] = [] // saved in gitignored banned.txt

const wordsResponse = await fetch('https://www2.scrabbleforbundet.no/?page_id=3937')
const wordsText = await wordsResponse.text()
const wordsDocument = new JSDOM(wordsText).window.document
const allWords = [...wordsDocument.querySelectorAll('.entry-content p')].filter(e => e.childElementCount === 0)

const browser = await puppeteer.launch()

async function findWords(words: string[]) {
  const result: Word[] = []
  const page = await browser.newPage()
  for (const word of words) {
    await page.goto(`https://ordbokene.no/bm/w/${word.toLowerCase()}`)
    const explanation = await findExplanation(page, '.explanation')
    const validSolution = Boolean(explanation) && !bannedWordsInSolution.some(ban => word.toLowerCase().includes(ban) || explanation?.toLowerCase().includes(ban))
    result.push({ word, validSolution })
  }
  console.log(`done with section containing ${result.length} words`)
  return result
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function findExplanation(page: puppeteer.Page, query: string, tries = 0): Promise<string | undefined> {
  const explanationLi = await page.$(query)
  if (explanationLi) {
    return await page.evaluate(el => el.innerText, explanationLi)
  }
  if (await page.$('.error')) return
  if (tries < 10) {
    await sleep(500)
    return findExplanation(page, query, tries + 1)
  }
}

const result = await Promise.all(allWords.map(words => words.textContent?.split(' ') ?? []).map(words => findWords(words)))

await browser.close()

const words = {
  solutions: result.flat().map((w,i) => w.validSolution ? i : null).filter(i => i !== null),
  list: result.flat().map(w => w.word)
}
words.solutions.sort(() => .5 - Math.random())

fs.writeFile('../src/game/wordList.json', JSON.stringify(words, null, 2), 'utf8', () => console.log('done'))
