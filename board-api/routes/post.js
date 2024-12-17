const express = require('express')
const router = express.Router()
const { User, Post, Hashtag } = require('../models')
const { isLoggedIn } = require('./middleware')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

try {
   fs.readdirSync('uploads')
} catch (err) {
   console.log('uploads 를 생성합니다.')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname)
         cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: '' })
      }
      const post = await Post.create({
         content: req.body.content,
         img: `/${req.file.filename}`,
         alt: req.body.alt,
         UserId: req.user.id,
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )
         await post.addHashtags(result.map((r) => r[0]))
      }
      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            alt: req.body.alt,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await post.update({
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : post.img,
         alt: req.body.alt,
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)

      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )

         await post.addHashtags(result.map((r) => r[0]))
      }
      const updatedPost = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      res.json({
         success: true,
         post: updatedPost,
         message: '게시글을 성공적으로 수정했습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시글 수정중 오류가 발생했습니다.',
      })
   }
})
router.delete('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await post.destroy()
      res.json({
         success: true,
         message: '게시글이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시글 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         post,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/', async (req, res) => {
   const page = parseInt(req.query.page, 10) || 1
   const limit = parseInt(req.query.limit, 10) || 3
   const offset = (page - 1) * limit
   try {
      const count = await Post.count()

      const posts = await Post.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],

         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 리스트를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
