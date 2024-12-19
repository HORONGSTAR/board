import BoardForm from '../components/board/BoardForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { fetchBoardByIdThunk, updateBoardThunk } from '../features/boardSlice'
import { Box } from '../styles/StyledComponent'

const BoardEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { board, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (boardData) => {
         dispatch(updateBoardThunk({ id, boardData }))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩중...</p>
   if (error) return <p>에러발생:{error}</p>

   return (
      <Box col max="1000px">
         {board && <BoardForm onSubmit={handleSubmit} initialValues={board} />}
      </Box>
   )
}

export default BoardEditPage
