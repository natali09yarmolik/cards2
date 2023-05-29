import React from 'react'

import { useAppSelector } from '../../../app/store'
import editIcon from '../../../common/components/SuperEditableSpan/editIcon.svg'
import s from '../Profile.module.css'
import { selectName } from '../selectors'

type ProfileNameBlockType = {
  setEditMode: (editMode: boolean) => void
}

export const ProfileNameBlock = (props: ProfileNameBlockType) => {
  const name = useAppSelector(selectName)

  const handleEditName = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    props.setEditMode(true)
  }

  return (
    <div className={s.spanBlock}>
      <div>{name}</div>
      <img onClick={handleEditName} src={editIcon} className={s.pen} alt={'edit'} />
    </div>
  )
}
