const express = require('express')
const app = express()
let dotenv = require('dotenv')
dotenv.config()
const port = process.env.port || 5000
let userRoutes = require('./routes/userRoutes')
let connectdb = require('./config/database')
connectdb()
app.use(express.json())
app.use('/api/users', userRoutes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))   