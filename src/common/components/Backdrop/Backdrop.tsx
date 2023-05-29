import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

import { selectIsAppMakeRequest } from '../../../app/selectors'
import { useAppSelector } from '../../../app/store'

export const SimpleBackdrop = () => {
  const isLoading = useAppSelector(selectIsAppMakeRequest)

  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color={'inherit'} />
      </Backdrop>
    </div>
  )
}
