export const generateFiltersText = (filters) => {
  const { adultsQuantity, childrenQuantity, roomsQuantity } = filters
  const filtersText = `${adultsQuantity} Adult • ${childrenQuantity} Children • ${roomsQuantity} Room`
  return filtersText
}