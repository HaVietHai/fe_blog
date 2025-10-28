import Lottie from 'lottie-react'
import NotConnectAnimate from '../assets/animations/404Page.json'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import errorHandler from '../utils/errorHandle'
import { checkServerConnect } from '../services/serverCheck.service'

const ServerDownPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await checkServerConnect();                
                if (res) {
                    navigate('/', { replace: true })
                }
            } catch (error) {
                errorHandler(error);
            }
        }, 5000); // 5s check server 1 lan

        return () => clearInterval(interval);
    }, [navigate])

    return (
        <div className="min-h-screen flex flex-1 flex-col justify-center items-center">
            <h1 className='text-2xl font-bold text-cyan-500'>😢 Server đang tạm ngừng</h1>
            <Lottie animationData={NotConnectAnimate} className='w-300 h-120' />
            <span className='text-gray-300 font-semibold'>
                Xin lỗi, hệ thống đang gặp sự cố. Vui lòng quay lại sau ít phút.
            </span>
        </div>
    )
}

export default ServerDownPage