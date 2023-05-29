import React from 'react'

import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { setAppIsLoadingAC } from '../../../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../../../app/store'
import { addPackTC, updatePackTC } from '../../../../../../features/table/Packs/packs-reducer'
import { ImageInput } from '../../../../ImageInput/ImageInput'
import { modalAddPackIsOpenAC, modalEditPackIsOpenAC } from '../../actions'
import { MainModal } from '../../MainModal'

import * as modalsSelectors from './../../selectors'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  // private: yup.string(),
})

type AddEditPackModalType = {
  type: 'create' | 'edit'
  title?: string
  titleButton?: string
  packId?: string
  packName?: string
}

export const AddEditPackModal: React.FC<AddEditPackModalType> = ({
  type,
  titleButton,
  title,
  packId,
  packName,
}) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: type === 'edit' ? packName : '',
      private: false,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      {
        type === 'create'
          ? dispatch(addPackTC({ cardsPack: values }))
          : dispatch(updatePackTC({ cardsPack: { _id: packId, ...values } }))
      }
      dispatch(modalAddPackIsOpenAC(false))
      dispatch(modalEditPackIsOpenAC(false))
      dispatch(setAppIsLoadingAC(true))
      formik.resetForm()
    },
  })

  return (
    <MainModal
      title={type === 'create' ? 'Add new pack' : 'Edit pack'}
      titleButton={type === 'create' ? 'Add new pack' : 'Edit pack'}
      type={type === 'create' ? 'create' : 'edit'}
      table={'pack'}
      packName={packName}
      packId={packId}
    >
      <form onSubmit={formik.handleSubmit}>
        <ImageInput />
        <TextField
          fullWidth
          autoFocus={true}
          style={{ marginTop: '10px' }}
          variant={'standard'}
          id={'name'}
          name={'name'}
          label={'Name pack'}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <div>
          <FormControlLabel
            style={{ marginTop: '10px' }}
            control={
              <Checkbox
                id={'private'}
                name={'private'}
                onChange={formik.handleChange}
                color={'primary'}
              />
            }
            label={'Private pack'}
          />
        </div>
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
          {type === 'create' ? 'Add' : 'Save'}
        </Button>
      </form>
    </MainModal>
  )
}
