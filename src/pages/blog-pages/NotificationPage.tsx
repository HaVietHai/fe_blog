import { useEffect, useState } from "react"
import Header from "../../components/Forms/Header"
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant"
import { StorageService } from "../../services/storage.service"
import errorHandler from "../../utils/errorHandle"
import { getAllNotifi } from "../../services/notification.service"
import type { Notification } from "../../types/notification.type"
import { useNavigate } from "react-router-dom"
import { IconLucide } from "../../components/IconLucide"
import ListNotifi from "../../components/ListNotifi"
import ConfirmModal from "../../components/CofirmModal"

const NotifiactionPage = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[] | []>()
  const user = StorageService.getItem(STORAGE_KEY_AUTH_BLOG).user;
  const userId = user._id || user.id;

  const handleGetNotifications = async (userId: string) => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const response = await getAllNotifi(userId);

      setNotifications(response)

    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetNotifications(userId)
  }, [userId])

  return (
    <div>
      <Header title="Notifications" isDetail />
      <div className="mt-10">
        <div className="flex flex-row mb-5">
          <span className="flex-1">All</span>
          <button
            onClick={() => setShowConfirm(true)}
            className="hover:cursor-pointer"
            title="Clear All"
          >
            <IconLucide name="BrushCleaning" className="w-5 h-5 hover:fill-cyan-300" />
          </button>
        </div>
        <ListNotifi items={notifications} />
      </div>
      {showConfirm && (
        <ConfirmModal
          onConfirm={ () => console.log("OK xoa roi")}
          show={showConfirm}
          onCancel={() => setShowConfirm(false)}
          message="Bạn có chắc muốn làm trống toàn bộ thông báo không?"
        />
      )}
    </div>
  )
}

export default NotifiactionPage