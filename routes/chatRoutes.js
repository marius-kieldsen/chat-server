import {Router} from "express"
import {createChat, deleteChat, getChat, getChats} from "../services/chatService.js"
import {Chat} from "../models/Chat.js"
import {createMessage, getMessage, getMessagesbyChat} from "../services/messageService.js"

function requiresLogin(request, response, next) {
    if (!request.session.user) return response.sendStatus(401)
    next()
}

function canEdit(user, chat) {
    return user.accessLevel === 3 || (user.accessLevel >= 2 && chat.owner === user.id)
}
import {Message} from "../models/Message.js"

const chatRoutes = Router()

chatRoutes.get('/', async (request, response) => {
//alle chats
const allChats = await getChats()
response.json(allChats)
})

chatRoutes.get('/:id', async (request, response) => {
//en chatRoutes
const oneChat = await getChat(request.params.id)
if(!oneChat) return response.sendStatus(404)
response.json(oneChat)
})

chatRoutes.get('/:id/messages', async (request, response) => {
//beskeder i chatRoutes
const messages = await getMessagesbyChat(request.params.id)
response.json(messages)
})

chatRoutes.get('/:id/messages/:messageID', async (request, response) => {
//en besked
const message = await getMessage(request.params.messageID)
response.json(message)
})

chatRoutes.post('/', async (request, response) => {
    if (!request.session.user) {
        return response.status(401).json({ error: "Du skal være logget ind" })
    }

    const { chatName } = request.body
    const owner = request.session.user.id
    const chat = new Chat(chatName, owner)
    chat.id = await createChat(chat)
    response.status(201).json(chat)
})

chatRoutes.delete('/:id', requiresLogin, async (request, response) => {
    const chat = await getChat(request.params.id)
    if (!chat) return response.sendStatus(404)
    if (!canEdit(request.session.user, chat)) return response.sendStatus(403)

    await deleteChat(request.params.id)
    return response.sendStatus(204)
})

export {chatRoutes}