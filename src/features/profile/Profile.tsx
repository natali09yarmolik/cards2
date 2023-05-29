import React, { useState } from 'react'

import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { LinkToBack } from '../../common/components/LinkToBack/LinkToBack'
import { PATH } from '../../common/utils/routes/Routes'
import { logoutTC } from '../auth/auth-reducer'
import { Avatar } from '../avatar/Avatar'
import { useStyles } from '../styleMU/styleMU'

import avatar from './../images/avatar.webp'
import { ProfileEditNameBlock } from './components/ProfileEditNameBlock'
import { ProfileNameBlock } from './components/ProfileNameBlock'
import s from './Profile.module.css'
import { selectEmail, selectIsLoggedIn } from './selectors'

export const Profile = () => {
  const [editMode, setEditMode] = useState(false)
  const email = useAppSelector(selectEmail)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const styleMU = useStyles()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div className={s.profile}>
      <div className={s.container}>
        <div className={s.link}>
          <LinkToBack linkPage={PATH.packs} title={'Back to Packs List'} />
        </div>
        <div className={s.informBlock}>
          <h3>Personal Information</h3>

          <div className={s.avatar}>
            {/*<img src={avatar} alt={'avatar'} className={s.avatarPic} />*/}
            <Avatar />
          </div>
          {editMode ? (
            <ProfileEditNameBlock setEditMode={setEditMode} />
          ) : (
            <ProfileNameBlock setEditMode={setEditMode} />
          )}
          <span>{email}</span>
          <Button variant={'contained'} onClick={handleLogout} className={styleMU.button}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
