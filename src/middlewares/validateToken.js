import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('getToken', authorization.substring(7));
    return authorization.substring(7)
  }
  return null
}

export const authRequired = (req, res, next) => {
  console.log(req.headers);
  const token = getTokenFrom(req)
  console.log(token);

  if (!token) {
    return res.status(401).json({ 
      error: true, 
      code: 401,
      message: ['Token required'] 
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, 
    (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ 
        error: true, 
        code: 403,
        message: [err.message] 
      });
    }

      console.log(decoded);
      // guardo el id del user en el req, para acceder desde profile
      req.user = decoded
      
      next()
  
    })


}