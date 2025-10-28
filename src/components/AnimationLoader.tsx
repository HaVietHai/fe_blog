import Lottie from 'lottie-react'
import imageAnimation from '../assets/animations/LoginAnimation.json'
import type React from 'react'
import type { HAVE_TROUBLE } from '../types/other.type'

interface OverlayLoadingProps extends HAVE_TROUBLE{
    show: boolean;
    styles: React.HTMLAttributes<HTMLDivElement>
}

const AnimationLoader:React.FC<OverlayLoadingProps> = ({
    message, show, styles
}) => {

    if(!show) return null;

    return (
        <div className={`${styles} flex justify-center items-center p-4`}>
            <div className='flex flex-col'>
                <Lottie title='Đang tải...' animationData={imageAnimation} loop={true} className='w-150 h-90 self-center' />
                <span
                    className='mb-5 text-2xl text-center font-bold hover:transition-all hover:duration-500 hover:text-cyan-500'
                >
                    {message ? message : "Oh no! Có chút trục trặc. Vui lòng chờ trong giây lát..."}
                </span>
            </div>
        </div>
    )
}

export default AnimationLoader