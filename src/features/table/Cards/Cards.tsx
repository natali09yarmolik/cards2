import React, { useEffect, useState } from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar'
import { LinkToBack } from '../../../common/components/LinkToBack/LinkToBack'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'

import {
  setCardsPackIdAC,
  setCardsPageAC,
  setCardsPageCountAC,
  setCardsSearchByQuestionAC,
  setCardsSortAC,
} from './actions'
import { getCardsTC } from './cards-reducer'
import s from './Cards.module.css'
import { CardsTable } from './CardsTable/CardsTable'
import { SearchQuestion } from './components/SearchQuestion'
import {
  selectCardsPackId,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsQuestion,
  selectCardsSort,
  selectPackName,
} from './selectors'

import { AddEditCardModal } from 'common/components/modals/Modal/components/AddEditCard/AddEditCardModal'

export const Cards = () => {
  const pageCount = useAppSelector(selectCardsPageCount)
  const packName = useAppSelector(selectPackName)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const page = useAppSelector(selectCardsPage)
  const question = useAppSelector(selectCardsQuestion)
  const sortCards = useAppSelector(selectCardsSort)
  const pack_id = useAppSelector(selectCardsPackId)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getCardsTC())
    }
  }, [dispatch, page, pageCount, pack_id, question, sortCards, isFirstLoading, packName])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setCardsPackIdAC(params.cardsPack_id))
      dispatch(setCardsPageCountAC(100))
      dispatch(setCardsPageAC(+params.page || 1))
      dispatch(setCardsSearchByQuestionAC(params.question || ''))
      dispatch(setCardsSortAC(params.sortCards || null))
      setIsFirstLoading(false)
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
      <div className={s.packName}>
        <h2>{packName}</h2>
      </div>

      <div className={s.cardsSearchBlock}>
        <div className={s.cardsSearchTitle}>Search for questions</div>
        <SearchQuestion />
      </div>

      <div className={s.cardsHeader}>
        <h3>Cards list</h3>
        <AddEditCardModal type={'createCard'} title={'Add new card'} titleButton={'Add'} />
      </div>

      <CardsTable />
      <ErrorSnackbar />
    </div>
  )
}
