import React, { ChangeEvent } from 'react'

import { Pagination } from '@mui/material'

import SuperSelect from '../SuperSelect/SuperSelect'

import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'hw15',
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

  const onChangeCallback = (event: any, page: number) => {
    onChange(page, itemsCountForPage)

    // пишет студент
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    // пишет студент
    onChange(1, +event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={{
          minWidth: '200px', // стили для Pagination // пишет студент
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        shape="rounded"
        color="primary"
        size={'small'}
        hideNextButton
        hidePrevButton
      />

      <span className={s.text1}>показать</span>

      <SuperSelect
        id={id + '-pagination-select'}
        style={{ width: 'min-content' }}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 7, value: 7 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
