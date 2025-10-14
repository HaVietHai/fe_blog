export interface IRegitser{
    username: string,
    email: string,
    password: string,
    passConfirm: string
}

export interface ILogin{
    emailOrUsername: string,
    password: string,
    remember?: boolean
}