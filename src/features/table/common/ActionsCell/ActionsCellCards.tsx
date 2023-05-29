import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { selectIsAppMakeRequest } from '../../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { AddEditCardModal } from '../../../../common/components/modals/Modal/components/AddEditCard/AddEditCardModal'
import { DeletePackAndCard } from '../../../../common/components/modals/Modal/components/DeleteModal/DeletePackAndCard'
import { PATH } from '../../../../common/utils/routes/Routes'
import { setCardsPackIdForLearnAC } from '../../../learn/actions'
import { getCardsForLearnTC } from '../../../learn/learn-reducer'
import { selectUserId } from '../../../profile/selectors'
import { setCardsPackIdAC, setCardsPackNameAC } from '../../Cards/actions'
import { selectCardsTotalCount } from '../../Cards/selectors'
import { selectPacksName } from '../../Packs/selectors'
import { TeacherIcon } from '../icons/TeacherIcon'

import s from './ActionsCell.module.css'

type ActionsCellPropsType = {
  type: 'packs' | 'cards'
  cardsPackId: string
  packOwnerId: string
  cardId: string
  cardAnswer: string
  cardQuestion: string
}
export const ActionsCellCards: React.FC<ActionsCellPropsType> = ({
  type,
  cardsPackId,
  packOwnerId,
  cardId,
  cardQuestion,
  cardAnswer,
}) => {
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const packName = useAppSelector(selectPacksName)
  const cardsCount = useAppSelector(selectCardsTotalCount)
  const navigate = useNavigate()
  const isAppMakeRequest = useAppSelector(selectIsAppMakeRequest)

  const handleLinkToCards = () => {
    dispatch(setCardsPackNameAC(packName as string))
    navigate(PATH.learn)
    /*dispatch(setCardsPackIdAC(cardsPackId as string))*/
    dispatch(setCardsPackIdForLearnAC(cardsPackId as string))
    dispatch(getCardsForLearnTC())
  }
  const btnLearnClassName = cardsCount === 0 ? s.buttonLearn : ''

  return (
    <div className={s.cell}>
      <button
        className={btnLearnClassName}
        onClick={handleLinkToCards}
        disabled={isAppMakeRequest || cardsCount === 0}
      >
        <TeacherIcon />
      </button>
      {type === 'cards' && packOwnerId === userId && (
        <div>
          <AddEditCardModal
            cardAnswer={cardAnswer}
            cardQuestion={cardQuestion}
            cardsPackId={cardsPackId}
            cardId={cardId}
            type={'editCard'}
            titleButton={'EditCard'}
            title={'Edit card'}
          />
          <DeletePackAndCard cardQuestion={cardQuestion} type={'deleteCard'} cardId={cardId} />
        </div>
      )}
    </div>
  )
}
