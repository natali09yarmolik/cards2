import React from 'react'

import { CircularProgress } from '@mui/material'

export const Spinner = () => {
  return (
    <div style={{ position: 'fixed', top: '40%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>
  )
}
