import { useDispatch } from "react-redux"
import Password from "../../components/Forms/Password"
import { useNavigate } from "react-router-dom";
import type React from "react";
import { clearOtp } from "../../redux/slices/otp.slice";

const ChangePasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(clearOtp());
    navigate('/forgot-password');
  }

  return (
    <div className="h-full max-w-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-300 p-4">
      <div className="relative max-w-5xl w-150 h-auto bg-white md:p-6 p-12 shadow-2xl rounded-xl">
        <h1 className="font-bold text-2xl ">Đổi mật khẩu</h1>
        <form className="space-y-4 mt-4">
          <Password name="password" label="Password" placeholder="Mật khẩu mới" />
          <Password name="passConfirm" label="Password Confirm" placeholder="Xác nhận lại mật khẩu" />
        </form>
        <div className="flex flex-col mt-4 space-y-4">
          <button
            type="submit"
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