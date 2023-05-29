import * as React from 'react'

import s from './TableTextCell.module.css'

type TableTextCellPropsType = {
  text: string
}
export const TableTextCell: React.FC<TableTextCellPropsType> = ({ text }) => {
  // const textStyle = {
  //     display: '-webkit-box',
  //     WebkitLineClamp: '3',
  //     webkitBoxOrient: 'vertical',
  //     overflow: 'hidden',
  // }

  return <p className={s.name}>{text}</p>
}
