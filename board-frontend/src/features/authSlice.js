import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser } from '../api/boardApi'

export const registerUserThunk = createAsyncThunk(
   'auth/registerUser',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await registerUser(userData)
         return response.data.user
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '회원가입 실패')
      }
   }
)

export const loginUserThunk = createAsyncThunk(
   'auth/loginUser',
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await loginUser(credentials)
         return response.data.user
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '로그인 실패')
      }
   }
)
export const logoutUserThunk = createAsyncThunk(
   'auth/logoutUser',
   async (_, { rejectWithValue }) => {
      try {
         const response = await logoutUser()
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
      }
   }
)
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      loading: false,
      isAuthenticated: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = null
            state.isAuthenticated = false
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
