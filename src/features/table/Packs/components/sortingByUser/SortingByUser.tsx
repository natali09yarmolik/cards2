import { Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { selectUserId } from '../../../../profile/selectors'
import { useStyles } from '../../../../styleMU/styleMU'
import { setMyPacksAC } from '../../actions'
import { selectPacksUserId } from '../../selectors'

import s from './SortingByUser.module.css'

export const SortingByUser = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const myID = useAppSelector(selectUserId)
  const packsUser_id = useAppSelector(selectPacksUserId)
  const style = useStyles()
  const handleSortByMyPacks = () => {
    dispatch(setMyPacksAC(myID))
    setSearchParams({ ...Object.fromEntries(searchParams), user_id: myID as string })
  }
  const handleSortByAllPacks = () => {
    searchParams.delete('user_id')
    dispatch(setMyPacksAC(null))
    setSearchParams({ ...Object.fromEntries(searchParams) })
  }

  return (
    <div className={s.wrapper}>
      <div>Show packs cards</div>
      <div>
        <Button
          variant="contained"
          onClick={handleSortByMyPacks}
          disabled={!!packsUser_id}
          className={style.buttonSave}
        >
          My
        </Button>
        <Button
          variant="contained"
          onClick={handleSortByAllPacks}
          disabled={!packsUser_id}
          className={style.buttonSave}
        >
          All
        </Button>
      </div>
    </div>
  )
}
