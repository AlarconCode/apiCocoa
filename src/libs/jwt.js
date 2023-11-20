import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60;
// export const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_SECRET, {
//     expiresIn: maxAge,
//   });
// };

export function createAccessToken(id) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      id,  
      process.env.TOKEN_SECRET, 
      { 
        expiresIn: maxAge
      },
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      })
  })

}
