import { AllReducersActionType, AppThunk } from '../../app/types'
import { errorUtils } from '../../common/utils/errorUtils'

import * as appActions from './../../app/actions'
import * as profileActions from './actions'
import { profileAPI } from './profileApi'
import { ProfileActionsType, ProfileInitialStateType } from './types'

export const profileInitialState: ProfileInitialStateType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: null,
  created: 0,
  updated: 0,
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
}

export const profileReducer = (
  state: ProfileInitialStateType = profileInitialState,
  action: ProfileActionsType
): ProfileInitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET_PROFILE':
      return { ...state, ...action.payload.data }
    case 'PROFILE/CHANGE_NAME':
      return { ...state, name: action.payload.name }
    case 'PROFILE/CHANGE_AVA':
      return { ...state, avatar: action.payload.avatar }
    default:
      return state
  }
}

//thunks

//Change nickName
export const changeNameTC =
  (name: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    try {
      const res = await profileAPI.changeName(name)

      dispatch(profileActions.changeNameAC(res.data.updatedUser.name))
      dispatch(appActions.setAppInfoAC(`Name changed to ${res.data.updatedUser.name}`))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
//=========Change Avatar
export const changeAvaTC =
  (name: string, avatar: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    try {
      const res = await profileAPI.changeAva(name, avatar)

      // dispatch(profileActions.changeNameAC(res.data.updatedUser.name))
      dispatch(profileActions.changeAvaAC(res.data.updatedUser.avatar as string))
      //dispatch(appActions.setAppInfoAC(`Avatar changed to ${res.data.updatedUser.name}`))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
