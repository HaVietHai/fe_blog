import { getNotifications, readNotification } from "../api/notification.api"

export const getAllNotifi = async(userId: string):Promise<any> =>{
    return getNotifications(userId);
}

export const readNotifi = async(notificationId: string):Promise<any> =>{
    return readNotification(notificationId);
}