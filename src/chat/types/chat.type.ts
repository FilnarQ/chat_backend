export class CreateChat {
    constructor(user:string[]){
        this.id = Date.now();
        this.messageCount = 0;
        this.members = user;
        this.messages = []
    }
    id: number;
    messageCount: number;
    members: string[]
    messages: {
        author: string,
        text: string,
        time: string
    }[]
}