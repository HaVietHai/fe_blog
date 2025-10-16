import type React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { Navigate } from "react-router-dom"


const OtpProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const verified = useSelector((state: RootState) => state.otp.verified)

    if (!verified) {
        return <Navigate to={'/forgot-password'} replace/>
    }

    return <>{children}</>
}

export default OtpProtectedRoute