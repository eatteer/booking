export const calculateNights = (dateRange) => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const timeDiff = Math.abs(dateRange[0].startDate.getTime() - dateRange[0].endDate.getTime())
  const nights = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
  return nights + 1
}