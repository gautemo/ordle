export const datesAreOnSameDay = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('dates should be same day', () => {
    const date1 = new Date(2022, 2, 3, 0, 0, 0)
    const date2 = new Date(2022, 2, 3, 0, 0, 1)
    expect(datesAreOnSameDay(date1, date2)).toEqual(true)
  })

  it('dates should be not be same day', () => {
    const date1 = new Date(2022, 2, 3, 0, 0, 0)
    const date2 = new Date(2022, 2, 2, 23, 59, 59)
    expect(datesAreOnSameDay(date1, date2)).toEqual(false)
  })
}
