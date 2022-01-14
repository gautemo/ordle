import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import fs from 'fs'

const wordsResponse = await fetch('https://www2.scrabbleforbundet.no/?page_id=3937')
const wordsText = await wordsResponse.text()
const wordsDocument = new JSDOM(wordsText).window.document
const allWords = [...wordsDocument.querySelectorAll('.entry-content p')].filter(e => e.childElementCount === 0)

const browser = await puppeteer.launch()

async function findWords(words: string[]) {
  const result = []
  const page = await browser.newPage()
  for (const word of words) {
    await page.goto(`https://ordbokene.no/bm/w/${word.toLowerCase()}`)
    const explanation = await findExplanation(page)
    if (explanation) {
      result.push({ word, explanation })
    }
  }
  console.log(`found ${result.length} words for section`)
  return result
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function findExplanation(page: puppeteer.Page, tries = 0): Promise<string | undefined> {
  const explanationLi = await page.$('.explanation')
  if (explanationLi) {
    return await page.evaluate(el => el.innerText, explanationLi)
  }
  if(await page.$('.error')) return
  if (tries < 10) {
    await sleep(500)
    return findExplanation(page, tries + 1)
  }
}

const result = await Promise.all(allWords.map(words => words.textContent?.split(' ') ?? []).map(words => findWords(words)))

await browser.close()
fs.writeFile('../src/words/list.json', JSON.stringify(result.flat(), null, 2), 'utf8', () => console.log('done'))

