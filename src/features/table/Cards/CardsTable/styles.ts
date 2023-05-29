import { styled } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&:nth-of-type(1)': {
    width: '30%',
    maxWidth: '200px',
  },
  '&:nth-of-type(2)': {
    width: '40%',
    minWidth: '45px',
  },
  '&:nth-of-type(3)': {
    width: '10%',
    minWidth: '85px',
  },
  '&:nth-of-type(4)': {
    width: '10%',
    minWidth: '75px',
  },
  '&:nth-of-type(5)': {
    width: '10%',
    minWidth: '72px',
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EFEFEF',
    // color: theme.palette.common.white,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '17px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  maxWidth: '1008px',
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
