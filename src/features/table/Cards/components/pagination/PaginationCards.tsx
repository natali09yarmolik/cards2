import React from 'react'

import { FormControl, MenuItem, Select } from '@material-ui/core'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { useStyles } from '../../../../styleMU/styleMU'
import { setCardsPageAC, setCardsPageCountAC } from '../../actions'
import { selectCardsPage, selectCardsPageCount, selectCardsTotalCount } from '../../selectors'

import s from './PaginationCards.module.css'

export const PaginationCards = () => {
  const dispatch = useAppDispatch()
  const styleMU = useStyles()
  const totalCount = useAppSelector(selectCardsTotalCount)
  const pageNumber = useAppSelector(selectCardsPage)
  const pageCount = useAppSelector(selectCardsPageCount)
  const page = useAppSelector(selectCardsPage)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const countPages = Math.ceil(totalCount / pageCount)
  const handlePageChange = (event: any, newPage: number) => {
    dispatch(setCardsPageAC(newPage))
    console.log('newPage=', newPage)
    setSearchParams({ ...params, page: newPage.toString() })
  }
  const handlePageCountChange = (event: any) => {
    dispatch(setCardsPageCountAC(+event.target.value))
    dispatch(setCardsPageAC(1))
    setSearchParams({
      ...params,
      page: '1',
      pageCount: event.target.value,
    })
  }

  return (
    <div className={s.pagination}>
      <Pagination
        count={countPages}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        showFirstButton
        showLastButton
      />
      Show
      <FormControl variant="outlined" size={'small'}>
        <Select value={'' + pageCount} onChange={handlePageCountChange} className={styleMU.select}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
      Cards per Page
    </div>
  )
}
