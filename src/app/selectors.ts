import { AppRootStateType } from './store'

export const selectError = (state: AppRootStateType) => state.app.error
export const selectAppInfo = (state: AppRootStateType) => state.app.appInfo
export const selectIsAppInitialized = (state: AppRootStateType) => state.app.isAppInitialized
export const selectIsAppMakeRequest = (state: AppRootStateType) => state.app.isAppMakeRequest
