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
         UserId: req.user.id,
      })
      const hashtags = req.body.hashtags.match()
   } catch (err) {}
})

module.exports = router
