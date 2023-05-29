import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppInfoAC } from '../../../app/actions'
import { selectAppInfo } from '../../../app/selectors'
import { useAppDispatch, useAppSelector } from '../../../app/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const InfoSnackbar = () => {
  const dispatch = useAppDispatch()
  const appInfo = useAppSelector(selectAppInfo)

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    if (appInfo !== null) {
      dispatch(setAppInfoAC(null))
    }
  }

  return (
    <Snackbar open={appInfo !== null} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={'info'} sx={{ width: '100%' }}>
        {appInfo}
      </Alert>
    </Snackbar>
  )
}
