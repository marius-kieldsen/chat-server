

export class Chat {
    constructor(name, owner, id = null, dateCreated = new Date()) {
        this.name = name
        this.owner = owner
        this.id = id
        this.dateCreated = dateCreated
        this.messages = []
    }
}