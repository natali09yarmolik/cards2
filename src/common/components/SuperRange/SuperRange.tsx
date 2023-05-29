import React from 'react'

import { Slider } from '@material-ui/core'

const SuperRange: React.FC<any> = props => {
  return (
    <Slider
      value={props.value}
      sx={{
        // стили для слайдера // пишет студент

        color: '#00CC22',
        height: 8,

        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid #00CC22',

          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
      }}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange
