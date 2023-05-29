import { setAppIsLoadingAC } from '../../../app/actions'
import { AllReducersActionType, AppThunk } from '../../../app/types'
import { dateUtils } from '../../../common/utils/dateUtils'
import { errorUtils } from '../../../common/utils/errorUtils'
import {
  AddCardRequestType,
  cardsAPI,
  CardsType,
  UpdateCardRequestDataType,
  UpdateGradeDataType,
} from '../table-api'

import * as appActions from './../../../app/actions'
import * as cardsActions from './actions'
import { CardsActionsType, CardsParamsType, LearnParamsType } from './types'

export const cardsInitialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 1,
  maxGrade: 1,
  minGrade: 1,
  page: 1,
  pageCount: 100,
  pack_id: '',
  packUser_id: '',
  sortCards: null as null | string,
  cardQuestion: '',
  name: '',
  cardsForLearn: [] as CardsType[],
}

export type CardsInitialStateType = typeof cardsInitialState

export const cardsReducer = (
  state: CardsInitialStateType = cardsInitialState,
  action: CardsActionsType
): CardsInitialStateType => {
  switch (action.type) {
    case 'TABLE/SET_CARDS':
      return {
        ...state,
        cards: action.payload.cards.map(cards => {
          return {
            ...cards,
            updated: dateUtils(cards.updated),
            created: dateUtils(cards.created),
          }
        }),
      }
    case 'TABLE/SET_CARDS_TOTAL_COUNT':
      return { ...state, cardsTotalCount: action.payload.cardsTotalCount }
    case 'TABLE/SET_CARDS_MAX_GRADE':
      return { ...state, maxGrade: action.payload.maxGrade }
    case 'TABLE/SET_CARDS_MIN_GRADE':
      return { ...state, minGrade: action.payload.minGrade }
    case 'TABLE/SET_CARDS_PAGE':
      return { ...state, page: action.payload.page }
    case 'TABLE/SET_CARDS_PAGE_COUNT':
      return { ...state, pageCount: action.payload.pageCount }
    case 'TABLE/SET_CARDS_PACK_ID':
      return { ...state, pack_id: action.payload.pack_id }
    case 'TABLE/SET_CARDS_PACK_USER_ID':
      return { ...state, packUser_id: action.payload.packUser_id }
    case 'TABLE/SET_CARDS_SORT':
      return { ...state, sortCards: action.payload.sortCards }
    case 'TABLE/SET_CARDS_SEARCH_BY_QUESTION':
      return { ...state, cardQuestion: action.payload.question }
    case 'TABLE/SET_CARDS_PACK_NAME':
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}

export const getCardsTC = (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
  dispatch(appActions.setAppIsLoadingAC(true))
  const { page, pageCount, pack_id, sortCards, cardQuestion } = getState().cards
  const params: CardsParamsType = {
    page,
    pageCount,
    cardsPack_id: pack_id.toString(),
  }

  if (sortCards !== null) {
    params.sortCards = sortCards
  }
  if (cardQuestion !== '') {
    params.cardQuestion = cardQuestion
  }

  try {
    const res = await cardsAPI.getCards(params)

    dispatch(cardsActions.setCardsAC(res.data.cards))
    dispatch(cardsActions.setCardsTotalCountAC(res.data.cardsTotalCount))
    /*dispatch(cardsActions.setCardsMaxGradeAC(res.data.maxGrade))
    dispatch(cardsActions.setCardsMinGradeAC(res.data.minGrade))*/
  } catch (err: any) {
    errorUtils(err, dispatch)
  } finally {
    dispatch(appActions.setAppIsLoadingAC(false))
  }
}
export const addCardTC =
  (data: AddCardRequestType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      await cardsAPI.addCard(data)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC(`Your card has been added`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
export const deleteCardTC =
  (id: string): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      await cardsAPI.deleteCard(id)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC('Your card has been deleted'))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
export const updateCardTC =
  (data: UpdateCardRequestDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(appActions.setAppIsLoadingAC(true))
    try {
      await cardsAPI.updateCard(data)
      dispatch(getCardsTC())
      dispatch(appActions.setAppInfoAC(`Your card has been updated`))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(appActions.setAppIsLoadingAC(false))
    }
  }
