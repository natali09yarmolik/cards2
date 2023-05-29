import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { setPackNameAC } from '../../actions'
import { selectPacksName } from '../../selectors'

import s from './SearchTitlePacks.module.css'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperDebouncedInput } from 'common/components/SuperDebouncedInput/SuperDebouncedInput'

export const SearchTitleCards = () => {
  const packName = useAppSelector(selectPacksName) as string
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const handleOnChangeText = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    setValue(packName as string)
  }, [packName])
  const handleSendQuery = (value: string) => {
    if (value !== '') {
      setSearchParams({ ...params, packName: value })
    } else if (value === '') {
      searchParams.delete('packName')
      setSearchParams({ ...Object.fromEntries(searchParams) })
    }
    dispatch(setPackNameAC(value))
  }

  return (
    <div className={s.search}>
      <div className={s.searchTitle}>Search by name pack</div>
      <SuperDebouncedInput
        value={value}
        onChangeText={handleOnChangeText}
        onDebouncedChange={handleSendQuery}
        placeholder={'Provide your text'}
      />
    </div>
  )
}
