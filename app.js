import express from 'express'
import {users} from './routes/getUsers.js'
import {getUsers} from "./services/userService.js"
import { chat } from './routes/chat.js'

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', async (request, response) => {
    const allUsers = await getUsers()
    response.render('index', { users: allUsers })
})

app.use('/users', users)


app.use('/chats',chat)







app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))