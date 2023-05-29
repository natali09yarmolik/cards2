import { AppRootStateType } from '../../app/store'

export const selectEmail = (state: AppRootStateType) => state.profile.email
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

export const selectName = (state: AppRootStateType) => state.profile.name
export const selectUserId = (state: AppRootStateType) => state.profile._id
export const selectAvatar = (state: AppRootStateType) => state.profile.avatar
