import {Router} from "express"
import {getChat, getChats, createChat, deleteChat} from "../services/chatService.js"
import {Chat} from "../models/Chat.js"


const chat = Router()

chat.get('/', async (request, response) => {
//alle chats
const allChats = await getChats()
response.json(allChats)
})

chat.get('/:id', async (request, response) => {
//en chat
const oneChat = await getChat(request.params.id)
if(!oneChat) return response.sendStatus(404)
response.json(oneChat)
})

chat.get('/:id/messages', async (request, response) => {
//beskeder i chat
})

chat.get('/:id/messages/:messageID', async (request, response) => {
//en besked
})


chat.post('/', async (request,response) => {
//opret chat
if (request.session.user) {
const newChat = new Chat(null, request.body.name, request.session.user.id, new Date())
const id = await createChat(newChat)
response.status(201).json({id})
} else {
response.sendStatus(401)
}
})

chat.put('/:id', async (request, response) => {
//ret chat
})

chat.delete('/:id', async (request, response) => {
    const user = request.session.user
    if (!user) return response.sendStatus(401)

    const oneChat = await getChat(request.params.id)
    if (!oneChat) return response.sendStatus(404)

    const level = Number(user.accessLevel)
    const ejerSelv = oneChat.owner === user.id

    if (level >= 3 || (level === 2 && ejerSelv)) {
        await deleteChat(request.params.id)
        return response.sendStatus(204)
    }

    response.sendStatus(403)
})

export {chat}