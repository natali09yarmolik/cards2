import { authAPI, LoginParamsType, ResponseDataType } from '../../api/api'
import { AllReducersActionType, AppThunk } from '../../app/types'
import { errorUtils } from '../../common/utils/errorUtils'
import { setProfileAC } from '../profile/actions'

import * as appActions from './../../app/actions'
import * as profileActions from './../profile/actions'
import * as authActions from './actions'
import { AuthActionsType } from './types'

const authInitialState = {
  isLoggedIn: false,
  isSignedUp: false,
  mailWasSent: false,
  isPasswordChanged: false,
  resetMailToken: null as null | string,
}

export type AuthInitialStateType = typeof authInitialState

export const authReducer = (
  state: AuthInitialStateType = authInitialState,
  action: AuthActionsType
): AuthInitialStateType => {
  switch (action.type) {
    case 'AUTH/SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'AUTH/SET_IS_SIGNED_UP':
      return { ...state, isSignedUp: action.isSignedUp }
    case 'AUTH/SET_MAIL_WAS_SENT':
      return { ...state, mailWasSent: action.mailWasSent }
    case 'AUTH/SET_IS_PASSWORD_CHANGED':
      return { ...state, isPasswordChanged: action.isPasswordChanged }
    default:
      return state
  }
}

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      const res = await authAPI.login(data)

      dispatch(authActions.setLoggedInAC(true))
      dispatch(profileActions.setProfileAC(res.data))
      dispatch(appActions.setAppInfoAC(`Welcome, ${res.data.name}`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
export const logoutTC = (): AppThunk<AllReducersActionType> => async dispatch => {
  dispatch(appActions.setAppIsLoadingAC(true))
  try {
    const res = await authAPI.logout()

    setProfileAC({} as ResponseDataType)

    dispatch(appActions.setAppInfoAC(res.data.info))
  } catch (err: any) {
    errorUtils(err, dispatch)
  } finally {
    dispatch(authActions.setLoggedInAC(false))
    dispatch(appActions.setAppIsLoadingAC(false))
  }
}

export const signUpTC =
  (email: string, password: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      const res = await authAPI.signUp(email, password)

      dispatch(appActions.setAppInfoAC(res.data.addedUser.email + ' has registered'))
      dispatch(authActions.setIsSignedUpAC(true))
    } catch (e: any) {
      errorUtils(e, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
export const forgotPassTC =
  (email: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    const from = 'test-front-admin <ai73a@yandex.by>'
    const message = `<div style="background-color: #98a498; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/Cards#/set-new-password/$token$'>
                    link</a>
                    </div>`
    const data = { email, from, message }

    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      const res = await authAPI.forgotPass(data)

      dispatch(appActions.setAppInfoAC(`${res.data.info}, Check your email: ${email}`))
      dispatch(authActions.setMailWasSentAC(true))
    } catch (e: any) {
      errorUtils(e, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
export const resetPasswordTC = (
  password: string,
  resetPasswordToken: string
): AppThunk<AllReducersActionType> => {
  return async dispatch => {
    const data = { password, resetPasswordToken }

    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      const res = await authAPI.resetPass(data)

      dispatch(authActions.setIsPasswordChangedAC(true))
      dispatch(appActions.setAppInfoAC(res.data.info))
    } catch (e: any) {
      errorUtils(e, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
}
