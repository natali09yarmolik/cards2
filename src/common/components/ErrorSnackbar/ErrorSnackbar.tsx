import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppErrorAC } from '../../../app/actions'
import { selectError } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    if (error !== null) {
      dispatch(setAppErrorAC(null))
    }
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={'warning'} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
