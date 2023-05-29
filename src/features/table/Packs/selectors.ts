import { createSelector } from 'reselect'

import { AppRootStateType } from '../../../app/store'

export const selectCardPacksTotalCount = (state: AppRootStateType) =>
  state.packs.cardPacksTotalCount
export const selectPacksPage = (state: AppRootStateType) => state.packs.page
export const selectPacksPageCount = (state: AppRootStateType) => state.packs.pageCount
export const selectPacksSort = (state: AppRootStateType) => state.packs.sortPacks

export const selectPacksUserId = (state: AppRootStateType) => state.packs.user_id
export const selectPacksName = (state: AppRootStateType) => state.packs.packName
export const selectPacksMinCards = (state: AppRootStateType) => state.packs.min
export const selectPacksMaxCards = (state: AppRootStateType) => state.packs.max
export const selectMinCardsCount = (state: AppRootStateType) => state.packs.minCardsCount
export const selectMaxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount

export const selectPacksCountOfPages = createSelector(
  [selectCardPacksTotalCount, selectPacksPageCount],
  (cardPacksTotalCount, pageCount) => {
    return Math.ceil(cardPacksTotalCount / pageCount)
  }
)

export const selectCardPacks = createSelector(
  [
    (state: AppRootStateType) => {
      return state.packs.cardPacks
    },
  ],
  cardPacks => cardPacks
)
