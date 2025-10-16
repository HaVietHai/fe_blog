import RegisterImg from '../assets/animations/RegitserForm.json'
import SuccessAnimation from '../assets/animations/Success.json';
import Text from "../components/Forms/Text"
import Password from "../components/Forms/Password"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import type { IRegitser } from "../types/user.type"
import OverlayLoading from "../components/OverlayLoading"
import { RegisterSchema } from '../services/zod/user.service'
import Lottie from 'lottie-react'
import { handleRegister } from '../services/user.service'
import errorHandler from '../utils/errorHandle'
import { REGISTER_SUCCESS } from '../constants/message.constant';


const RegitserPage:React.FC = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [regitserFormDto, setRegisterFormDto] = useState<IRegitser>({
    email: '',
    username: '',
    password: '',
    passConfirm: ''
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleValidate = (): boolean => {
    const validate = RegisterSchema.safeParse(regitserFormDto);

    if (validate && !validate.success) {
      const newError: Record<string, string> = {};
      validate.error.issues.forEach(issue => {
        const field = issue.path[0] as string;
        newError[field] = issue.message;
      })
      setErrors(newError);
      return false;
    }
    return true;
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterFormDto(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();

    if (!handleValidate()) return;
    setErrors({});
    try {
      setIsLoading(true);
      await handleRegister(regitserFormDto);
      setShowModal(true);
    } catch (error: any) {
      errorHandler(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full max-w-full flex flex-1 bg-gradient-to-br justify-center items-center from-blue-500 to-cyan-300 p-4">
      <div className="relative max-w-5xl h-auto w-full p-8 md:p-12 bg-white shadow-2xl rounded-xl">
        <div className="flex flex-row">
          <div className="border-2 border-cyan-200 rounded-md flex justify-center items-center md:p-1">
            <Lottie animationData={RegisterImg} loop={true} style={{ width: 350, height: 500 }} />
          </div>
          <div className="flex-1 w-max ml-4">
            <h1 className="font-semibold text-2xl">Đăng ký</h1>
            <form className="mt-3 space-y-2">
              <Text type='email' error={errors.email} value={regitserFormDto.email} onChange={handleChangeForm} name="email" label="Email" icon="Mail" />
              <Text type='text' error={errors.username} value={regitserFormDto.username} onChange={handleChangeForm} name="username" label="Username" icon="User" />
              <Password error={errors.password} value={regitserFormDto.password} onChange={handleChangeForm} name="password" label="Password" />
              <Password error={errors.passConfirm} value={regitserFormDto.passConfirm} onChange={handleChangeForm} name="passConfirm" label="Password Confirm" />
            </form>
            <button
              disabled={showModal}
              className={`${showModal ? "bg-gray-200": "bg-green-300 hover:bg-green-700"} w-full flex flex-row justify-center mt-5 py-2 px-3 rounded-md`}
              type="submit"
              onClick={handleSubmit}
            >
              <OverlayLoading show={isLoading} />
              <span className="text-sm font-semibold text-white mt-1">Đăng ký</span>
            </button>
            <div className="mt-4 justify-center text-center">
              <span className="text-sm mt-4">Bạn đã có tài khoản? Trở lại <Link to={'/login'} className="font-semibold hover:text-cyan-500">Đăng nhập</Link></span>
            </div>
            <div className="text-center mt-10">
              <span className="text-sm">
                Chính sách <Link to={''} className="hover:text-gray-300">Dịch vụ </Link>
                & <Link to={''} className="hover:text-gray-300">Điều khoản</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      {showModal && showModal ?
        (
          <div className='flex fixed bg-gray-100 w-md h-75 z-50 top-50 bottom-50 rounded-md border-1 border-cyan-300'>
            <div className='flex flex-col absolute justify-center text-center'>
              <span className='ml-30 font-semibold text-xl text-cyan-400 mt-2'>
                {REGISTER_SUCCESS}
              </span>
              <Lottie animationData={SuccessAnimation} loop={true} style={{ width: 200, height: 200, marginLeft: 120 }} />
              <button
                type='button'
                className='w-full hover:cursor-pointer bg-blue-300 hover:bg-cyan-600 hover:border-1 hover:border-white ml-15 px-4 py-3 mt-1 rounded-md'
                onClick={() => navigate('/login')}
              >
                <span className='text-sm font-bold text-white'>Quay lại Đăng nhập</span>
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
    </div>
  )
}

export default RegitserPage