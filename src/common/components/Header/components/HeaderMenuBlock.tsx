import React from 'react'

import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { setAppErrorAC } from '../../../../app/actions'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { logoutTC } from '../../../../features/auth/auth-reducer'
import { selectIsLoggedIn } from '../../../../features/auth/selectors'
import defaultAva from '../../../../features/images/avatar.webp'
import { selectAvatar, selectName } from '../../../../features/profile/selectors'
import { PATH } from '../../../utils/routes/Routes'

import avatar from './../../../../features/images/avatar.png'
import s from './../Header.module.css'

export const HeaderMenuBlock = () => {
  const loginStatus = useAppSelector(selectIsLoggedIn)
  const userName = useAppSelector(selectName)
  const ava = useAppSelector(selectAvatar)

  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    if (!loginStatus) {
      dispatch(setAppErrorAC('You are not authorised'))
    }
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    dispatch(logoutTC())
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <span className={s.nameBlock}>{userName}</span>
      <Tooltip title={''}>
        <IconButton size={'small'} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <img className={s.avatar} alt="avatar" src={ava || defaultAva} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <NavLink style={{ color: 'black' }} to={PATH.profile}>
          <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
        </NavLink>
        <NavLink style={{ color: 'black' }} to={PATH.packs}>
          <MenuItem onClick={handleCloseUserMenu}>Packs</MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
