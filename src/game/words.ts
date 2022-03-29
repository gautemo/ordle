import { today } from './today'
import {wordList} from './wordList'

const daysSinceStart = Math.floor((today.getTime() - new Date(2022, 0, 15).getTime()) / (24 * 60 * 60 * 1000))

const words = wordList.list
const solution = wordList.list[wordList.solutions[(daysSinceStart)%wordList.solutions.length]]
export { words, solution }