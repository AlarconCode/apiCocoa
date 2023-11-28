import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {

  try {

    const data = await User.find()
    res.json(data)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const register = async (req, res) => {
  const { name, email, password, img } = req.body

  try {

    const userFound = await User.findOne({email})
    if (userFound) {
      res
      .status(400)
      .json({
        error: true,
        code: 400,
        message: 'The user is already exists', 
        newUser: null,
      })
    }
    
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      img
    })

    const userSaved = await newUser.save()
    const token = await createAccessToken({id: userSaved._id, name: userSaved.name})
     
    res
    .cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    })
    .json({
      error: false,
      code: 200,
      message: 'usuario registrado correctamente',
      newUser: {
        id: userSaved._id,
        name: userSaved.name,
        email: userSaved.email,
        img: userSaved.img
      }
    })
  } catch (error) {
    res
    .status(500)
    .json({ message: error.message })
  }

}

export const updateUser = async (req, res) => {

  try {

  const userUpdated = await User.findOneAndUpdate({_id: req.user.id}, {...req.body}, {new: true})

  res.json({
    message: 'user updated successfully',
      userLogin: {
        id: userUpdated._id,
        name: userUpdated.name,
        surname: userUpdated.surname,
        email: userUpdated.email,
        img: userUpdated.img,
        rol: userUpdated.rol,
        createAt: userUpdated.createdAt,
        updateAt: userUpdated.updatedAt
      }
  })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const login = async (req, res) => {
  
  const {email, password} = req.body

  try {

    const userFound = await User.findOne({email})
    const passwordCorrect = userFound === null 
      ? false 
      : await bcrypt.compare(password, userFound.password)

      if (!(userFound && passwordCorrect)) {
        return res.status(401).json({
          error: true,
          code: 400,
          message: ['password o usuario incorrecto']
        })
      }

      const userForToken = {
        userId: userFound._id,
        name: userFound.name
      }
      
      const maxAge = 3 * 24 * 60 * 60;
      const token = jwt.sign(userForToken, process.env.TOKEN_SECRET, { expiresIn: maxAge })

      res
      .cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none'
      })
      .json({
        error: false,
        code: 200,
        message: 'user login successfully',
        user: {
          name: userFound.name,
          email: userFound.email,
          img: userFound.img
        }
      })
     
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// export const login = async (req, res) => {
  
//   const {email, password} = req.body

//   try {

//     const userFound = await User.findOne({email})
//     if (userFound) {
//       const isMatch = await bcrypt.compare(password, userFound.password)
//       if (!isMatch) return res.status(400).json({
//         error: true,
//         code: 400,
//         message: 'password incorrect'})

//       const token = await createAccessToken({id: userFound._id})

//       res.cookie('token', token)
//       .json({
//         error: false,
//         code: 200,
//         message: 'user login successfully',
//         user: {
//           id: userFound._id,
//           name: userFound.name,
//           surname: userFound.surname,
//           email: userFound.email,
//           img: userFound.img,
//           rol: userFound.rol,
//           createAt: userFound.createdAt,
//           updateAt: userFound.updatedAt
//         }
//       })

//     } else {

//       res
//       .status(400)
//       .json({
//         error: true,
//         code: 400,
//         message: 'The user doesn`t exists', 
//         newUser: null})
//     }
     
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

export const logout = async (req, res) => {

  try {
    res.setHeader('Clear-Site-Data', '"cookies", "storage"');
    return res.status(200).json({ message: 'You are logged out!' });
  
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

}

export const profile = async (req, res) => {
 
  try {

    const userProfile = await User.findById(req.user.id)
    if (!userProfile) return res.status(400).json({message: 'User not Found'})
  
    res.json({
      id: userProfile._id,
      name: userProfile.name,
      surname: userProfile.surname,
      email: userProfile.email,
      img: userProfile.img,
      rol: userProfile.rol,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt
    })

  } catch (error) {
      res.status(500).json({ message: error.message })
  }

}

export const deleteUser = async (req, res) => {

  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({message: 'user not found'})
    res.sendStatus(204)
  
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

} 