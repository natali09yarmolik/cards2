import axios from 'axios'

import { ResetPassResponseType, SignUpType } from '../features/auth/types'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const instanceHeroku = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseDataType>('auth/login', data)
  },
  logout() {
    return instance.delete<ResetPassResponseType>('auth/me')
  },
  signUp(email: string, password: string) {
    return instance.post<SignUpType>('auth/register', { email, password })
  },
  getData() {
    return instance.post<ResponseDataType>('auth/me')
  },
  changeName(name: string) {
    return instance.put('auth/me', { name })
  },
  me() {
    return instance.post<ResponseDataType>('auth/me', {})
  },
  forgotPass(data: { email: string; from: string; message: string }) {
    return instanceHeroku.post<ResetPassResponseType>('auth/forgot', { ...data })
  },
  resetPass(data: { password: string; resetPasswordToken: string }) {
    return instanceHeroku.post<ResetPassResponseType>('auth/set-new-password', { ...data })
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ResponseDataType = {
  _id: string
  email: string
  name: string
  avatar?: string | null
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
