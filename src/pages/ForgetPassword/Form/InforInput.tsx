import { useNavigate } from "react-router-dom"
import { IconLucide } from "../../../components/IconLucide"
import Text from "../../../components/Forms/Text";
import type { ISendMail } from "../../../types/user.type";
import type React from "react";
import OverlayLoading from "../../../components/OverlayLoading";

interface IProps{
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void,
    otpForm: ISendMail,
    error: Record<string,string>,
    handleSendMail: (e: React.ChangeEvent<HTMLButtonElement>) => void,
    isLoading: boolean
}

const InforInput:React.FC<IProps> = ({
    error, handleChangeForm, handleSendMail, otpForm,isLoading
}) => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-600">Khôi phục mật khẩu</h1>
            <form className="flex-1 mt-4 mb-3">
                <Text name="email" label="Email" placeholder="Nhập hòm thư" onChange={handleChangeForm} value={otpForm.email} error={error.email} />
            </form>
            <button
                disabled={isLoading}
                type="submit"
                onClick={handleSendMail}
                className={`${isLoading ? "bg-gray-200" : "bg-green-300 hover:bg-green-700"} w-full flex flex-row justify-center mt-5 py-2 px-3 rounded-md`}
            >
                <OverlayLoading show={isLoading} />
                <span className="text-sm font-semibold text-white">
                    Nhận mã OTP
                </span>
            </button>
            <button
                className="w-full bg-cyan-300 hover:bg-cyan-600 px-3 py-2 rounded-md hover:cursor-pointer mt-2"
                onClick={() => navigate('/login')}
            >
                <div className="flex flex-row justify-center">
                    <IconLucide name="ArrowBigLeft" className="w-5 h-4 text-white m-1" />
                    <span className="text-sm font-semibold text-white mt-[2px]">
                        Quay lại Đăng nhập
                    </span>
                </div>
            </button>
        </div>
    )
}

export default InforInput