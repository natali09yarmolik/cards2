import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const ButtonClassRed = xType === 'red' ? s.red : ''
  const ButtonClassSecondary = xType === 'secondary' ? s.secondary : ''
  const PropsClassName = className ? className : ''
  const finalClassName = `${s.button} ${PropsClassName}
    ${disabled ? s.disabled : ButtonClassRed || ButtonClassSecondary || s.default}`

  // задачка на смешивание классов

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton
