export class CreateUser {
    constructor(username) {this.username = username}
    username: string;
    chats: [{id: 0, messages_seen: 0}]
}