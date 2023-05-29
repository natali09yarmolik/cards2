import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import filterIcon from '../../../../images/Group 1496.png'
import { setMinMaxCardsAC, setMyPacksAC, setPackNameAC, setPacksSortAC } from '../../actions'
import { selectMaxCardsCount } from '../../selectors'

import s from './NoFilters.module.css'

export const NoFilters = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const handleDeleteAllFilters = () => {
    dispatch(setPackNameAC(''))
    dispatch(setMyPacksAC(null))
    dispatch(setMinMaxCardsAC(0, maxCardsCount))
    dispatch(setPacksSortAC(null))
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('packName')
    searchParams.delete('user_id')
    searchParams.delete('sortPacks')
    setSearchParams({
      page: '1',
      pageCount: '5',
    })
  }

  return (
    <div className={s.iconsFilter}>
      <img alt={'icon'} src={filterIcon} onClick={handleDeleteAllFilters} />
    </div>
  )
}
