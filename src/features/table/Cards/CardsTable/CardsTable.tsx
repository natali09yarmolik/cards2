import * as React from 'react'

import { TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { selectUserId } from '../../../profile/selectors'
import { ActionsCellCards } from '../../common/ActionsCell/ActionsCellCards'
import { SortCell } from '../../common/SortCell/SortCell'
import { TableTextCell } from '../../common/TableTextCell/TableTextCell'
import { setCardsSortAC } from '../actions'
import { selectCards, selectCardsSort, selectPackUserId } from '../selectors'

import { Grade } from './Grade/Grade'
import { StyledTableCell, StyledTableRow } from './styles'

export const CardsTable = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectCards)
  const cardsSort = useAppSelector(selectCardsSort)
  const packUserId = useAppSelector(selectPackUserId)
  const myId = useAppSelector(selectUserId)
  const owner = packUserId === myId
  const handleSort = (sort: string | null) => {
    dispatch(setCardsSortAC(sort))
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="custom table" stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <SortCell
                  label={'Question'}
                  sorter={'question'}
                  sort={cardsSort}
                  toggleSort={handleSort}
                />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Answer'} sorter={'answer'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Last Updated'} sorter={'updated'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>
                <SortCell label={'Grade'} sorter={'grade'} sort={cardsSort} />
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {cards.map((card, index) => (
              <StyledTableRow key={card._id}>
                <StyledTableCell scope="row">
                  <TableTextCell text={card.question} />
                </StyledTableCell>
                <StyledTableCell>
                  <TableTextCell text={card.answer} />
                </StyledTableCell>
                <StyledTableCell>{card.updated}</StyledTableCell>
                <StyledTableCell>
                  <Grade grade={card.grade} />
                </StyledTableCell>
                <StyledTableCell>
                  <ActionsCellCards
                    type={'cards'}
                    cardsPackId={card.cardsPack_id}
                    packOwnerId={card.user_id}
                    cardId={card._id}
                    cardAnswer={card.answer}
                    cardQuestion={card.question}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
