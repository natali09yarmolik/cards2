import React, { useEffect } from 'react'

import { Button } from '@material-ui/core'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { setAppIsLoadingAC } from '../../../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../../../app/store'
import { addCardTC, updateCardTC } from '../../../../../../features/table/Cards/cards-reducer'
import { selectCardsPackId } from '../../../../../../features/table/Cards/selectors'
import { isActiveModalAC, modalAddCardIsOpenAC, modalEditCardIsOpen } from '../../actions'
import { MainModal } from '../../MainModal'

import s from './../../MainModal.module.css'

const validationSchema = yup.object({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
})

type AddEditCardType = {
  type: 'createCard' | 'editCard'
  title?: string
  titleButton?: string
  cardsPackId?: string | undefined
  cardAnswer?: string | undefined
  cardQuestion?: string | undefined
  cardId?: string
}

export const AddEditCardModal: React.FC<AddEditCardType> = ({
  type,
  cardAnswer,
  cardQuestion,
  cardId,
}) => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(selectCardsPackId)
  const [formatQuestion, setFormatQuestion] = React.useState('Text')

  useEffect(() => {
    dispatch(isActiveModalAC(false))
  }, [cardAnswer, cardQuestion, cardId])
  const formik = useFormik({
    initialValues: {
      question: type === 'createCard' ? '' : cardQuestion,
      answer: type === 'createCard' ? '' : cardAnswer,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      type === 'createCard'
        ? dispatch(addCardTC({ card: { cardsPack_id: packId, ...values } }))
        : dispatch(updateCardTC({ card: { _id: cardId, ...values } }))
      formik.resetForm()
      dispatch(modalAddCardIsOpenAC(false))
      dispatch(modalEditCardIsOpen(false))
      dispatch(setAppIsLoadingAC(true))
    },
  })
  const handleQuestionChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setFormatQuestion(event.target.value as string)
  }

  return (
    <MainModal
      title={type === 'createCard' ? 'Create new card' : 'Edit card'}
      titleButton={'Add new card'}
      type={type === 'createCard' ? 'createCard' : 'editCard'}
      cardId={cardId}
      cardQuestion={cardQuestion}
      cardAnswer={cardAnswer}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={s.addEditForm}>
          <p>Choose a question format</p>
          <Select
            style={{ margin: '10px', backgroundColor: 'white' }}
            id="select"
            value={formatQuestion}
            onChange={handleQuestionChange}
            variant={'outlined'}
          >
            <MenuItem style={{ position: 'initial' }} value={'Text'}>
              Text
            </MenuItem>
            <MenuItem style={{ position: 'initial' }} value={'Image'}>
              Image
            </MenuItem>
          </Select>
        </div>

        <TextField
          fullWidth
          variant={'standard'}
          id={'question'}
          name={'question'}
          label={'Question'}
          value={formik.values.question}
          onChange={formik.handleChange}
          error={formik.touched.question && Boolean(formik.errors.question)}
          helperText={formik.touched.question && formik.errors.question}
        />

        <TextField
          fullWidth
          variant={'standard'}
          id={'answer'}
          name={'answer'}
          label={'Answer'}
          value={formik.values.answer}
          onChange={formik.handleChange}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
        />
        <Button
          color={'primary'}
          fullWidth
          style={{
            marginTop: '20px',
            borderRadius: '20px',
          }}
          variant={'contained'}
          type={'submit'}
        >
          {type === 'createCard' ? 'Add' : 'Save'}
        </Button>
      </form>
    </MainModal>
  )
}
