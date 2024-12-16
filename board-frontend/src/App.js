import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import './styles/common.css'
import Navbar from './components/shared/Navber'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </>
   )
}

export default App
