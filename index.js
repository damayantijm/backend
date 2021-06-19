const sqlite3 = require('sqlite3')
const express = require('express')
const cors = require('cors')
const auth = require('./middlewares/auth.js')

const db = new sqlite3.Database('./my')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json)
app.use(cors)

const routerUser = require('./routers/user.js')
const routerTodo = require('./routers/todo.js')


app.use('/user',auth,routerUser)
app.use('/todo', routerTodo)
app.listen(3000, ()=> { console.log('Server Started')})