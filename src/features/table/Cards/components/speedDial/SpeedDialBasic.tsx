import * as React from 'react'
import { useState } from 'react'

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { createCacheKeyComparator } from 'reselect/es/defaultMemoize'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { PATH } from '../../../../../common/utils/routes/Routes'
import { selectUserId } from '../../../../profile/selectors'
import { EditIcon } from '../../../common/icons/EditIcon'
import { TeacherIcon } from '../../../common/icons/TeacherIcon'
import { TrashIcon } from '../../../common/icons/TrashIcon'
import { selectPacksUserId } from '../../../Packs/selectors'
import { setCardsPackIdAC, setCardsPackNameAC } from '../../actions'
import { selectCardsPackId, selectPackName } from '../../selectors'

import dots from './../../../common/icons/dots.png'
import s from './SpeedDial.module.css'

export const SpeedDialBasic = () => {
  const itemId = useSelector(selectCardsPackId)
  const packName = useSelector(selectPackName)
  const myID = useAppSelector(selectUserId)
  const packsUser_id = useAppSelector(selectPacksUserId)

  const dispatch = useAppDispatch()
  const [click, setClick] = useState(true)
  const handleClick = () => {
    dispatch(setCardsPackIdAC(itemId))
    dispatch(setCardsPackNameAC(packName as string))
  }
  const handleClickDots = () => {
    setClick(!click)
  }
  const classDots = click ? s.activeDots : s.passiveDots

  return (
    <div>
      <div onClick={handleClickDots}>
        <img src={dots} alt={'dots'} />
      </div>
      <div className={classDots}>
        <NavLink to={PATH.learn} onClick={handleClick}>
          <TeacherIcon />
        </NavLink>
        {myID === packsUser_id && (
          <div>
            <button>
              <EditIcon />
            </button>
            <button>
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
