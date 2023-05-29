import { createSelector } from 'reselect'

import { AppRootStateType } from '../../../app/store'

export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardsPage = (state: AppRootStateType) => state.cards.page
export const selectCardsPageCount = (state: AppRootStateType) => state.cards.pageCount
export const selectCardsQuestion = (state: AppRootStateType) => state.cards.cardQuestion
export const selectPackUserId = (state: AppRootStateType) => state.cards.packUser_id
export const selectCardsSort = (state: AppRootStateType) => state.cards.sortCards
export const selectPackName = (state: AppRootStateType) => state.cards.name
export const selectCardsPackId = (state: AppRootStateType) => state.cards.pack_id

export const selectCardsCountOfPages = createSelector(
  [selectCardsTotalCount, selectCardsPageCount],
  (cardsTotalCount, pageCount) => {
    return Math.ceil(cardsTotalCount / pageCount)
  }
)

export const selectCards = createSelector(
  [
    (state: AppRootStateType) => {
      return state.cards.cards
    },
  ],
  cards => cards
)
