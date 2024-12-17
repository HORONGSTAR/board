import React, { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { Warning } from '../../styles/StyledComponent'

function Login() {
   const [email, setEmail] = useState('') // 이메일 상태
   const [password, setPassword] = useState('') // 비밀번호 상태
   const [isEmpty, empty] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (!email.trim() || !password.trim()) {
            return empty(true)
         }
         dispatch(loginUserThunk({ email, password }))
            .unwrap()
            .then(() => navigate('/'))
            .catch((err) => console.error('로그인 실패: ', err))
      },
      [email, password, dispatch, navigate]
   )
   const loginButtonContent = useMemo(() => (loading ? 'Loading...' : '로그인'), [loading])

   return (
      <div>
         <h4>로그인</h4>

         {error && (
            <p color="error" align="center">
               {error}
            </p>
         )}

         <form onSubmit={handleLogin}>
            <div>
               <label htmlFor="email">이메일 </label>
               <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor="password">비밀번호 </label>
               <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <Warning display={isEmpty}>모든 입력창을 채워주세요.</Warning>

            <div>
               <button type="submit" disabled={loading}>
                  {loginButtonContent}
               </button>
            </div>
         </form>
         <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
         </p>
      </div>
   )
}

export default Login
