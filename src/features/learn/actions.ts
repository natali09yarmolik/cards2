import { CardsType } from '../table/table-api'

export const setCardsPackIdForLearnAC = (pack_id: string) =>
  ({
    type: 'LEARN/SET_CARDS_PACK_ID',
    payload: { pack_id },
  } as const)
export const setCardsUpdateGradeAC = (id: string, grade: number, shots: number) =>
  ({
    type: 'LEARN/SET_CARDS_UPDATE_GRADE',
    payload: { id, grade, shots },
  } as const)
export const setCardsForLearnAC = (cards: CardsType[]) =>
  ({
    type: 'LEARN/SET_CARDS_FOR_LEARN',
    payload: { cards },
  } as const)
