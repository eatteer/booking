import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

export const reserveRoom = async (accessToken, roomId, datesRange) => {
  const url = `${API_URL}/reservations`
  const config = { headers: { Authorization: `Bearer ${accessToken}` } };
  const data = { roomId, ...datesRange }
  try {
    const response = await axios.post(url, data, config)
    return response.data
  } catch (error) {
    console.error(error)
  }
}