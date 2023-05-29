import React from 'react'

import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../utils/routes/Routes'

export const HeaderButtonBlock = () => {
  return (
    <div>
      <NavLink to={PATH.login}>
        <Button color={'primary'} style={{ borderRadius: '20px' }} variant={'contained'}>
          Sign in
        </Button>
      </NavLink>
    </div>
  )
}
