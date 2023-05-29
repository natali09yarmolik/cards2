import * as React from 'react'
import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Fade, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { useStyles } from '../../../../features/styleMU/styleMU'
import { EditIcon } from '../../../../features/table/common/icons/EditIcon'
import { TrashIcon } from '../../../../features/table/common/icons/TrashIcon'

import {
  isActiveModalAC,
  modalAddCardIsOpenAC,
  modalAddPackIsOpenAC,
  modalDeleteCardIsOpenAC,
  modalDeletePackIsOpenAC,
  modalEditCardIsOpen,
  modalEditPackIsOpenAC,
  modalSetCardAnswerAC,
  modalSetCardIdAC,
  modalSetCardQuestionAC,
  modalSetPackIdAC,
  modalSetPackNameAC,
} from './actions'
import s from './MainModal.module.css'
import * as modalsSelectors from './selectors'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 280,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type MainModalPropsType = {
  type?: 'create' | 'edit' | 'createCard' | 'editCard' | 'deletePack' | 'deleteCard'
  table?: 'pack' | 'card'
  children?: ReactNode
  title?: string
  titleButton?: string
  packName?: string | undefined
  packId?: string
  cardQuestion?: string | undefined
  cardAnswer?: string
  cardId?: string
}

export const MainModal: React.FC<MainModalPropsType> = ({
  children,
  table,
  title,
  titleButton,
  type,
  packName,
  packId,
  cardQuestion,
  cardAnswer,
  cardId,
}) => {
  const addPack = useAppSelector(modalsSelectors.selectAddPackModal)
  const addCard = useAppSelector(modalsSelectors.selectAddCardModal)
  const editPack = useAppSelector(modalsSelectors.selectEditPackModal)
  const editCard = useAppSelector(modalsSelectors.selectEditCardModal)
  const deletePack = useAppSelector(modalsSelectors.selectDeletePackModal)
  const deleteCard = useAppSelector(modalsSelectors.selectDeleteCardModal)
  const cardItemId = useAppSelector(modalsSelectors.selectCardId)
  const cardPackId = useAppSelector(modalsSelectors.selectPackId)
  const dispatch = useAppDispatch()

  const handleOpen = () => {
    if (type === 'create') {
      dispatch(isActiveModalAC(true))
      dispatch(modalAddPackIsOpenAC(true))
    } else if (type === 'createCard') {
      dispatch(modalAddCardIsOpenAC(true))
    } else if (type === 'edit') {
      dispatch(modalSetPackIdAC(packId as string))
      dispatch(modalSetPackNameAC(packName as string))
      dispatch(modalEditPackIsOpenAC(true))
    } else if (type === 'editCard') {
      dispatch(modalSetCardQuestionAC(cardQuestion as string))
      dispatch(modalSetCardAnswerAC(cardAnswer as string))
      dispatch(modalSetCardIdAC(cardId as string))
      dispatch(modalEditCardIsOpen(true))
    } else if (type === 'deletePack') {
      dispatch(modalDeletePackIsOpenAC(true))
      dispatch(modalSetPackIdAC(packId as string))
    } else if (type === 'deleteCard') {
      dispatch(modalSetCardIdAC(cardId as string))
      dispatch(modalSetCardQuestionAC(cardQuestion as string))
      dispatch(modalDeleteCardIsOpenAC(true))
    }
  }
  const handleClose = () => {
    if (type === 'create') {
      dispatch(modalAddPackIsOpenAC(false))
    } else if (type === 'createCard') {
      dispatch(modalAddCardIsOpenAC(false))
    } else if (type === 'edit') {
      dispatch(modalEditPackIsOpenAC(false))
    } else if (type === 'editCard') {
      dispatch(modalEditCardIsOpen(false))
    } else if (type === 'deletePack') {
      dispatch(modalDeletePackIsOpenAC(false))
    } else if (type === 'deleteCard') {
      dispatch(modalDeleteCardIsOpenAC(false))
    }
  }
  const styleMU = useStyles()
  const packsButtons =
    type === 'create' ? (
      <Button
        disableFocusRipple={true}
        className={styleMU.button}
        onClick={handleOpen}
        variant={'contained'}
      >
        {titleButton}
      </Button>
    ) : (
      <button onClick={handleOpen}>{type === 'edit' ? <EditIcon /> : <TrashIcon />}</button>
    )
  const cardsButtons =
    type === 'createCard' ? (
      <Button className={styleMU.button} onClick={handleOpen} variant={'contained'}>
        {titleButton}
      </Button>
    ) : (
      <button onClick={handleOpen}>{type === 'editCard' ? <EditIcon /> : <TrashIcon />}</button>
    )
  let openModal =
    // eslint-disable-next-line no-nested-ternary
    type === 'create'
      ? addPack
      : // eslint-disable-next-line no-nested-ternary
      type === 'edit'
      ? editPack
      : // eslint-disable-next-line no-nested-ternary
      type === 'createCard'
      ? addCard
      : // eslint-disable-next-line no-nested-ternary
      type === 'editCard'
      ? editCard
      : type === 'deletePack'
      ? deletePack
      : deleteCard

  if (type === 'deletePack') {
    openModal = deletePack && packId === cardPackId
  }
  if (type === 'deleteCard') {
    openModal = deleteCard && cardId === cardItemId
  }
  if (type === 'editCard') {
    openModal = editCard && cardId === cardItemId
  }
  if (type === 'edit') {
    openModal = editPack && packId === cardPackId
  }

  return (
    <div>
      {table === 'pack' ? packsButtons : cardsButtons}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div className={s.headerBlock}>
              <h3>{title}</h3>
              <IconButton size={'small'} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <hr style={{ opacity: '0.5' }} />
            <div>{children}</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
