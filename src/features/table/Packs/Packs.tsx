import * as React from 'react'
import { useEffect, useState } from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { EmptySearch } from '../../../common/components/EmptySearch/EmptySearch'
import { AddEditPackModal } from '../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { PATH } from '../../../common/utils/routes/Routes'
import { selectIsLoggedIn } from '../../auth/selectors'

import {
  setMinMaxCardsAC,
  setMyPacksAC,
  setPackNameAC,
  setPacksPageAC,
  setPacksPageCountAC,
  setPacksSortAC,
} from './actions'
import { FilterCountCards } from './components/filterCountCards/FilterCountCards'
import { NoFilters } from './components/noFilters/NoFilters'
import { PaginationComponent } from './components/pagination/PaginationComponent'
import { SearchTitleCards } from './components/searchTitleCards/SearchTitleCards'
import { SortingByUser } from './components/sortingByUser/SortingByUser'
import { getPacksTC } from './packs-reducer'
import s from './Packs.module.css'
import { PacksTable } from './PacksTable/PacksTable'
import {
  selectCardPacks,
  selectPacksMaxCards,
  selectPacksMinCards,
  selectPacksName,
  selectPacksPage,
  selectPacksPageCount,
  selectPacksSort,
  selectPacksUserId,
} from './selectors'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const pageCount = useAppSelector(selectPacksPageCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const sortPacks = useAppSelector(selectPacksSort)
  const page = useAppSelector(selectPacksPage)
  const packName = useAppSelector(selectPacksName)
  const packsUser_id = useAppSelector(selectPacksUserId)
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const cardPacks = useAppSelector(selectCardPacks)
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (isLoggedIn && !isFirstLoading) {
      dispatch(getPacksTC())
    }
  }, [
    isFirstLoading,
    dispatch,
    page,
    pageCount,
    packName,
    sortPacks,
    packsUser_id,
    minCards,
    maxCards,
  ])

  useEffect(() => {
    if (isFirstLoading) {
      dispatch(setPacksPageCountAC(+params.pageCount || 5))
      dispatch(setPacksPageAC(+params.page || 1))
      dispatch(setMinMaxCardsAC(+params.min || 0, +params.max || 0))
      dispatch(setPackNameAC(params.packName || ''))
      dispatch(setMyPacksAC(params.user_id || null))
      dispatch(setPacksSortAC(params.sortPacks || null))
      setIsFirstLoading(false)
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <div className={s.packsHeader}>
        <h3>Packs list</h3>
        <AddEditPackModal type={'create'} title={'Add new pack'} titleButton={'Add'} />
      </div>

      <div className={s.packsBlock}>
        <SearchTitleCards />
        <SortingByUser />
        <FilterCountCards />
        <NoFilters />
      </div>
      {cardPacks.length !== 0 ? (
        <div>
          <PacksTable />
          <PaginationComponent />
        </div>
      ) : (
        <EmptySearch />
      )}
    </div>
  )
}
