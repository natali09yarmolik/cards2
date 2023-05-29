import React, { useState, MouseEvent } from 'react'

import Button from '@material-ui/core/Button'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { FormikHelpers, useFormik } from 'formik'
import { NavLink, Navigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/utils/routes/Routes'
import { signUpTC } from '../auth-reducer'
import { boxStyle } from '../Login/Login'
import { selectIsSignedUp } from '../selectors'

import s from './SignUp.module.css'

type FormikValuesType = {
  email: string
  password: string
  confirmPassword: string
}

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isSignedUp = useAppSelector(selectIsSignedUp)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
      confirmPassword: yup
        .string()
        .required('You should confirm your password')
        .oneOf([yup.ref('password' /*null*/)], 'Passwords must match'),
    }),
    onSubmit: (values: FormikValuesType, { setSubmitting }: FormikHelpers<FormikValuesType>) => {
      dispatch(signUpTC(values.email, values.password))
      setSubmitting(false)
    },
  })

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

  if (isSignedUp) {
    return <Navigate to={PATH.login} />
  }

  return (
    <Box sx={boxStyle}>
      <Paper>
        <div>
          <h1>Sign up</h1>
          <div className={s.loginWrapper}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
              <TextField
                fullWidth
                variant={'standard'}
                id={'email'}
                label={'Email'}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                {...formik.getFieldProps('email')}
              />

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
              <TextField
                fullWidth
                variant={'standard'}
                id={'password'}
                type={showPassword ? 'text' : 'password'}
                label={'Password'}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                {...formik.getFieldProps('confirmPassword')}
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
                Sign up
              </Button>
            </form>
            <div className={s.questionBlock}>Already have an account?</div>
            <div className={s.link}>
              <NavLink to={PATH.login}>Sign in</NavLink>
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  )
}
