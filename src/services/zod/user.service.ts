import z from "zod";

export const RegisterSchema = z.object({
  email: z.email("Email không hợp lệ."),
  username: z.string().min(1, "Username không được để trống."),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự."),
  passConfirm: z.string().min(6, "Mật khẩu xác nhận ít nhất 6 ký tự.")
}).refine((data) => data.password === data.passConfirm, {
  error: "Mật khẩu xác nhận không khớp",
  path: ['passConfirm']
})

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Tài khoản đăng nhập không được để trống."),
  password: z.string().min(1, "Mật khẩu không được để trống."),
  remember: z.boolean()
})
