import {Router} from "express"
import {getChat, createChat, deleteChat} from "../services/chatService.js"
import {Chat} from "../models/Chat.js"


const chat = Router()

chat.get('/', async (request, response) => {
//alle chats
const allChats = await getChats()
response.json(allChats)
})

chat.get('/:id', async (request, response) => {
//en chat
const oneChat = await getChats(request.params.id)
if(!oneChat) return response.sendStatus(404)
response.json(oneChat)
})

chat.get('/:id/messages', async (request, response) => {
//beskeder i chat
})

chat.get('/:id/message/:messageID', async (request, response) => {
//en besked
})


chat.post('/', async (request,response) => {
//opret chat
const newChat = new Chat(null, request.body.name, request.session.user.id, new Date())
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