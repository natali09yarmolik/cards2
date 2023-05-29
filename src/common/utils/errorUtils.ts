import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, setAppIsLoadingAC } from '../../app/actions'
import { AppActionsType } from '../../app/types'

type ErrorType = Error | AxiosError<{ error: string }>

export const errorUtils = (e: ErrorType, dispatch: Dispatch<AppActionsType>) => {
  const err = e as ErrorType

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
  dispatch(setAppIsLoadingAC(false))
}
