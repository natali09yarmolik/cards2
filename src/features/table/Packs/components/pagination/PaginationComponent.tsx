import React from 'react'

import { FormControl, MenuItem, Select } from '@material-ui/core'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { useStyles } from '../../../../styleMU/styleMU'
import { setPacksPageAC, setPacksPageCountAC } from '../../actions'
import { selectCardPacksTotalCount, selectPacksPage, selectPacksPageCount } from '../../selectors'

import s from './PaginationComponent.module.css'

export const PaginationComponent = () => {
  const dispatch = useAppDispatch()
  const styleMU = useStyles()
  const totalCount = useAppSelector(selectCardPacksTotalCount)
  const pageCount = useAppSelector(selectPacksPageCount)
  const page = useAppSelector(selectPacksPage)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const countPages = Math.ceil(totalCount / pageCount)
  const handlePageChange = (event: any, page: number) => {
    dispatch(setPacksPageAC(page))
    setSearchParams({ ...params, page: page.toString() })
  }
  const handlePageCountChange = (event: any) => {
    dispatch(setPacksPageCountAC(+event.target.value))
    dispatch(setPacksPageAC(1))
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
