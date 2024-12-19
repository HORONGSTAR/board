import BoardForm from '../components/board/BoardForm'
import { useCallback } from 'react'
import { createBoardThunk } from '../features/boardSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '../styles/StyledComponent'

function BoardCreatePage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSubmit = useCallback(
      (boardData) => {
         dispatch(createBoardThunk(boardData))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   )
   return (
      <Box col max="1000px">
         <BoardForm onSubmit={handleSubmit} />
      </Box>
   )
}

export default BoardCreatePage
