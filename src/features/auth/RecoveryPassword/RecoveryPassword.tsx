import React from 'react'

import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { FormikHelpers, useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/utils/routes/Routes'
import { forgotPassTC } from '../auth-reducer'
import { CheckEmail } from '../CheckEmail/CheckEmail'
import { boxStyle } from '../Login/Login'
import { selectMailWasSent } from '../selectors'

import s from './RecoveryPassword.module.css'

type FormikValuesType = {
  email: string
}

export const RecoveryPassword = () => {
  const dispatch = useAppDispatch()

  const mailWasSent = useAppSelector(selectMailWasSent)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
    }),
    onSubmit: (values: FormikValuesType, { setSubmitting }: FormikHelpers<FormikValuesType>) => {
      dispatch(forgotPassTC(values.email))
      setSubmitting(false)
    },
  })

  return (
    <Box sx={boxStyle}>
      <Paper>
        {mailWasSent ? (
          <CheckEmail />
        ) : (
          <div>
            <h1>Forgot your password?</h1>
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

                <div className={s.questionBlock}>
                  Enter your email address and we will send you further instructions
                </div>
                <Button
                  color={'primary'}
                  fullWidth
                  style={{ borderRadius: '20px' }}
                  variant={'contained'}
                  type={'submit'}
                  disabled={formik.isSubmitting}
                >
                  Send instruction
                </Button>
              </form>

              <div className={s.questionBlock}>Did you remember your password?</div>
              <div className={s.link}>
                <NavLink to={PATH.login}>Try logging in</NavLink>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </Box>
  )
}
