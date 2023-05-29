import { instance } from '../../api/api'

export const profileAPI = {
  changeName(name: string) {
    return instance.put<ProfileUserType>('auth/me', { name })
  },
  changeAva(name: string, avatar: string) {
    return instance.put<ProfileUserType>('auth/me', { name, avatar })
  },
}

type ProfileUserType = {
  updatedUser: UpdateUserType
  error?: string
}
type UpdateUserType = {
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
}
