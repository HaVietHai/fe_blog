import type React from "react"
import { useNavigate } from "react-router-dom"
import { IconLucide } from "../../components/IconLucide";
import z from "zod";
import { ErrorCode, getErrorMessage } from "../../constants/errors.constant";
import { useState } from "react";
import type { ISendMail } from "../../types/user.type";
import errorHandler from "../../utils/errorHandle";
import OverlayLoading from "../../components/OverlayLoading";
import Text from "../../components/Forms/Text";
import InforInput from "./Form/InforInput";
import OTPInput from "./Form/OTPInput";

const OTPSchema = z.object({
    email: z.email(getErrorMessage(ErrorCode.MAIL_IS_REQUIRED))
})

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

    const handleSendMail = (event: React.ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!handleValidate()) return;

        try {
            setIsLoading(true);
            setError({})
            setViewOtp(2);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-full max-w-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-300 p-4">
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
                    <OTPInput />
                )}
            </div>
        </div>
    )
}

export default ForgetPage