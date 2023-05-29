import React from 'react'

import { Paper } from '@mui/material'

import st from '../../../features/auth/Login/Login.module.css'

import s from './../EmptySearch/EmptySearch.module.css'
import picture from './picture.png'

type EmptyListPropsType = {
  title: string
  description: string
}

export const EmptyList = (props: EmptyListPropsType) => {
  return (
    <Paper className={s.container}>
      <div>
        <Paper />
        <h1>Your {props.title} list is empty</h1>
        <img className={s.picture} src={picture} alt={'logo'} />
        <div className={st.questionBlock}>
          If you don't have any {props.description}, you can create a new one by clicking on the
          button 'ADD NEW {props.description}'
        </div>
      </div>
    </Paper>
  )
}
