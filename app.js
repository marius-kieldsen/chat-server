import express from 'express'
import {users} from './routes/users.js'
import {getUserByUsername, getUsers} from "./services/userService.js";
import session from 'express-session'
import {verifyPassword} from "./services/authService.js";
import {chat} from './routes/chat.js'
import {getChats} from"./services/chatService.js"

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))
app.use((request, response, next) => {
    response.locals.user = request.session.user
    next()
})

app.get('/', async (request, response) => {
if (!request.session.user) {
    const allUsers = await getUsers()
    return response.render('index', { users: allUsers })
    }
    const chats = await getChats()
    response.render('chat', {chats,user:request.session.user})
})

app.get('/login', async ( request, response) => {
    response.render('login')
})

app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = await getUserByUsername(username)

    if (!user && !verifyPassword(password, user.password)) {
        return response.status(401).json({ error: "Forkert brugernavn eller adgangskode" })
    }

    request.session.user = { id: user.id, username: user.username, accessLevel: user.accessLevel }
    response.sendStatus(200)
})

app.post('/logout', (req, res) => {
    req.session.destroy(() => res.sendStatus(200))
})

app.use('/users', users)

app.use('/chats',chat)



// MIDLERTIDIG – slet før aflevering
app.get('/test-chat', (request, response) => {
    const level = Number(request.query.level) || 0
    const user = level ? { id: 'u1', username: 'test', accessLevel: level } : undefined
    const chats = [
        { id: 'c1', name: 'Julefrokost', owner: 'u1' },   // ejes af test-brugeren
        { id: 'c2', name: 'Sommerfest', owner: 'u9' }     // ejes af en anden
    ]
    const users = [{ username: 'admin', accessLevel: 3 }]
    response.render('chat', { chats, user, users })
})













app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))