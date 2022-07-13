import { format } from "date-fns"

export const formatDateRange = (dateRange) => {
  const initialDate = format(dateRange[0].startDate, 'MM/dd/yyyy')
  const endDate = format(dateRange[0].endDate, 'MM/dd/yyyy')
  return { initialDate, endDate }
}