export const ErrorCode = {
    MAIL_IS_REQUIRED: "Email is required",
    USERNAME_IS_REQUIRED: "Username is required",
    PASSWORD_IS_REQUIRED: "Password is required",
    PASSCONFIRM_ISREQUIRED: "Password confirm is required",
    MATCHED_WITH_PASSWORD: "Password confirm must be matched Password",
}

export const ErrorMessage:Record<string,string> = {
    [ErrorCode.MAIL_IS_REQUIRED]: "Hòm thư không hợp lệ.",
    [ErrorCode.USERNAME_IS_REQUIRED]: "Tên tài khoản không được để trống.",
    [ErrorCode.PASSWORD_IS_REQUIRED]: "Mật khẩu không được để trống.",
    [ErrorCode.PASSCONFIRM_ISREQUIRED]: "Mật khẩu xác nhận không được để trống.",
    [ErrorCode.MATCHED_WITH_PASSWORD]: "Mật khẩu xác nhận không khớp."
}

export const getErrorMessage = (errorCode: string) =>{
    return ErrorMessage[errorCode] || errorCode
}
