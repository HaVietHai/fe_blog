export interface Notification{
    _id: string,
    message: string,
    read: boolean,
    sender: Sender,
    type: "follow" | "like" | "comment"
}

export interface Sender{
    _id: string,
    username: string,
    avatar: string
}
