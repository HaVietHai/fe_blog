export interface IUser{
    _id?:string,
    username: string,
    email: string,
    password?: string,
    avatar?: string,
    banner?: string,
    followed?: string[]
}

export interface LoginDtoResponse{
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number
}

export interface AuthState{
    current: IUser | null,
    isLoggedIn: boolean
}

export interface IRegitser extends IUser{
    passConfirm: string
}

export interface ILogin{
    emailOrUsername: string,
    password: string,
    remember?: boolean
}

export interface ISendMail{
    email: string,
    title?: string,
}

export interface OTPCodeRequestDto extends ISendMail{
    success?: boolean
    randomCode: string;
}

export interface OtpState{
    verified: boolean,
}

export interface IFollow{
  currentUserId?: string; // người đang đăng nhập
  targetUserId?: string;  // người bị follow
}

export interface User{
    _id: string
    avatar: string
    email: string,
    username?: string
    userName?: string
}

export interface IChangePass{
    oldPass: string,
    newPass: string,
    confirmPass: string
}

export interface IForgotPass{
    newPass: string,
    confirmPass: string
}