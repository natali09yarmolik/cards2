import { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import { useSearchParams } from 'react-router-dom'

import useDebounce from '../../../../../common/hooks/useDebounce'
import { selectUserId } from '../../../../profile/selectors'
import { useStyles } from '../../../../styleMU/styleMU'
import { setMinMaxCardsAC } from '../../actions'
import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksMaxCards,
  selectPacksMinCards,
} from '../../selectors'

import s from './FilterCountCards.module.css'

import { useAppDispatch, useAppSelector } from 'app/store'

export const FilterCountCards = () => {
  const styleMU = useStyles()
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCards = useAppSelector(selectPacksMinCards)
  const maxCards = useAppSelector(selectPacksMaxCards)
  const [value, setValue] = useState<number | number[]>([0, 0])
  const debouncedValue = useDebounce<number | number[]>(value, 500)
  const [isRangeTouched, setIsRangeTouched] = useState(false)
  const myID = useAppSelector(selectUserId)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChangeCountCards = (event: any, newValue: number | number[]) => {
    const counts = newValue as number[]
    const min = counts[0]
    const max = counts[1]

    dispatch(setMinMaxCardsAC(min, max))
    if (min === 0) {
      searchParams.delete('min')
    } else {
      searchParams.append('min', min.toString())
    }
    if (max === maxCardsCount) {
      searchParams.delete('max')
    } else {
      searchParams.append('max', max.toString())
    }
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })
  }

  useEffect(() => {
    if (myID) {
      setIsRangeTouched(false)
    }
    if (isRangeTouched) {
      handleChangeCountCards(null, debouncedValue)
    }
    // setValue(debouncedValue)
  }, [debouncedValue, myID])
  useEffect(() => {
    //when max value from server got set to range
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])
  useEffect(() => {
    //when click clear filters reset range
    if (minCards === minCardsCount && maxCards === maxCardsCount) {
      setValue([minCards, maxCards])
    }
  }, [maxCards])
  const handleChange = (event: any, newValue: number | number[], activeThumb: number) => {
    if (activeThumb >= 0) {
      setIsRangeTouched(true)
    }
    setValue(newValue as number[])
  }
  const handleMaxValue = maxCards === 0 ? maxCardsCount : maxCards
  const minValue = searchParams.get('min')
  const maxValue = searchParams.get('max')
  const sliderMinValue = minValue === null ? minCardsCount : +minValue
  const sliderMaxValue = maxValue === null ? maxCardsCount : +maxValue

  return (
    <div className={s.wrapper}>
      <div>Number of cards</div>
      <div className={s.sliderBlock}>
        <span>{minCards}</span>
        <Slider
          getAriaLabel={() => 'Count of cards'}
          value={[sliderMinValue, sliderMaxValue]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={1}
          min={minCardsCount}
          max={maxCardsCount}
          className={styleMU.slider}
        />
        <span>{handleMaxValue}</span>
      </div>
    </div>
  )
}
