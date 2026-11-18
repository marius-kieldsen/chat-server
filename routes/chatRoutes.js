import {Router} from "express"
import {createChat, deleteChat, getChat, getChats} from "../services/chatService.js"
import {Chat} from "../models/Chat.js"


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
})

chatRoutes.get('/:id/messages/:messageID', async (request, response) => {
//en besked
})

chatRoutes.post('/', async (request, response) => {
    if (!request.session.user) {
        return response.status(401).json({ error: "Du skal være logget ind" })
    }

    const { chatName } = request.body
    const owner = request.session.user.id

    await createChat(new Chat(chatName, owner))
    response.sendStatus(201)
})

chatRoutes.put('/:id', async (request, response) => {
//ret chatRoutes
})

chatRoutes.delete('/:id', async (request, response) => {
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

export {chatRoutes}