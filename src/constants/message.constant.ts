export const REGISTER_SUCCESS = "Đăng ký thành công";
export const SAVE_SUCCESS = "Lưu thành công";
export const SEND_CODE = {
    CHANGE_PASSWORD: "Change password",
    FORGET_PASSWORD: "Forget password"
}

export const TITLE_SEND:Record<string,string> = {
    [SEND_CODE.CHANGE_PASSWORD]: "Đổi mật khẩu",
    [SEND_CODE.FORGET_PASSWORD]: "Mã xác thực"
}

export const getTitleSend = (titleSend: string) =>{
    return TITLE_SEND[titleSend] || titleSend;
}
