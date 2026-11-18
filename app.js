import express from 'express'
import {users} from './routes/users.js'
import {getUserByUsername, getUsers} from "./services/userService.js";
import session from 'express-session'
import {verifyPassword} from "./services/authService.js";
import {chat} from './routes/chat.js'

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
    const allUsers = await getUsers()
    response.render('index', { users: allUsers })
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




app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))