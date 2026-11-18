

export class Chat {
    constructor(id, name, owner, dateCreated = new Date()) {
        this.id = id    
        this.name = name
        this.dateCreated = dateCreated
        this.owner = owner
        this.messages = []
    }
}