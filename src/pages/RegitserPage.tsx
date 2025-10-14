import Lottie from "lottie-react"
import RegisterImg from '../assets/animations/RegitserForm.json'
import Text from "../components/Forms/Text"
import Password from "../components/Forms/Password"
import { Link } from "react-router-dom"
import z from "zod"
import React, { useState } from "react"
import type { IRegitser } from "../types/user.type"
import OverlayLoading from "../components/OverlayLoading"
import AnimatedLottie from "../components/FrameMotion"

const RegisterSchema = z.object({
  email: z.email("Email không hợp lệ."),
  username: z.string().min(1, "Username không được để trống."),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự."),
  passConfirm: z.string().min(6, "Mật khẩu xác nhận ít nhất 6 ký tự.")
}).refine((data) => data.password === data.passConfirm, {
  error: "Mật khẩu xác nhận không khớp",
  path: ['passConfirm']
})

const RegitserPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [regitserFormDto, setRegisterFormDto] = useState<IRegitser>({
    email: '',
    username: '',
    password: '',
    passConfirm: ''
  });

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

  const handleSubmit = (event: React.ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!handleValidate()) return;

    try {
      setIsLoading(true);
      setErrors({})
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full max-w-full flex flex-1 bg-gradient-to-br justify-center items-center from-blue-500 to-cyan-300 p-4">
      <div className="relative max-w-5xl h-auto w-full p-8 md:p-12 bg-white shadow-2xl rounded-xl">
        <div className="flex flex-row">
          <AnimatedLottie animationData={RegisterImg} direction="left" />
          <div className="flex-1 w-max ml-4">
            <h1 className="font-semibold text-2xl">Đăng ký</h1>
            <form className="mt-3 space-y-2">
              <Text error={errors.email} value={regitserFormDto.email} onChange={handleChangeForm} name="email" label="Email" icon="Mail" />
              <Text error={errors.username} value={regitserFormDto.username} onChange={handleChangeForm} name="username" label="Username" icon="User" />
              <Password error={errors.password} value={regitserFormDto.password} onChange={handleChangeForm} name="password" label="Password" />
              <Password error={errors.passConfirm} value={regitserFormDto.passConfirm} onChange={handleChangeForm} name="passConfirm" label="Password Confirm" />
            </form>
            <button
              className="w-full bg-green-300 mt-5 py-2 px-3 rounded-md hover:bg-green-700"
              type="submit"
              onClick={handleSubmit}
            >
              <span className="text-sm font-semibold text-white">Đăng ký</span>
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
        <OverlayLoading show={isLoading} />
      </div>
    </div>
  )
}

export default RegitserPage