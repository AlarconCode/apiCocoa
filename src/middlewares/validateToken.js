import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authRequired = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log(authorization);
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
    console.log(token);
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  console.log(decodedToken);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ 
      error: true, 
      code: 401,
      message: ['Token required'] 
    });
  }

  const { id } = decodedToken
  req.id = id
  next()

}