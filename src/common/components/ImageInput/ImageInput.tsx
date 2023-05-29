import React, { ChangeEvent } from 'react'

import { Button } from '@mui/material'

export const ImageInput = () => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)
    }
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <Button variant="contained" component="span">
        Upload button
      </Button>
    </label>
  )
}
