import { Link, useNavigate } from 'react-router-dom'
import { logoutUserThunk } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

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
         <ul>
            <li>
               <Link to="/">Croquis Study</Link>
            </li>
            {isAuthenticated ? (
               <>
                  <li>
                     <Link to="/posts/create">글쓰기</Link>
                  </li>
                  <li>
                     <Link to="/my"> {user.nick}님</Link>
                  </li>
                  <li>
                     <button onClick={handleLogout}>로그아웃</button>
                  </li>
               </>
            ) : (
               <li>
                  <Link to="/login">
                     <button>로그인</button>
                  </Link>
               </li>
            )}
         </ul>
      </header>
   )
}

export default Navbar
