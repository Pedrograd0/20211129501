import { User } from "./User"

export interface UserLoginRequest
{
    email :string
    password :string
}

export interface UserLoginResponse
{
    apiToken :string
    user :User
}