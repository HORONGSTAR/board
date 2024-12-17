import PostForm from '../components/post/PostForm'
import { useCallback } from 'react'
import { createPostThunk } from '../features/postSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreatePostPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSubmit = useCallback(
      // postData: 사용자가 PostForm에서 작성한 정보
      (postData) => {
         dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   )
   return (
      <div>
         <PostForm onSubmit={handleSubmit} />
      </div>
   )
}

export default CreatePostPage
