export const extractDatesFromDateRange = (dateRange) => {
  const startDate = dateRange[0].startDate
  const endDate = dateRange[0].endDate
  const dates = []
  const date = new Date(startDate)

  while (date <= endDate) {
    dates.push(new Date(date).getTime())
    date.setDate(date.getDate() + 1)
  }

  return dates
}