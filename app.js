import express from 'express'
import {users} from './routes/getUsers.js'

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Forsiden')
})

app.use('/users', users)

app.listen(8000, () => console.log('Port åben: http://localhost:8000' ))