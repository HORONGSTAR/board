import BoardItem from '../components/board/BoardItem'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchBoardByIdThunk, fetchBoardsThunk } from '../features/boardSlice'
import { Box } from '../styles/StyledComponent'

const BoardDetailPage = ({ isAuthenticated, user }) => {
   const { id } = useParams()
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { board, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <p>로딩중...</p>
   if (error) return <p>에러발생:{error}</p>

   return (
      <Box col max="1000px">
         {board && <BoardItem board={board} isAuthenticated={isAuthenticated} user={user} />}
      </Box>
   )
}

export default BoardDetailPage
