import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, updateBoard, deleteBoard, getBoardById, getBoard } from '../api/boardApi'

export const createBoardThunk = createAsyncThunk(
   'boards/createBoard',
   async (boardData, { rejectWithValue }) => {
      try {
         const response = await createBoard(boardData)
         return response.data.board
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
      }
   }
)
export const updateBoardThunk = createAsyncThunk(
   'boards/updateBoard',
   async (data, { rejectWithValue }) => {
      const { id, boardData } = data
      try {
         const response = await updateBoard(id, boardData)
         return response.data.board
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
      }
   }
)
export const deleteBoardThunk = createAsyncThunk(
   'boards/deleteBoard',
   async (id, { rejectWithValue }) => {
      try {
         await deleteBoard(id)
         return id
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
      }
   }
)
export const fetchBoardByIdThunk = createAsyncThunk(
   'boards/getBoardById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await getBoardById(id)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
      }
   }
)
export const fetchBoardsThunk = createAsyncThunk(
   'boards/getBoard',
   async (page, { rejectWithValue }) => {
      try {
         const response = await getBoard(page)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
      }
   }
)
const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      boards: [],
      board: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchBoardByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload.board
         })
         .addCase(fetchBoardByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
