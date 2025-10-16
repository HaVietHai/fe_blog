import z from "zod";
import { ErrorCode, getErrorMessage } from "../../constants/errors.constant";

export const RegisterSchema = z.object({
  email: z.email(getErrorMessage(ErrorCode.MAIL_IS_REQUIRED)),
  username: z.string().min(1, getErrorMessage(ErrorCode.USERNAME_IS_REQUIRED)),
  password: z.string().min(6, getErrorMessage(ErrorCode.PASSWORD_IS_REQUIRED)),
  passConfirm: z.string().min(6, getErrorMessage(ErrorCode.PASSCONFIRM_ISREQUIRED))
}).refine((data) => data.password === data.passConfirm, {
  error: getErrorMessage(ErrorCode.MATCHED_WITH_PASSWORD),
  path: ['passConfirm']
})

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Tài khoản đăng nhập không được để trống."),
  password: z.string().min(1, "Mật khẩu không được để trống."),
  remember: z.boolean()
})

export const OTPSchema = z.object({
    email: z.email(getErrorMessage(ErrorCode.MAIL_IS_REQUIRED))
})