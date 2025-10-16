import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { IconLucide } from "../../../components/IconLucide";
import errorHandler from "../../../utils/errorHandle";
import { useDispatch } from "react-redux";
import { handleVerifyOtp } from "../../../services/user.service";
import { setOtpVerified } from "../../../redux/slices/otp.slice";
import { showNotification } from "../../../utils/helper";

interface IPops {
  length?: number,
  onChangeOTP?: (otp: string) => void,
  title: string,
  email: string,
  onSendOtp: (e: React.ChangeEvent<HTMLButtonElement>) => void
}

const OTPInput: React.FC<IPops> = ({
  length = 5, onChangeOTP, title, onSendOtp, email
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [disabled, setDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])


  const handleOnChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return; // Chi nhap so
    const newOtp = [...otp];
    newOtp[index] = val
    setOtp(newOtp);

    if (onChangeOTP) onChangeOTP(newOtp.join(""));

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const handleAgainOtp = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      onSendOtp(e);
      handleSetTimeLimit(30);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSetTimeLimit = (time: number) => {
    setCount(time)
    setDisable(!disabled);
  }

  const handleValidate = (): boolean => {
    return true
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!handleValidate()) return;

    try {
      setIsLoading(true);

      const code = otp.join('').toString();
      const data = await handleVerifyOtp({ email: email, randomCode: code })

      if (data.success) {
        dispatch(setOtpVerified(true))
        navigate('/change-password');
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (count == 0) {
      setDisable(true);
      console.log(disabled);
      return;
    }
    setTimeout(() => {
      setCount(count - 1)
    }, 1000)
  }, [count, disabled])

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl font-semibold text-center text-gray-700">{title}</h1>
      <h4 className="text-sm font-semibold text-gray-400 text-center">Mã OTP</h4>
      <div className="flex justify-center">
        {otp.map((val, index) => (
          <input
            key={index}
            value={val}
            maxLength={1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            ref={(el) => { inputRefs.current[index] = el }}
            inputMode="numeric"
            className="h-14 w-15 text-center text-5xl rounded-md border border-gray-300 m-3 focus:ring-1 focus:ring-cyan-600 "
          />
        ))}
      </div>
      <div className="w-auto text-right">
        {disabled && disabled ? (
          <div>
            <button
              type="submit"
              onClick={handleAgainOtp}
            >
              <span
                className="text-sm hover:font-semibold hover:cursor-pointer hover:text-cyan-400"
              >
                Gửi lại mã OTP
              </span>
            </button>
          </div>
        ) : (
          <div>
            <span
              className="text-sm text-gray-400 hover:cursor-not-allowed"
            >Gửi lại mã OTP sau: {count}s</span>
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full px-2 py-3 bg-blue-300 rounded-md hover:cursor-pointer hover:bg-blue-700"
      >
        <span className="text-sm font-semibold text-white">Xác nhận</span>
      </button>
      <button
        onClick={() => navigate('/login')}
        className="flex flex-row justify-center w-full px-2 py-3 bg-green-300 rounded-md hover:cursor-pointer hover:bg-green-700"
      >
        <IconLucide name="ArrowBigLeft" className="w-5 h-5 text-white mr-2" />
        <span className="text-sm font-semibold text-white">Quay lại Đăng nhập</span>
      </button>
    </div>
  )
}

export default OTPInput