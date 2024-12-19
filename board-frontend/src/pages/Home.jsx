import { fetchBoardsThunk } from '../features/boardSlice'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Box, Th, Td, Ul, Li, Span, Button } from '../styles/StyledComponent'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import dayjs from 'dayjs'

const Home = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)

   const handlePageFront = useCallback(() => setPage(page - 1))
   const handlePageBack = useCallback(() => setPage(page + 1))

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   return (
      <Box col max="1000px">
         {loading && <p>로딩 중...</p>}
         {error && <p>에러 발생: {error}</p>}

         {boards.length > 0 ? (
            <>
               <table>
                  <thead>
                     <tr>
                        <Th w="10%">순번</Th>
                        <Th w="50%">제목</Th>
                        <Th w="20%">글쓴이</Th>
                        <Th w="20%">작성일</Th>
                     </tr>
                  </thead>
                  <tbody>
                     {boards.map((board, index) => (
                        <tr>
                           <Td>{pagination.totalBoards - index}</Td>
                           <Td align="left">
                              <Link to={`/boards/${board.id}`}>{board.title}</Link>
                           </Td>
                           <Td>{board.User.nick}</Td>
                           <Td>{dayjs(board.createdAt).format('YYYY-MM-DD')}</Td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <Ul>
                  <Li>
                     <Button disabled={page === 1} onClick={handlePageFront}>
                        <AiOutlineDoubleLeft />
                     </Button>
                  </Li>
                  <Li>
                     {pagination.currentPage} / {pagination.totalPages}
                  </Li>
                  <Li>
                     <Button disabled={page === pagination.totalPages} onClick={handlePageBack}>
                        <AiOutlineDoubleRight />
                     </Button>
                  </Li>
               </Ul>
            </>
         ) : (
            !loading && <p>게시물이 없습니다.</p>
         )}
      </Box>
   )
}

export default Home
