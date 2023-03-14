const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoBD:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('./api/blogs', blogsRouter)

module.exports = app