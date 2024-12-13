exports.isLoggendIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      next()
   } else {
      res.status(403).json({
         seccess: false,
         message: '로그인이 필요합니다.',
      })
   }
}

exports.isNotLoggendIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      next()
   } else {
      res.status(400).json({
         seccess: false,
         message: '이미 로그인이 된 상태입니다.',
      })
   }
}
