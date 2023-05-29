import React, { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import { SuperDebouncedInput } from '../../../../common/components/SuperDebouncedInput/SuperDebouncedInput'
import { setCardsSearchByQuestionAC } from '../actions'

import iconClose from './../../../images/close.png'
import s from './SearchQuestion.module.css'

export const SearchQuestion = () => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const handleSearchQuestion = (value: string) => {
    if (value !== '') {
      setSearchParams({ ...params, question: value })
    } else if (value === '') {
      searchParams.delete('question')
      setSearchParams({ ...Object.fromEntries(searchParams) })
    }
    dispatch(setCardsSearchByQuestionAC(value))
  }
  const handleOnChangeText = (value: string) => {
    setValue(value)
  }

  return (
    <div className={s.searchQuestionBlock}>
      <SuperDebouncedInput
        value={value}
        onChangeText={handleOnChangeText}
        onDebouncedChange={handleSearchQuestion}
        placeholder={'Provide your text'}
      />
      <div className={s.iconsFilter}>
        <img src={iconClose} alt={iconClose} className={s.iconClose} />
      </div>
    </div>
  )
}
