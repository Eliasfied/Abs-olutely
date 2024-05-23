export class Notification {
    id: string;
    senderId: string;
    receiverId: string;
    type: string;
    text: string;
    isAcknowledged: boolean;
    Data: Array<any>;
  
    constructor(id: string, senderId: string, receiverId: string, type: string, text: string, isAcknowledged: boolean, Data: Array<any>) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.type = type;
        this.text = text;
        this.isAcknowledged = isAcknowledged;
        this.Data = Data;
    }
  }
  