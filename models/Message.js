
class Message {
    constructor(id, message, owner) {
        this.id = id
        this.message = message
        this.createDate = Date.now
        this.owner = owner
        //chattilhørsforhold
    }
}