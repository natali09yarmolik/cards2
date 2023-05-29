import { ResponseDataType } from '../../api/api'

export const setProfileAC = (data: ResponseDataType) =>
  ({ type: 'PROFILE/SET_PROFILE', payload: { data } } as const)
export const changeNameAC = (name: string) =>
  ({ type: 'PROFILE/CHANGE_NAME', payload: { name } } as const)
export const changeAvaAC = (avatar: string) =>
  ({ type: 'PROFILE/CHANGE_AVA', payload: { avatar } } as const)
