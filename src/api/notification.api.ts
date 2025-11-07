import client from "./client.api"

export const getNotifications = async (userId: string): Promise<any> => {
    return await client.get(`/api/v1/notification/${userId}`)
}

export const readNotification = async (notificationId: string): Promise<any> => {
    return await client.patch(`/api/v1/notification/read/${notificationId}`)
}