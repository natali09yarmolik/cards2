import { createSelector } from 'reselect'

import { AppRootStateType } from '../../app/store'

export const selectCardsPackIdForLearn = (state: AppRootStateType) => state.learn.pack_id
export const selectCardsForLearn = (state: AppRootStateType) => state.learn.cards
/*export const selectCardsForLearn = createSelector(
  [
    (state: AppRootStateType) => {
      return state.cards.cards
    },
  ],
  cards => cards
)*/
