import { setAppIsLoadingAC } from '../../app/actions'
import { AllReducersActionType, AppThunk } from '../../app/types'
import { errorUtils } from '../../common/utils/errorUtils'
import { cardsAPI, CardsType, UpdateGradeDataType } from '../table/table-api'

import { setCardsForLearnAC, setCardsUpdateGradeAC } from './actions'
import { CardsParamsForLearnType, LearnActionsType } from './types'

export const InitialState = {
  cards: [] as CardsType[],
  page: 1,
  pageCount: 100,
  pack_id: '',
  grade: 0,
}

type InitialStateType = typeof InitialState

export const learnReducer = (
  state: InitialStateType = InitialState,
  action: LearnActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LEARN/SET_CARDS_PACK_ID':
      return { ...state, pack_id: action.payload.pack_id }
    case 'LEARN/SET_CARDS_FOR_LEARN':
      return {
        ...state,
        cards: action.payload.cards,
      }
    case 'LEARN/SET_CARDS_UPDATE_GRADE':
      return {
        ...state,
        cards: [
          ...state.cards.map(el => {
            return el._id === action.payload.id
              ? { ...el, grade: action.payload.grade, shots: action.payload.shots }
              : el
          }),
        ],
      }
    default:
      return state
  }
}

export const getCardsForLearnTC =
  (): AppThunk<AllReducersActionType> => async (dispatch, getState) => {
    dispatch(setAppIsLoadingAC(true))
    const { page, pageCount, pack_id } = getState().learn

    const params: CardsParamsForLearnType = {
      page,
      pageCount,
      cardsPack_id: pack_id,
    }

    try {
      const res = await cardsAPI.getCardsForLearn(params)

      dispatch(setCardsForLearnAC(res.data.cards))
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }

export const updateGradeTC =
  (data: UpdateGradeDataType): AppThunk<AllReducersActionType> =>
  async dispatch => {
    dispatch(setAppIsLoadingAC(true))
    try {
      const res = await cardsAPI.updateGrade(data)

      dispatch(setCardsUpdateGradeAC(res.data.card_id, res.data.grade, res.data.shots))
      dispatch(getCardsForLearnTC())
    } catch (err: any) {
      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsLoadingAC(false))
    }
  }
