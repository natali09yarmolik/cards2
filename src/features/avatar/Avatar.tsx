import React, { ChangeEvent, useState } from 'react'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { IconButton } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { convertFileToBase64 } from '../../common/utils/converFile'
import defaultAva from '../images/avatar.webp'
import { changeAvaTC } from '../profile/profile-reducer'
import { selectAvatar, selectName } from '../profile/selectors'

import s from './Avatar.module.css'

export const Avatar = () => {
  const dispatch = useAppDispatch()
  const ava = useAppSelector(selectAvatar)
  const name = useAppSelector(selectName)
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(changeAvaTC(name, file64))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  return (
    <div className={s.avatar}>
      <img src={ava || defaultAva} className={s.avatarPic} alt="ava" onError={errorHandler} />
      <label className={s.iconAddPhoto}>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <AddAPhotoIcon />
        </IconButton>
      </label>
    </div>
  )
}
