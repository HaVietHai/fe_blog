export interface IUser{
    username: string,
    email: string,
    password?: string,
    avatar?: string
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