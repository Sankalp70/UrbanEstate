import express from 'express'

const postRoute = express.Router()

postRoute.get((req,res)=>{
     res.send("post route")
})

export default postRoute;