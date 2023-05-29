import React from 'react'

import { Title } from '../Title/Title'

import s from './ErrorPage.module.css'

export const ErrorPage = () => {
  return (
    <div>
      <Title title={'Error 404. page not found'} />
      <div className={s.container}></div>
    </div>
  )
}
