import { Box } from '../../styles/StyledComponent'

import { Link } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'

const PostItem = ({ post, isAuthenticated, user }) => {
   const onClickDelete = useCallback(() => {})

   return (
      <Box>
         <img src={`${process.env.REACT_APP_API_URL}${post.img}`} alt={post.alt} />
         <Box>
            <Link to={`/my/${post.User.id}`} style={{ textDecoration: 'none' }}>
               <p sx={{ color: 'primary.main' }}>@{post.User.nick} </p>
            </Link>
            <p>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>{post.content}</p>
            {post.Hashtags &&
               post.Hashtags.map((hashtag) => (
                  <button key={post.id + hashtag.title}>#{hashtag.title}</button>
               ))}
         </Box>
         <Box>
            <button size="small" color="primary">
               스크랩
            </button>

            {isAuthenticated && post.User.id === user.id && (
               <>
                  <Link to={`/posts/edit/${post.id}`}>수정</Link>
                  <button onClick={() => onClickDelete(post.id)}>삭제</button>
               </>
            )}
         </Box>
      </Box>
   )
}

export default PostItem
