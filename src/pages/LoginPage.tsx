import LoginImg from '../assets/animations/LoginForm.json'
import Text from "../components/Forms/Text"
import Password from "../components/Forms/Password"
import Switch from "../components/Forms/Switch"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import type { ILogin } from "../types/user.type"
import OverlayLoading from "../components/OverlayLoading"
import AnimatedLottie from "../components/FrameMotion"
import { LoginSchema } from '../services/zod/user.service'

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [erros, setErrors] = useState<Record<string, string>>({})
  const [loginFormDto, setLoginFormDto] = useState<ILogin>({
    emailOrUsername: '',
    password: '',
    remember: false
  })

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

  const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!handleValidate()) return;

    try {
      setIsLoading(true);
    } catch (error: any) {
      console.log(error.message);
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
              <Text error={erros.emailOrUsername} name="emailOrUsername" label="Email / Tên đăng nhập" icon="User" onChange={handleChangeForm} />
              <Password error={erros.password} name="password" label="Mật khẩu" onChange={handleChangeForm} />
            </form>
            <div className="flex flex-row mt-6 justify-between">
              <div className="self-center">
                <Switch
                  name="remember"
                  label="Remember"
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
          <AnimatedLottie animationData={LoginImg} direction="right" />
        </div>
        <OverlayLoading show={isLoading} />
      </div>
    </div>
  )
}

export default LoginPage