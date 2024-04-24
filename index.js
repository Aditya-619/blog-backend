const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const upload = require('express-fileupload')


const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const {notFound, handleErrorMiddleware} = require('./middlewares/errorMiddlewares.js')

const server = express()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MERN_URL);
  console.log("Database connected")
} 

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };




server.use(express.json({extended: true}))
server.use(express.urlencoded({extended:true}))
// server.use(cors({credentials:true, origin: "http://localhost:5173"}))
server.use(cors())

server.use(upload())
server.use('/uploads', express.static(__dirname + '/uploads'))


server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)
server.use(notFound)
server.use(handleErrorMiddleware)

server.listen(process.env.PORT, ()=>{
    console.log("server running")
})
