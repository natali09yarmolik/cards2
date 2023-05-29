import * as React from 'react'

import { TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { PATH } from '../../../../common/utils/routes/Routes'
import { setCardsPackNameAC, setCardsPackUserIdAC, setCardsPageAC } from '../../Cards/actions'
import { ActionsCell } from '../../common/ActionsCell/ActionsCell'
import { SortCell } from '../../common/SortCell/SortCell'
import { StyledTableCell, StyledTableRow } from '../../common/styles'
import { TableTextCell } from '../../common/TableTextCell/TableTextCell'
import { setPacksSortAC } from '../actions'
import { selectCardPacks, selectPacksSort } from '../selectors'

import s from './PacksTable.module.css'

export const PacksTable = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(selectCardPacks)
  const sortPacks = useAppSelector(selectPacksSort)

  const handleSort = (sort: string | null) => {
    dispatch(setPacksSortAC(sort))
  }

  return (
    <div className={s.table}>
      <TableContainer component={Paper}>
        <Table aria-label="custom table" stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <SortCell
                  label={'Name'}
                  sorter={'name'}
                  sort={sortPacks}
                  packs
                  toggleSort={handleSort}
                />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell
                  label={'Cards'}
                  sorter={'cardsCount'}
                  sort={sortPacks}
                  packs
                  toggleSort={handleSort}
                />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell
                  label={'Last Updated'}
                  sorter={'updated'}
                  sort={sortPacks}
                  packs
                  toggleSort={handleSort}
                />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell
                  label={'Created by'}
                  sorter={'user_name'}
                  sort={sortPacks}
                  packs
                  toggleSort={handleSort}
                />
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {cardPacks.map((cardPack, index) => {
              const handleLinkToCards = () => {
                dispatch(setCardsPackUserIdAC(cardPack.user_id))
                dispatch(setCardsPackNameAC(cardPack.name))
                dispatch(setCardsPageAC(1))
              }

              return (
                <StyledTableRow key={cardPack._id} hover>
                  <StyledTableCell scope="row">
                    <NavLink
                      to={PATH.cards + '?cardsPack_id=' + cardPack._id}
                      onClick={handleLinkToCards}
                      className={s.link}
                    >
                      <TableTextCell text={cardPack.name} />
                    </NavLink>
                  </StyledTableCell>
                  <StyledTableCell>{cardPack.cardsCount}</StyledTableCell>
                  <StyledTableCell>{cardPack.updated}</StyledTableCell>
                  <StyledTableCell>
                    <TableTextCell text={cardPack.user_name} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ActionsCell
                      type={'packs'}
                      packOwnerId={cardPack.user_id}
                      itemId={cardPack._id}
                      cardsCount={cardPack.cardsCount}
                      packName={cardPack.name}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
