import type React from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import type { ISendMail } from "../../types/user.type";
import errorHandler from "../../utils/errorHandle";
import InforInput from "./Form/InforInput";
import OTPInput from "./Form/OTPInput";
import { OTPSchema } from "../../services/zod/user.service";
import { handleSendOtp } from "../../services/user.service";
import { showNotification } from "../../utils/helper";


const ForgetPage: React.FC = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string>>({});
    const [viewOtp, setViewOtp] = useState<number>(1);
    const [forgetPassForm, setForgetPassForm] = useState<ISendMail>({
        email: ''
    })

    const handleValidate = (): boolean => {
        const validate = OTPSchema.safeParse(forgetPassForm);

        if (validate && !validate.success) {
            const newError: Record<string, string> = {};
            validate.error.issues.forEach(issue => {
                const field = issue.path[0] as string;
                newError[field] = issue.message
            })

            setError(newError);
            return false
        }
        return true;
    }

    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForgetPassForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSendMail = async(event: React.ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!handleValidate()) return;

        try {
            setIsLoading(true);
            const infor:ISendMail = {
                email: forgetPassForm.email,
                title: "Mã xác thực (Do quên mật khẩu)."
            }
            await handleSendOtp(infor);
            setError({})
            setViewOtp(2);
            showNotification({type: 'success', duration: 3000, message: `Đã gửi mã xác nhận về: ${forgetPassForm.email}`});
        } catch (error: any) {
            console.log("Loi nay",error.response.data);
            errorHandler(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="v-background-web max-w-full flex justify-center items-center p-4">
            <div className="relative max-w-5xl w-150 h-auto bg-white md:p-6 p-12 shadow-2xl rounded-xl">
                {viewOtp == 1 && (
                    <InforInput
                        error={error}
                        handleChangeForm={handleChangeForm}
                        handleSendMail={handleSendMail}
                        isLoading={isLoading}
                        otpForm={forgetPassForm}
                    />
                )}
                {viewOtp == 2 && (
                    <OTPInput title="Nhập mã xác thực" email={forgetPassForm.email} onSendOtp={handleSendMail}/>
                )}
            </div>
        </div>
    )
}

export default ForgetPage