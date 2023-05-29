import { InferValueTypes } from '../../app/types'

import * as actions from './actions'

export type LearnActionsType = ReturnType<InferValueTypes<typeof actions>>

export type CardsParamsForLearnType = {
  page: number
  pageCount: number
  cardsPack_id: string
}
export type LearnParamsType = {
  cardsPack_id: string
}

/*export type LearnParamsType = {
  page: number
  pageCount: number
  cardsPack_id: string
}*/
