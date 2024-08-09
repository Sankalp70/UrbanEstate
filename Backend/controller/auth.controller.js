import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const login = async(req,res)=>{

const {username,password}=req.body;  

    try {
      //Check User Already Registered or Not
          const user = await prisma.user.findUnique({
            where:{username}
          })      

         if(!user) return res.status(401).json({message:"Invalid Username"})
          
          //Checking the password of the user
         const isPasswordValid = await bcrypt.compare(password,user.password)

         if(!isPasswordValid) return res.status(401).json({message:"Invalid Password"})

         //Generate Cookie and Send to the user
         
        //  res.setHeader("Set-Cookie","test="+"myValue").json({message:"success"})
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

  //Hash the password

  const hashedPassword = await bcrypt.hash(password,10)

  console.log(hashedPassword)

  //Create a new user and save to the database

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

//Logout Function

export const logout = (req,res)=>{

  res.clearCookies.json({message:"Logout Successful"})

}