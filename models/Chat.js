

class Chat {
    constructor(id, name, owner, message = []) {
        this.id = id    
        this.name = name
        this.dateCreated = Date.now
        this.owner = owner
        this.message = message
    }
}