import express from 'express'
import {users} from './routes/getUsers.js'
import {getUserByUsername, getUsers} from "./services/userService.js";
import session from 'express-session'
import {verifyPassword} from "./services/authService.js";

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

app.get('/', async (request, response) => {
    const allUsers = await getUsers()
    response.render('index', { users: allUsers })
})

app.get('/login', async ( request, response) => {
    response.render('login')
})

app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = getUserByUsername(username)

    if (user && verifyPassword(password, user.password)) {
        request.session.user = { id: user.id, username: user.username, accessLevel: user.accessLevel }
        response.send({ ok: true })
        return response.redirect('/')
    } else {
        response.send({ ok: false })
    }
})

app.use('/users', users)








app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))