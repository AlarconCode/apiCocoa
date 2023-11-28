import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authRequired = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ 
      error: true, 
      code: 401,
      message: ['Token required'] 
    });
  }

  const { id: userId } = decodedToken
  req.userId = userId
  next()

}