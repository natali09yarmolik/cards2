import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ModalActionsType } from '../common/components/modals/Modal/types'
import { AuthActionsType } from '../features/auth/types'
import { LearnActionsType } from '../features/learn/types'
import { ProfileActionsType } from '../features/profile/types'
import { CardsActionsType } from '../features/table/Cards/types'
import { PacksActionsType } from '../features/table/Packs/types'

import * as actions from './actions'
import { AppRootStateType } from './store'

//general application types
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllReducersActionType>

export type AppThunk<A extends AnyAction, ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  A
>
export type AllReducersActionType =
  | AuthActionsType
  | AppActionsType
  | ProfileActionsType
  | PacksActionsType
  | CardsActionsType
  | ModalActionsType
  | LearnActionsType

// APP types

export type AppActionsType = ReturnType<InferValueTypes<typeof actions>>

export type AppInitialStateType = {
  isAppInitialized: boolean
  isAppMakeRequest: boolean
  error: string | null
  appInfo: string | null
}
