import React, { useState, useCallback } from 'react'
import { Button, UploadFild, Textarea, Input } from '../../styles/StyledComponent'

function PostForm({ onSubmit, initialValues = {} }) {
   const [imgUrl, setImgUrl] = useState('')
   const [imgFile, setImgFile] = useState(null)
   const [imgAlt, setImgAlt] = useState(null)
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [hashtags, setHashtags] = useState('')

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
         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }
         if (!hashtags.trim()) {
            alert('해시태그를 입력하세요.')
            return
         }
         if (!imgFile) {
            alert('이미지 파일을 추가하세요.')
            return
         }
         const formData = new FormData()
         formData.append('content', content)
         formData.append('hashtags', hashtags)
         formData.append('img', imgFile)
         onSubmit(formData)
      },
      [content, hashtags, imgFile, onSubmit]
   )

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="title">제목</label>
            <Input
               type="text"
               name="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
         </div>
         <div>
            <label htmlFor="content">내용</label>
            <Textarea
               type="text"
               name="content"
               id="content"
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
         </div>
         <div>
            <label htmlFor="hashtag">해시태그</label>
            <Input
               type="text"
               name="hashtag"
               id="hashtag"
               value={hashtags}
               onChange={(e) => setHashtags(e.target.value)}
            />
         </div>
         <div>
            <label htmlFor="img">
               <UploadFild>이미지 업로드</UploadFild>
            </label>
            <input hidden type="file" name="img" id="img" onChange={handleImageChange} />
         </div>

         {imgUrl && (
            <div>
               <img width={300} src={imgUrl} alt="업로드 이미지 미리보기" />
               <div>
                  <label htmlFor="alt">대체 이미지 텍스트</label>
                  <input
                     type="text"
                     name="alt"
                     value={imgAlt}
                     onChange={(e) => setImgAlt(e.target.value)}
                  />
               </div>
            </div>
         )}
         <Button type="submit">등록</Button>
      </form>
   )
}
export default PostForm
