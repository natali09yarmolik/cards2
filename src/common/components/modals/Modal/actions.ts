// export const modalIsClosedAC = (isClosed: boolean) =>
//   ({ type: 'MODAL/SET_CLOSED', payload: { isClosed } } as const)
export const modalAddCardIsOpenAC = (addCardIsOpen: boolean) =>
  ({
    type: 'MODAL/ADD_CARD_IS_OPEN',
    payload: { addCardIsOpen },
  } as const)
export const modalAddPackIsOpenAC = (addPackIsOpen: boolean) =>
  ({
    type: 'MODAL/ADD_PACK_IS_OPEN',
    payload: { addPackIsOpen },
  } as const)
export const modalEditPackIsOpenAC = (editPackIsOpen: boolean) =>
  ({
    type: 'MODAL/EDIT_PACK_IS_OPEN',
    payload: { editPackIsOpen },
  } as const)
export const modalEditCardIsOpen = (editCardIsOpen: boolean) =>
  ({
    type: 'MODAL/EDIT_CARD_IS_OPEN',
    payload: { editCardIsOpen },
  } as const)
export const modalDeletePackIsOpenAC = (deletePackIsOpen: boolean) =>
  ({
    type: 'MODAL/DELETE_PACK_IS_OPEN',
    payload: { deletePackIsOpen },
  } as const)
export const modalDeleteCardIsOpenAC = (deleteCardIsOpen: boolean) =>
  ({
    type: 'MODAL/DELETE_CARD_IS_OPEN',
    payload: { deleteCardIsOpen },
  } as const)
export const isActiveModalAC = (isActiveModal: boolean) =>
  ({
    type: 'MODAL/IS_ACTIVE_MODAL',
    payload: { isActiveModal },
  } as const)

export const modalSetPackNameAC = (name: string) =>
  ({
    type: 'MODAL/SET_PACK_NAME',
    payload: { name },
  } as const)
export const modalSetPackIdAC = (id: string) =>
  ({
    type: 'MODAL/SET_PACK_ID',
    payload: { id },
  } as const)
export const modalSetCardQuestionAC = (question: string) =>
  ({
    type: 'MODAL/SET_CARD_QUESTION',
    payload: { question },
  } as const)
export const modalSetCardAnswerAC = (answer: string) =>
  ({
    type: 'MODAL/SET_CARD_ANSWER',
    payload: { answer },
  } as const)
export const modalSetCardIdAC = (id: string) =>
  ({
    type: 'MODAL/SET_CARD_ID',
    payload: { id },
  } as const)
