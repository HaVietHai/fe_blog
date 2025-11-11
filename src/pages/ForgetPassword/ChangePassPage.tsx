import { useDispatch } from "react-redux"
import Password from "../../components/Forms/Password"
import { useNavigate } from "react-router-dom";
import type React from "react";
import { clearOtp } from "../../redux/slices/otp.slice";
import errorHandler from "../../utils/errorHandle";
import { useState } from "react";
import type { IForgotPass } from "../../types/user.type";
import { ForgotSchema } from "../../services/zod/user.service";

const ChangePasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [formForgotPass, setFormForgotPass] = useState<IForgotPass>({
    newPass: "",
    confirmPass: ""
  })


  const handleCancel = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(clearOtp());
    navigate('/forgot-password');
  }

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    setFormForgotPass(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleValidate = ():boolean =>{
    const validate = ForgotSchema.safeParse(formForgotPass);

    if (validate && !validate.success) {
      const newError:Record<string, string> = {}
      validate.error.issues.forEach(issue => {
        const field = issue.path[0] as string
        newError[field] = issue.message
      })
      setErrors(newError);
      return false;
    }
    return true;
  }  

  const handleChangePass = async(e: React.ChangeEvent<HTMLButtonElement>) =>{
    e.preventDefault();

    if(!handleValidate()) return;

    try {
      setIsLoading(true);

    } catch (error) {
      errorHandler(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="v-background-web max-w-full flex justify-center items-center p-4">
      <div className="relative max-w-5xl w-150 h-auto bg-white md:p-6 p-12 shadow-2xl rounded-xl">
        <h1 className="effect-text-h">Đổi mật khẩu</h1>
        <form className="space-y-4 mt-4">
          <Password value={formForgotPass.newPass} name="newPass" error={errors.newPass} label="Password" placeholder="Mật khẩu mới" onChange={handleChangeForm}/>
          <Password value={formForgotPass.confirmPass} name="confirmPass" error={errors.confirmPass} label="Password Confirm" placeholder="Xác nhận lại mật khẩu" onChange={handleChangeForm}/>
        </form>
        <div className="flex flex-col mt-4 space-y-4">
          <button
            type="submit"
            onClick={handleChangePass}
            className="py-3 px-2 bg-cyan-300 rounded-md hover:bg-cyan-600 hover:cursor-pointer"
          >
            <span className="text-white text-sm font-semibold">
              Cập nhật Mật khẩu mới
            </span>
          </button>
          <button
            type="submit"
            onClick={handleCancel}
            className="py-3 px-2 bg-red-300 rounded-md hover:bg-red-600 hover:cursor-pointer"
          >
            <span className="text-white text-sm font-semibold">
              Hủy
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage