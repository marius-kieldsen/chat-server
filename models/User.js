export class User {
    constructor(username, password, accessLevel, id = null, dateCreated= new Date()) {
        this.username = username;
        this.password = password;
        this.accessLevel = accessLevel
        this.id = id;
        this.dateCreated = dateCreated
    }
}

