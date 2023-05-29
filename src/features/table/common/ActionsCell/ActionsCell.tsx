import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { AddEditPackModal } from '../../../../common/components/modals/Modal/components/AddEditPack/AddEditPackModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { PATH } from '../../../../common/utils/routes/Routes'
import { setCardsPackIdForLearnAC } from '../../../learn/actions'
import { getCardsForLearnTC } from '../../../learn/learn-reducer'
import { selectUserId } from '../../../profile/selectors'
import { setCardsPackIdAC, setCardsPackNameAC, setCardsPageAC } from '../../Cards/actions'
import { getCardsTC } from '../../Cards/cards-reducer'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  packOwnerId: string
  itemId: string
  type?: 'packs' | 'cards'
  cardQuestion?: string
  packName?: string
  packId?: string
  cardsPackId?: string
  cardsCount?: number
}
export const ActionsCell: React.FC<ActionsCellPropsType> = ({
  packOwnerId,
  itemId,
  packName,
  type,
  packId,
  cardsPackId,
  cardsCount,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userId = useAppSelector(selectUserId)
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

  const handleLinkToCards = () => {
    dispatch(setCardsPackNameAC(packName as string))
    // navigate(PATH.packs + `learn/${itemId}`)
    navigate(PATH.learn)

    if (type === 'cards') {
      dispatch(setCardsPackIdAC(cardsPackId as string))
    } else if (type === 'packs') {
      dispatch(setCardsPackIdForLearnAC(itemId))
      dispatch(getCardsForLearnTC())
    }
  }
  const btnLearnClassName = cardsCount === 0 ? s.buttonLearn : ''

  return (
    <div className={s.cell}>
      {type === 'packs' && (
        <button
          className={btnLearnClassName}
          onClick={handleLinkToCards}
          disabled={isAppMakeRequest || cardsCount === 0}
        >
          <TeacherIcon />
        </button>
      )}
      {type === 'packs' && packOwnerId === userId && (
        <div>
          <AddEditPackModal
            packName={packName}
            packId={itemId}
            titleButton={'Edit'}
            title={'Edit pack'}
            type={'edit'}
          />
          <DeletePackAndCard packId={itemId} packName={packName} type={'deletePack'} />
        </div>
      )}
    </div>
  )
}
