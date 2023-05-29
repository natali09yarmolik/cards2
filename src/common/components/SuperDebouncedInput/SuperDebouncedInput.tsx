import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState } from 'react'

import SuperInput from '../SuperInput/SuperInput'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
} & {
  onDebouncedChange?: (value: string) => void
}

export const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  ...restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const handleOnChangeText = (value: string) => {
    onChangeText?.(value)
    if (onDebouncedChange) {
      clearTimeout(timerId)
      setTimerId(
        +setTimeout(() => {
          onDebouncedChange(value)
        }, 1500)
      )
    }
  }

  return <SuperInput onChangeText={handleOnChangeText} {...restProps} />
}
