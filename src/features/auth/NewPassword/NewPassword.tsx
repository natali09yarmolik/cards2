import React, { useState, MouseEvent } from 'react'

import Button from '@material-ui/core/Button'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { FormikHelpers, useFormik } from 'formik'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/utils/routes/Routes'
import { resetPasswordTC } from '../auth-reducer'
import { selectIsPasswordChanged } from '../selectors'

import s from './NewPassword.module.css'

type FormikValuesType = {
  password: string
}

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

const initialValues: FormikValuesType = {
  password: '',
}

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const token = location.pathname.slice(18)
  const isPasswordChanged = useAppSelector(selectIsPasswordChanged)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }

  const onSubmit = (
    values: FormikValuesType,
    { setSubmitting }: FormikHelpers<FormikValuesType>
  ) => {
    dispatch(resetPasswordTC(values.password, token))
    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  if (isPasswordChanged) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.container}>
      <h1>Create new password</h1>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          fullWidth
          variant={'standard'}
          id={'password'}
          type={showPassword ? 'text' : 'password'}
          label={'Password'}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps('password')}
          InputProps={inputProps}
        />

        <Button
          color={'primary'}
          fullWidth
          style={{ borderRadius: '20px' }}
          variant={'contained'}
          type={'submit'}
          disabled={formik.isSubmitting}
        >
          Create new password
        </Button>
      </form>
      <div className={s.questionBlock}>
        Create new password and we will send you further instructions to email
      </div>
      <div className={s.link}>
        <NavLink to={PATH.login}>Sign in</NavLink>
      </div>
    </div>
  )
}
