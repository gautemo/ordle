import { today } from './today'
import wordList from './wordList.json'

function daysSinceStart(date: Date) {
  const dateWithoutHours = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.round((dateWithoutHours.getTime() - new Date(2022, 0, 15).getTime()) / (24 * 60 * 60 * 1000))
}

const words = wordList.list
const solution = wordList.list[wordList.solutions[daysSinceStart(today) % wordList.solutions.length]!]!

export { words, solution }

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('days since start should be correct', () => {
    const date = new Date(2022, 3, 3, 0, 0, 0)
    const result = daysSinceStart(date)
    expect(result).toBe(78)
  })
}
