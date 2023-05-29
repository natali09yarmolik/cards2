import { ModalActionsType } from './types'

const modalInitialState = {
  isActiveModal: false,
  addCardIsOpen: false,
  addPackIsOpen: false,
  editPackIsOpen: false,
  editCardIsOpen: false,
  deletePackIsOpen: false,
  deleteCardIsOpen: false,
  name: '',
  packId: '',
  question: '',
  answer: '',
  cardId: '',
}

export type ModalInitialState = typeof modalInitialState

export const modalReducer = (
  state: ModalInitialState = modalInitialState,
  action: ModalActionsType
): ModalInitialState => {
  switch (action.type) {
    case 'MODAL/IS_ACTIVE_MODAL':
      return { ...state, isActiveModal: action.payload.isActiveModal }
    case 'MODAL/ADD_PACK_IS_OPEN':
      return { ...state, addPackIsOpen: action.payload.addPackIsOpen }
    case 'MODAL/ADD_CARD_IS_OPEN':
      return { ...state, addCardIsOpen: action.payload.addCardIsOpen }
    case 'MODAL/EDIT_PACK_IS_OPEN':
      return { ...state, editPackIsOpen: action.payload.editPackIsOpen }
    case 'MODAL/EDIT_CARD_IS_OPEN':
      return { ...state, editCardIsOpen: action.payload.editCardIsOpen }
    case 'MODAL/DELETE_PACK_IS_OPEN':
      return { ...state, deletePackIsOpen: action.payload.deletePackIsOpen }
    case 'MODAL/DELETE_CARD_IS_OPEN':
      return { ...state, deleteCardIsOpen: action.payload.deleteCardIsOpen }
    case 'MODAL/SET_PACK_NAME':
      return { ...state, name: action.payload.name }
    case 'MODAL/SET_PACK_ID':
      return { ...state, packId: action.payload.id }
    case 'MODAL/SET_CARD_QUESTION':
      return { ...state, question: action.payload.question }
    case 'MODAL/SET_CARD_ANSWER':
      return { ...state, answer: action.payload.answer }
    case 'MODAL/SET_CARD_ID':
      return { ...state, cardId: action.payload.id }
    default:
      return state
  }
}
