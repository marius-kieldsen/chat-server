import express from 'express'
import {userRoutes} from './routes/userRoutes.js'
import {getUserByUsername, getUsers} from "./services/userService.js";
import session from 'express-session'
import {verifyPassword} from "./services/authService.js";
import {chatRoutes} from './routes/chatRoutes.js'
import {getChats} from "./services/chatService.js"

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
    const chats = await getChats()
    const users = request.session.user?.accessLevel === 3 ? await getUsers() : []

    response.render('index', { chats, users, user: request.session.user })
})

app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = await getUserByUsername(username)

    if (!user || !verifyPassword(password, user.password)) {
        return response.status(401).json({ error: "Forkert brugernavn eller adgangskode" })
    }

    request.session.user = { id: user.id, username: user.username, accessLevel: user.accessLevel }
    response.sendStatus(200)
})

app.post('/logout', (request, response) => {
    request.session.destroy(() => response.sendStatus(200))
})

app.use('/users', userRoutes)

app.use('/chats',chatRoutes)


app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))