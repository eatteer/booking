const startDate = new Date()
const endDate = new Date()
startDate.setHours(0, 0, 0, 0)
endDate.setHours(0, 0, 0, 0)

export const defaultDateRange = [{
  startDate,
  endDate,
  key: 'selection'
}]