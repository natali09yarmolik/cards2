import { InferValueTypes } from '../../../app/types'

import * as actions from './actions'

export type PacksActionsType = ReturnType<InferValueTypes<typeof actions>>

export type PacksParamsType = {
  page: number
  pageCount: number
  sortPacks?: string
  packName?: string
  user_id?: string
  min?: number
  max?: number
}
