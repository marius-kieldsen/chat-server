import {Router} from "express"
import {createChat, deleteChat} from "../services/chatService.js"


const chat = Router()

chat.get('/', async (request, response) => {
//alle chats
const allChats = await chat()
response.json(allChats)
})

chat.get('/:id', async (request, response) => {
//en chat
const chat = await chat(request.params.id)
if(!chat) return response.status(404)
response.json(chat)
})

chat.get('/:id/message', async (request, response) => {
//beskeder i chat
})

chat.get('/:id/message/messageID', async (request, response) => {
//en besked
})


chat.post('/', async (request,response) => {
//opret chat
const newChat = new Chat(null, request.body.name, request.session.user.id)
const id = await createChat(newChat)

})

chat.put('/:id', async (request, response) => {
//ret chat
})

chat.delete('/:id', async (request, response) => {
await deleteChat(request.params.id)
response.sendStatus(204)
})

export {chat}