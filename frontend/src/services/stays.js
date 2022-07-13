import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getStaysCountByCity = async () => {
  const url = `${API_URL}/stays/count-by-city?cities=Medellín,Berlin,Masovia`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getStayTypesCount = async () => {
  const url = `${API_URL}/stays/count-by-type`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getFeaturedStays = async () => {
  const url = `${API_URL}/stays/featured`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getStays = async (destination, min = 0, max = 9999, type) => {
  /* Validate if type was passed as argument */
  const typeQuery = type ? `&type=${type}` : ''
  const url = `${API_URL}/stays?destination=${destination}${typeQuery}&minPrice=${min}&maxPrice=${max}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getStayDetail = async (id) => {
  const url = `${API_URL}/stays/${id}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getRoomsStatus = async (id, dateRange) => {
  const url = `${API_URL}/stays/${id}/rooms/status`
  console.log(dateRange)
  try {
    const response = await axios.post(url, dateRange)
    return response.data
  } catch (error) {
    console.error(error)
  }
}