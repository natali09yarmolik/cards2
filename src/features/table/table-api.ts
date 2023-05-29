import { AxiosResponse } from 'axios'

import { instance } from '../../api/api'

export const packsAPI = {
  getPacks(params: PacksRequestDataType) {
    return instance.get<PacksResponseDataType>('cards/pack', { params })
  },
  addPack(data: AddPackRequestDataType) {
    return instance.post<AddPackResponseDataType>('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete<AxiosResponse>(`cards/pack?id=${id}`)
  },
  updatePack(data: UpdatePackRequestDataType) {
    return instance.put<AxiosResponse>('cards/pack', data)
  },
}
export const cardsAPI = {
  getCards(params: CardsRequestDataType) {
    return instance.get<CardsResponseDataType>(`cards/card?cardsPack_id=${params.cardsPack_id}`, {
      params,
    })
  },
  addCard(data: AddCardRequestType) {
    return instance.post<AxiosResponse>('cards/card', data)
  },
  deleteCard(id: string) {
    return instance.delete<AxiosResponse>(`cards/card?id=${id}`)
  },
  updateCard(data: UpdateCardRequestDataType) {
    return instance.put<AxiosResponse>('cards/card', data)
  },
  updateGrade(data: UpdateGradeDataType) {
    return instance.put<UpdateGradeType>('cards/grade', data)
  },
  getCardsForLearn(params: CardsLearnRequestDataType) {
    return instance.get<CardsResponseDataType>(`cards/card?cardsPack_id=${params.cardsPack_id}`, {
      params,
    })
  },
}
export type PacksRequestDataType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  userId?: string
  block?: boolean
}
export type CardsLearnRequestDataType = {
  page: number
  pageCount: number
  cardsPack_id: string
}
export type PacksResponseDataType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}
export type AddPackRequestDataType = {
  cardsPack: {
    name: string | undefined
    deckCover?: string
    private: boolean
  }
}
export type AddPackResponseDataType = {
  newCardsPack: {}
}
export type UpdatePackRequestDataType = {
  cardsPack: {
    _id: string | undefined
    name: string | undefined
  }
}

export type CardsRequestDataType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type CardsResponseDataType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
export type AddCardRequestType = {
  card: {
    cardsPack_id: string
    question: string | undefined
    answer: string | undefined
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}
export type UpdateCardRequestDataType = {
  card: {
    _id: string | undefined
    question?: string
    answer?: string
  }
}
export type UpdateGradeDataType = {
  card_id: string
  grade: number
}
export type UpdateGradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
