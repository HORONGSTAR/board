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

export const checkAuthStatus = async (credentials) => {
   try {
      const response = await boardApi.get('/auth/status', credentials)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}

export const createPost = async (postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await boardApi.post('/post', postData, config)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}

export const updatePost = async (id, postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await boardApi.put(`post/${id}`, postData, config)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}

export const deletePost = async (id) => {
   try {
      const response = await boardApi.delete(`post/${id}`)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}
export const getPostById = async (id) => {
   try {
      const response = await boardApi.get(`post/${id}`)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}

export const getPosts = async (page) => {
   try {
      const response = await boardApi.get(`post?page=${page}`)
      return response
   } catch (error) {
      console.error(`/API Request 오류: ${error.message}`)
      throw error
   }
}
