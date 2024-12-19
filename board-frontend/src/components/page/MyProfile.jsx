import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../../features/pageSlice'
import { followUserThunk } from '../../features/userSlice'
import { Box, Button, Ul, Li } from '../../styles/StyledComponent'

const MyProfile = ({ auth }) => {
   const { id } = useParams() // 게시물의 이름 클릭시 path 파라미터에 사용자 id존재, navbar 이름 클릭시 path 파라미터에 사용자 id X
   const [followers, setFollowers] = useState(0) // 팔로워수
   const [followings, setFollowings] = useState(0) // 팔로잉수
   const [follow, setFollow] = useState(false) // 팔로우 여부

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.page)

   const fetchProfileData = useCallback(() => {
      if (id) {
         //게시물의 이름을 클릭해서 들어온 경우
         dispatch(getProfileIdThunk(id))
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followings.length)
            })
            .catch((error) => {
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      } else {
         //navbar의 이름을 클릭해서 들어온 경우
         dispatch(getProfileThunk())
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followings.length)
            })
            .catch((error) => {
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      }
   }, [dispatch, id])

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData, follow])

   const onClickFollow = useCallback(
      (id) => {
         dispatch(followUserThunk(id))
            .unwrap()
            .then(() => {
               alert('팔로우 되었습니다!')
               setFollow((prev) => !prev) // follow 상태 true로 변경 -> state가 바뀌면 컴포넌트가 재렌더링 되면서 Followers, Followings 인원수가 바뀌어 보인다
            })
            .catch((error) => {
               console.error('팔로우 중 :', error)
               alert('팔로우를 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <>
         {user && (
            <Box>
               <Ul>
                  <Li>{user.email}</Li>
                  <Li>{user.nick}</Li>
                  <Li>자기소개</Li>
                  <Li>
                     {followers} Followers &nbsp;&nbsp;&nbsp; {followings} Followings
                  </Li>
               </Ul>
               <Box>
                  <Button
                     onClick={() => onClickFollow(`${user.id}`)}
                     disabled={
                        !id ||
                        String(auth.id) === String(id) ||
                        user.Followers.filter((f) => f.id === auth.id).length > 0
                           ? true
                           : false
                     }
                  >
                     Follow
                  </Button>
               </Box>
            </Box>
         )}
      </>
   )
}

export default MyProfile
