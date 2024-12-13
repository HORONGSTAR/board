const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const { isLoggendIn, isNotLoggendIn } = require('./middleware')

router.post('/join', async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      const exUser = await User.findOne({
         where: { email },
      })
      if (exUser)
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다.',
         })
      const hash = await bcrypt.hash(password, 12)
      const newUser = await User.create({
         email: email,
         nick: nick,
         password: hash,
      })
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
      })
      next(err)
   }
})

router.post('/login', isNotLoggendIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res
            .status(500)
            .json({ success: false, message: '인증 중 오류 발생', error: authError })
      }
      if (!user) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }
      req.logIn(user, (loginError) => {
         if (loginError) {
            return res
               .status(500)
               .json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }
         res.json({
            success: true,
            message: '로그인 성공',
            user: { id: user.id, nick: user.nick },
         })
      })
   })(req, res, next)
})

router.get('/logout', isLoggendIn, async (req, res, next) => {
   req.logOut((err) => {
      if (err) {
         console.log(err)
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }
      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {})

module.exports = router
