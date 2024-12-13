import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export const registerUser = async (userData) => {
   try {
      const response = await boardApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}
export const loginUser = async (credentials) => {
   try {
      const response = await boardApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}
export const logoutUser = async (credentials) => {
   try {
      const response = await boardApi.get('/auth/logout', credentials)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}
