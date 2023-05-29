export const dateUtils = (date: string) => {
  return new Intl.DateTimeFormat('ru').format(Date.parse(date))
}
