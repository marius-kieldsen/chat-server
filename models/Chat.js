

class Chat {
    constructor(id, name, owner) {
        this.id = id    
        this.name = name
        this.dateCreated = new Date()
        this.owner = owner
        this.messages = []
    }
}