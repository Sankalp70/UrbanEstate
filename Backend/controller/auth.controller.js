import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const login = async(req,res)=>{

const {username,password}=req.body;  

    try {
     
          const user = await prisma.user.findUnique({
            where:{username}
          })      

         if(!user) return res.status(401).json({message:"Invalid Username"})
          
       
         const isPasswordValid = await bcrypt.compare(password,user.password)

         if(!isPasswordValid) return res.status(401).json({message:"Invalid Password"})

     
        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({
          id:user.id
        },process.env.JWT_SECRET_KEY,
      {expiresIn:age}
         )

        res.cookie("token",token,{
          httpOnly:true,
          maxAge:age
        }).status(200).json({message:"Login Successful"})

    } catch (error) {
      console.log(error)
      res.status(500).json({
        message:"Login Failed"
      })
    }
}



export const register = async (req,res)=>{

  const {username,email,password}=req.body

  

  const hashedPassword = await bcrypt.hash(password,10)

  console.log(hashedPassword)

  const newUser = await prisma.user.create({
    data:{
        email,
        username,
        password:hashedPassword,
    },
  })

  console.log(newUser);

  res.status(201).json({message:"User Created Successfully"})

}



export const logout = (req,res)=>{

  res.clearCookies.json({message:"Logout Successful"})

}