import { fetchPostsThunk } from '../features/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import PostItem from '../components/post/PostItem'
import { Box } from '../styles/StyledComponent'

const Home = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const { posts, pagination, loading, error } = useSelector((state) => state.posts)

   useEffect(() => {
      dispatch(fetchPostsThunk(page))
   }, [dispatch, page])

   return (
      <Box>
         <h4>Home Feed</h4>
         {loading && <p>로딩 중...</p>}
         {error && <p>에러 발생: {error}</p>}
         {posts.length > 0 ? (
            <>
               {posts.map((post) => (
                  <PostItem
                     key={post.id}
                     post={post}
                     isAuthenticated={isAuthenticated}
                     user={user}
                  />
               ))}
            </>
         ) : (
            !loading && <p>게시물이 없습니다.</p>
         )}
      </Box>
   )
}

export default Home
