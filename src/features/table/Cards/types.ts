import { InferValueTypes } from '../../../app/types'

import * as actions from './actions'

export type CardsActionsType = ReturnType<InferValueTypes<typeof actions>>

export type CardsParamsType = {
  page: number
  pageCount: number
  cardsPack_id: string
  sortCards?: string
  cardQuestion?: string
}
export type LearnParamsType = {
  cardsPack_id: string
}
