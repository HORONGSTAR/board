import { Box, Button, FakeBtn, Img } from '../../styles/StyledComponent'
import { Link } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'

const PostItem = ({ post, isAuthenticated, user }) => {
   const onClickDelete = useCallback(() => {})

   return (
      <Box col>
         <Img src={`${process.env.REACT_APP_API_URL}${post.img}`} alt={post.alt} />

         <Box>
            <Link to={`/my/${post.User.id}`}>
               <p> @{post.User.nick} </p>
            </Link>
            <Box>
               <p>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
               <p>{post.content}</p>
            </Box>
            <Box>
               {post.Hashtags &&
                  post.Hashtags.map((hashtag) => (
                     <Button key={post.id + hashtag.title}>#{hashtag.title}</Button>
                  ))}
            </Box>
         </Box>
         <Box>
            <Button size="small" color="primary">
               스크랩
            </Button>

            {isAuthenticated && post.User.id === user.id && (
               <>
                  <Link to={`/posts/edit/${post.id}`}>
                     <FakeBtn>수정</FakeBtn>
                  </Link>

                  <Button onClick={() => onClickDelete(post.id)}>삭제</Button>
               </>
            )}
         </Box>
      </Box>
   )
}

export default PostItem
