import { AppRootStateType } from '../../app/store'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectMailWasSent = (state: AppRootStateType) => state.auth.mailWasSent
export const selectIsSignedUp = (state: AppRootStateType) => state.auth.isSignedUp
export const selectIsPasswordChanged = (state: AppRootStateType) => state.auth.isPasswordChanged
