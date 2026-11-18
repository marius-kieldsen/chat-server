
export class Message {
    constructor(id, message, owner, chatId, createDate = new Date()) {
        this.id = id
        this.message = message
        this.createDate = createDate
        this.owner = owner
        //chattilhørsforhold --> chatID
        this.chatId = chatId

    }
}