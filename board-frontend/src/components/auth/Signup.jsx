import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'
import { Warning, Box, Button, Input, Label } from '../../styles/StyledComponent'

function Signup() {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [isEmpty, empty] = useState(false)
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)

   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         return empty(true)
      }
      if (password !== confirmPassword) {
         alert('패스워드가 일치하지 않습니다!')
         return
      }

      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            setIsSignupComplete(true)
         })
         .catch((error) => {
            console.error('회원가입 에러:', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])

   if (isSignupComplete) {
      return (
         <div>
            <h4>회원가입이 완료되었습니다!</h4>
            <p>로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.</p>
            <button onClick={() => (window.location.href = '/login')}>로그인 하러 가기</button>
         </div>
      )
   }

   return (
      <Box>
         <h4>회원가입</h4>
         {error && <p>{error}</p>}
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
            <Label htmlFor="nick" w="100px">
               이름
            </Label>
            <Input
               type="text"
               value={nick}
               name="nick"
               onChange={(e) => setNick(e.target.value)}
               w="300px"
            />
         </Box>
         <Box>
            <Label htmlFor="password" w="100px">
               비밀번호
            </Label>
            <Input
               type="password"
               value={password}
               name="password"
               onChange={(e) => setPassword(e.target.value)}
               w="300px"
            />
         </Box>
         <Box>
            <Label htmlFor="confirmPassword" w="100px">
               비밀번호 확인
            </Label>
            <Input
               type="password"
               value={confirmPassword}
               name="confirmPassword"
               onChange={(e) => setConfirmPassword(e.target.value)}
               w="300px"
            />
         </Box>
         <Warning display={isEmpty}>모든 입력창을 채워주세요.</Warning>
         <Button onClick={handleSignup}>{loading ? 'Loading...' : '회원가입'}</Button>
      </Box>
   )
}

export default Signup
