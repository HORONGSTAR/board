import React, { useState, useCallback } from 'react'
import { Box, Button, FakeBtn, Textarea, Input, Label, Img } from '../../styles/StyledComponent'

function BoardForm({ onSubmit, initialValues = {} }) {
   const [imgUrl, setImgUrl] = useState(
      initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : ''
   )
   const [imgFile, setImgFile] = useState(null)
   const [title, setTitle] = useState(initialValues.title || '')
   const [imgAlt, setImgAlt] = useState(initialValues.alt || '')
   const [content, setContent] = useState(initialValues.content || '')
   const [hashtags, setHashtags] = useState(
      initialValues.Hashtags ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') : ''
   )

   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         if (!title.trim()) {
            alert('제목을 입력하세요.')
            return
         }
         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         const formData = new FormData()
         if (imgFile) {
            const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
               type: imgFile.type,
            })
            formData.append('img', encodedFile)
         }
         formData.append('title', title)
         formData.append('content', content)
         formData.append('hashtags', hashtags)
         onSubmit(formData)
      },
      [title, content, hashtags, imgFile, onSubmit]
   )

   return (
      <form onSubmit={handleSubmit}>
         <Box>
            <Label htmlFor="title">제목</Label>
            <Input
               type="text"
               name="title"
               id="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
         </Box>
         <Box>
            <Label htmlFor="content">내용</Label>
            <Textarea
               type="text"
               name="content"
               id="content"
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
         </Box>
         <Box>
            <Label htmlFor="hashtag">해시태그</Label>
            <Input
               type="text"
               name="hashtag"
               id="hashtag"
               value={hashtags}
               onChange={(e) => setHashtags(e.target.value)}
            />
         </Box>
         <Box>
            <Label htmlFor="img" p="4px 0">
               <FakeBtn>이미지 업로드</FakeBtn>
            </Label>
            <input hidden type="file" name="img" id="img" onChange={handleImageChange} />
         </Box>

         {imgUrl && (
            <>
               <Img src={imgUrl} alt="업로드 이미지 미리보기" />

               <Label htmlFor="alt">대체 이미지 텍스트</Label>
               <Input
                  type="text"
                  name="alt"
                  value={imgAlt}
                  onChange={(e) => setImgAlt(e.target.value)}
               />
            </>
         )}
         <Button type="submit">등록</Button>
      </form>
   )
}
export default BoardForm
