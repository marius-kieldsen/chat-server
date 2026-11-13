import express, {request, response} from 'express'
import { users } from './routes/getUsers'

const app = express()
app.set('view engine', 'pug')


app.use(express.urlencoded({extended: true}))


app.listen(8000, () => console.log('Lorten skider på hunden i port 8000'))