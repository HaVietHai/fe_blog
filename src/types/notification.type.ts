export interface Notification{
    _id: string,
    message: string,
    read: boolean,
    sender: Sender,
    type: "follow" | "like" | "chat"
}

export interface Sender{
    _id: string,
    username: string,
    avatar: string
}
