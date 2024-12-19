import { Box, Button, FakeBtn, Img, Span } from '../../styles/StyledComponent'
import { Link } from 'react-router-dom'
import React, { useCallback } from 'react'
import { deleteBoardThunk } from '../../features/boardSlice'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const BoardItem = ({ board, isAuthenticated, user }) => {
   const dispatch = useDispatch()

   const onClickDelete = useCallback(
      (id) => {
         const check = window.confirm('게시물을 삭제하시겠습니까?')
         if (!check) return
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 삭제중 오류 발생', error)
               alert('게시물 삭제 중 오류가 발생했습니다.')
            })
      },
      [dispatch]
   )

   return (
      <Box col>
         <Box>
            <h3>{board.title}</h3>
         </Box>
         {board.img && <Img src={`${process.env.REACT_APP_API_URL}${board.img}`} alt={board.alt} />}

         <Box>
            <Link to={`/my/${board.User.id}`}>
               <Span> {board.User.nick} </Span>
            </Link>
            <Span size="14px" theme="pale">
               {dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Span>
         </Box>
         <Box>
            <p>{board.content}</p>
         </Box>
         <Box>
            {board.Hashtags &&
               board.Hashtags.map((hashtag) => (
                  <Span theme="point" key={board.id + hashtag.title} p="5px" size="14px">
                     #{hashtag.title}
                  </Span>
               ))}
         </Box>
         <Box>
            <Button>스크랩</Button>

            {isAuthenticated && board.User.id === user.id && (
               <>
                  <Link to={`/boards/edit/${board.id}`}>
                     <FakeBtn>수정</FakeBtn>
                  </Link>
                  <Button onClick={() => onClickDelete(board.id)}>삭제</Button>
               </>
            )}
         </Box>
      </Box>
   )
}

export default BoardItem
