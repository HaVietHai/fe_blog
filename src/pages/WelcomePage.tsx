import Lottie from "lottie-react"
import type React from "react"
import { Link } from "react-router-dom"
import LoginAnimation from '../assets/animations/LoginAnimation.json'


const WelcomePage: React.FC = () => {
  return (
    <div className="h-full flex justify-center items-center p-4 bg-gray-100">
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Ten cua web */}
          <span className="self-center text-2xl font-semibold text-blue-400">Write your Blog.</span>
          {/* Logo */}
          <img />
          <Lottie
          animationData={LoginAnimation}
          loop={true}
          style={{ width: 400, height: 400}}
          />
          <Link
            to={'/login'}
            className="px-6 py-2 bg-blue-400 hover:bg-cyan-600 rounded-md w-full"
          >
            <span className="text-sm font-semibold text-white hover:text-gray-500">Đăng nhập</span>
          </Link>
          <Link
          to={'/regitser'}
          className="px-6 py-2 bg-green-400 hover:bg-green-600 w-full rounded-md"
          >
            <span className="text-sm font-semibold text-white hover:text-gray-500">Đăng ký</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage