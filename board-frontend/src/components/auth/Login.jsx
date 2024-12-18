import React, { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { Warning, Box, Button, Input, Label } from '../../styles/StyledComponent'

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
      <Box col>
         <h4>로그인</h4>

         {error && (
            <p color="error" align="center">
               {error}
            </p>
         )}

         <form onSubmit={handleLogin}>
            <Box>
               <Label htmlFor="email" w="100px">
                  이메일
               </Label>
               <Input
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  w="300px"
               />
            </Box>
            <Box>
               <Label htmlFor="password" w="100px">
                  비밀번호{' '}
               </Label>
               <Input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  w="300px"
               />
            </Box>
            <Warning display={isEmpty}>모든 입력창을 채워주세요.</Warning>

            <Box>
               <Button type="submit" disabled={loading}>
                  {loginButtonContent}
               </Button>
            </Box>
         </form>
         <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
         </p>
      </Box>
   )
}

export default Login
