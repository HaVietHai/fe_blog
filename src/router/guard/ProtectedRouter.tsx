import type React from "react"
import { StorageService } from "../../services/storage.service"
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const ProtectedRouter = ({children}: {children: React.ReactNode}) => {
    const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    if (!token && !isLoggedIn) {
        return <Navigate to={'/login'} replace/>
    }

    return <>{children}</>
}

export default ProtectedRouter