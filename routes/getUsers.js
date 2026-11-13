import { Router } from "express"
const users = Router()


users.get('/', async (request, response) => {
let users = await getUsers()
//mangler response til pug med users 
})

users.get('/add', (request, response) => {
    response.render('add')
})

users.get('/:id', async (request, response) => {
  const user = await getUser(request.params.id)
  response.send(user)
})

users.put('/:id', (request, response) => {

})

users.post('/', async (request, response) => {
  const user = new User(request.body.username, request.body.type)
  await addUser(user) 
  response.redirect('/users')
})

export {users}

