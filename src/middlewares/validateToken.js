import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const getTokenFrom = req => {
  let token = null
  if (req && req.headers.cookie) {
    token = req.get('cookie').substring(4)
    console.log(token)
  }
  return token
}

export const authRequired = (req, res, next) => {
  
  const token = getTokenFrom(req)

  jwt.verify(token, process.env.TOKEN_SECRET, 
    (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(403).json({
          error: true,
          code: 403,
          message: err.message
        })
      }

      console.log(decode);
      // guardo el id del user en el req, para acceder desde profile
      req.user = decode
      
      next()
  
    })


}