import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useState,
} from 'react'

import eyeIcon from './eye.png'
import s from './SuperInput.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
// type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
type SuperInputPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  withEye?: boolean
}

const SuperInput: React.FC<SuperInputPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  id,
  withEye,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)

    onChangeText?.(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)

    onEnter && // если есть пропс onEnter
      e.key === 'Enter' && // и если нажата кнопка Enter
      onEnter() // то вызвать его
  }
  const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')
  const finalInputClassName = s.inputWrapper + (error ? ' ' + s.error : '')

  return (
    <div className={finalInputClassName}>
      <div className={s.wrapper}>
        <input
          id={id}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          type={withEye && !showPassword ? 'password' : 'text'}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />

        {withEye && (
          <div className={s.buttonContainer}>
            {showPassword && <div className={s.line} />}
            <button onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              <img src={eyeIcon} alt={'show password'} />
            </button>
          </div>
        )}
      </div>
      <span id={id ? id + '-span' : undefined} className={finalSpanClassName}>
        {error}
      </span>
    </div>
  )
}

export default SuperInput

type ModifierPropsType = {
  setShowPassword: (cb: (showPassword: boolean) => boolean) => void
  // onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void
  showPassword: boolean
}
const Modifier: React.FC<ModifierPropsType> = ({ setShowPassword, showPassword }) => {
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleClickShowPassword = () => setShowPassword((showPassword: boolean) => !showPassword)

  return (
    <div className={s.buttonContainer}>
      {showPassword && <div className={s.line} />}
      <button onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
        <img src={eyeIcon} alt={'show password'} />
      </button>
    </div>
  )
}
