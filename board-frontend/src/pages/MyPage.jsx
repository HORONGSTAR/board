import { Box } from '../styles/StyledComponent'
import MyProfile from '../components/page/MyProfile'

const MyPage = ({ auth }) => {
   return (
      <Box col max="1000px">
         <MyProfile auth={auth} />
      </Box>
   )
}

export default MyPage
