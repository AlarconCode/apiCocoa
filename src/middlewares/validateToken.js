import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

export const authRequired = (req, res, next) => {

  const token = getTokenFrom(req)

  jwt.verify(token, process.env.TOKEN_SECRET, 
    (err, decode) => {
      if (err) return res.status(403).json(err)

      console.log(decode);
      // guardo el id del user en el req, para acceder desde profile
      req.user = decode
      
      next()
  
    })


}