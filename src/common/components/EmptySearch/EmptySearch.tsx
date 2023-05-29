import React from 'react'

import { Paper } from '@mui/material'

import st from '../../../features/auth/Login/Login.module.css'

import s from './EmptySearch.module.css'
import picture from './nothing-found.png'

export const EmptySearch = () => {
  return (
    <Paper className={s.container}>
      <div>
        <Paper />
        <h1>Nothing found</h1>
        <img className={s.picture} src={picture} alt={'logo'} />
        <div className={st.questionBlock}>Change your search parameters and try again</div>
      </div>
    </Paper>
  )
}
