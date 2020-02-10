const jwt = require('jsonwebtoken')

module.exports=(err,req,res,next)=>{
  try {
    token =req.headers.token
    const user = jwt.verify(token, 'secret code')
  
    req.user = user
    next()
  } catch (error) {
    throw error
    res.status(403).json({message : "not authenticaion"})
  }
}

