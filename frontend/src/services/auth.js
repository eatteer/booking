import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const register = async (credentials) => {
  const url = `${API_URL}/auth/register/client`
  try {
    const response = await axios.post(url, credentials)
    const user = response.data
    console.log(user)
  } catch (error) {
    throw error
  }
}

export const login = async (credentials) => {
  const url = `${API_URL}/auth/login`
  try {
    const response = await axios.post(url, credentials)
    const accessToken = response.data
    return accessToken
  } catch (error) {
    throw error
  }
}