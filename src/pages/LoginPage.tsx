import LoginImg from '../assets/animations/LoginForm.json'
import Text from "../components/Forms/Text"
import Password from "../components/Forms/Password"
import Switch from "../components/Forms/Switch"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import type { ILogin, IUser } from "../types/user.type"
import OverlayLoading from "../components/OverlayLoading"
import AnimatedLottie from "../components/FrameMotion"
import { LoginSchema } from '../services/zod/user.service'
import * as userService from '../services/user.service';
import { login } from '../redux/slices/auth.slice'
import { useDispatch } from 'react-redux'
import errorHandler from '../utils/errorHandle'
import { showNotification } from '../utils/helper'
import Lottie from 'lottie-react'

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [erros, setErrors] = useState<Record<string, string>>({})
  const [loginFormDto, setLoginFormDto] = useState<ILogin>({
    emailOrUsername: '',
    password: '',
    remember: false
  })
  const dispatch = useDispatch();
  
  const handleValidate = (): boolean => {
    const validate = LoginSchema.safeParse(loginFormDto);

    if (validate && !validate.success) {
      const newError: Record<string, string> = {};
      validate.error.issues.forEach(issue => {
        const field = issue.path[0] as string;
        newError[field] = issue.message
      })
      setErrors(newError);
      return false;
    }
    return true;
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLoginFormDto(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!handleValidate()) return;

    setErrors({});
    try {
      setIsLoading(true);
      await userService.handleLogin(loginFormDto)
      const user: IUser = {
        email: loginFormDto.emailOrUsername,
        username: loginFormDto.emailOrUsername,
      }
      console.log("Dau duoc luu vao: ", user);


      dispatch(login(user));
      window.location.href = '/'
      showNotification({ type: 'success', duration: 3000, message: "Đăng nhập thành công." })
    } catch (error: any) {
      console.log("loi:", error.message);
      errorHandler(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full max-w-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-300 p-4">
      <div className="relative max-w-5xl h-auto w-full p-8 md:p-12 bg-white shadow-2xl rounded-xl">
        <div className="flex flex-row">
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-semibold">Đăng nhập</h1>
            <form className="mt-5 space-y-2">
              <Text placeholder='Hòm thư / Tên đăng nhập' value={loginFormDto.emailOrUsername} error={erros.emailOrUsername} name="emailOrUsername" label="Email / Username" icon="User" onChange={handleChangeForm} />
              <Password placeholder='Mật khẩu' value={loginFormDto.password} error={erros.password} name="password" label="Password" onChange={handleChangeForm} />
            </form>
            <div className="flex flex-row mt-6 justify-between">
              <div className="self-center">
                <Switch
                  checked={loginFormDto.remember}
                  name="remember"
                  label="Remember"
                  onChange={handleChangeForm}
                />
              </div>
              <div>
                <Link
                  to={''}
                  className="text-sm hover:text-gray-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <button
              className="w-full bg-cyan-300 rounded-md py-2 px-3 mt-5 hover:cursor-pointer hover:bg-cyan-700"
              type="submit"
              onClick={handleSubmit}
            >
              <span className="text-sm font-semibold text-white">Đăng nhập</span>
            </button>
            <div className="mt-3">
              <span className="text-sm">
                Bạn chưa có tài khoản? Đến trang <Link to={'/regitser'} className="font-semibold hover:text-green-400">Đăng ký</Link>
              </span>

            </div>
          </div>
          <div className="border-2 border-cyan-200 rounded-md flex justify-center items-center">
            <Lottie animationData={LoginImg} loop={true} style={{ width: 400, height: 400 }} />
          </div>
        </div>
        <OverlayLoading show={isLoading} />
      </div>
    </div>
  )
}

export default LoginPage