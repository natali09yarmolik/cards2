import React from 'react'

import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/utils/routes/Routes'

import mail from './chackEailImage.png'
import s from './CheckEmail.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()

  const handleOnClock = () => {
    navigate(PATH.login)
  }

  return (
    <div>
      <h1>Check Email</h1>
      <div className={s.loginWrapper}>
        <img src={mail} alt={'mail'} />
        <div className={s.questionBlock}>
          We’ve sent an Email with instructions to example@mail.com
        </div>
        <div className={s.link}>
          <Button
            color={'primary'}
            style={{ borderRadius: '20px' }}
            variant={'contained'}
            onClick={handleOnClock}
            fullWidth
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  )
}
