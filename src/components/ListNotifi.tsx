import type React from "react"
import type { Notification } from "../types/notification.type"
import { useNavigate } from "react-router-dom";

interface IProps {
    items: Notification[],
    isLoading: boolean
}

const ListNotifi: React.FC<IProps> = ({
    items
}) => {
    const navigate = useNavigate();

    return (
        <div>
            {items ? (
                <div className="flex flex-col ">
                    {items.map((notification) => (
                        <div
                            key={notification._id}
                            className="px-4 py-2 hover:rounded-full hover:transition-all hover:cursor-pointer bg-[var(--color-brand-dark)] w-full flex flex-row flex-1 mb-2"
                            onClick={() => navigate(`/infor/${notification.sender._id}`)}
                        >
                            <img src={notification.sender.avatar} className="w-15 h-15 rounded-full self-center" />
                            <div className="flex flex-col ml-3">
                                <span className="text-xl font-semibold">{notification.message}</span>
                                {notification.type === "follow" && (
                                    <span className="text-lg">{notification.sender.username} đang follow bạn.</span>
                                )}
                                {notification.type === 'like' && (
                                    <span className="text-lg">{notification.sender.username} đã trao tặng cho bạn 1 tim.</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <span className="text-3xl font-bold text-center self-center break-all">
                    Bạn chưa có bất kỳ thông báo nào! Cho tới hiện tại
                </span>
            )}
        </div>
    )
}

export default ListNotifi