export class user {
    constructor(id, username, password, accessLevel) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.accessLevel = accessLevel;
        this.dateCreated = Date.now();
    }
}

