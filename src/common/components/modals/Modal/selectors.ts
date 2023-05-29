import { AppRootStateType } from '../../../../app/store'

export const selectAddCardModal = (state: AppRootStateType) => state.modals.addCardIsOpen
export const selectAddPackModal = (state: AppRootStateType) => state.modals.addPackIsOpen
export const selectEditPackModal = (state: AppRootStateType) => state.modals.editPackIsOpen
export const selectEditCardModal = (state: AppRootStateType) => state.modals.editCardIsOpen
export const selectDeletePackModal = (state: AppRootStateType) => state.modals.deletePackIsOpen
export const selectDeleteCardModal = (state: AppRootStateType) => state.modals.deleteCardIsOpen
export const selectIsActiveModal = (state: AppRootStateType) => state.modals.isActiveModal
export const selectPackName = (state: AppRootStateType) => state.modals.name
export const selectPackId = (state: AppRootStateType) => state.modals.packId
export const selectCardQuestion = (state: AppRootStateType) => state.modals.question
export const selectCardAnswer = (state: AppRootStateType) => state.modals.answer
export const selectCardId = (state: AppRootStateType) => state.modals.cardId
