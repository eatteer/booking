import { createContext, useContext, useEffect, useState } from "react";
import { defaultDateRange } from "../config/defaultDateRange";
import { defaultFilters } from "../config/defaultFilters";

/* Read search state from local storage
and modify start date and end date from String to Date 
because [formateDateRange] does not work with strings */

const searchStateFromStorage = JSON.parse(localStorage.getItem('SearchContextState'))

if (searchStateFromStorage) {
  searchStateFromStorage.dateRange[0].startDate = new Date(searchStateFromStorage.dateRange[0].startDate)
  searchStateFromStorage.dateRange[0].endDate = new Date(searchStateFromStorage.dateRange[0].endDate)
}

const initialState = searchStateFromStorage || {
  destination: '',
  type: undefined,
  dateRange: defaultDateRange,
  filters: defaultFilters
}

const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState(initialState.destination)
  const [type, setType] = useState(initialState.type)
  const [dateRange, setDateRange] = useState(initialState.dateRange)
  const [filters, setFilters] = useState(initialState.filters)

  useEffect(() => {
    const state = { destination, dateRange, filters }
    localStorage.setItem('SearchContextState', JSON.stringify(state))
  }, [destination, dateRange, filters])

  const context = {
    destination,
    type,
    dateRange,
    filters,
    setDestination,
    setType,
    setDateRange,
    setFilters
  }

  return (
    <SearchContext.Provider value={context}>
      {children}
    </SearchContext.Provider >
  )
}

export const useSearchContext = () => {
  return useContext(SearchContext)
}