import { Link, useNavigate } from 'react-router-dom'
import { logoutUserThunk } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { Line, Ul, Li, Span } from '../../styles/StyledComponent'

function Navbar({ isAuthenticated, user }) {
   const dispatch = useDispatch()
   const navigator = useNavigate()
   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigator('/')
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigator])

   return (
      <header>
         <Ul max="1000px" p="20px 0 10px">
            <Li>
               <Link to="/">Free Board</Link>
            </Li>
            {isAuthenticated ? (
               <>
                  <Li>
                     <Link to="/boards/create">글쓰기</Link>
                  </Li>
                  <Li>
                     <Link to="/my"> {user.nick}님</Link>
                  </Li>
                  <Li>
                     <Span onClick={handleLogout} theme="point">
                        로그아웃
                     </Span>
                  </Li>
               </>
            ) : (
               <Li>
                  <Link to="/login">
                     <Span theme="point">로그인</Span>
                  </Link>
               </Li>
            )}
            <Line />
         </Ul>
      </header>
   )
}

export default Navbar
