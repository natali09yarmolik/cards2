import React from 'react'

import { NavLink } from 'react-router-dom'

import useOutsideClickListener from '../../hooks/useOutsideClickListener'
import { PATH } from '../../utils/routes/Routes'

import s from './NavbarTemperary.module.css'

export const NavbarTemperary = () => {
  const navItems = [
    { title: 'Login', link: PATH.login },
    { title: 'signUp', link: PATH.signUp },
    { title: 'Profile', link: PATH.profile },
    { title: 'passwordRecovery', link: PATH.passwordRecovery },
    { title: 'newPassword', link: PATH.newPassword },
  ]
  const { ref, isShow, setIsShow } = useOutsideClickListener(false)
  const onClickHandler = () => {
    setIsShow(!isShow)
  }

  const mappedItems = navItems.map((m, index) => {
    return (
      <li key={index}>
        <NavLink
          id={m.title}
          to={m.link}
          className={({ isActive }) => (isActive ? s.activeStyle : undefined)}
        >
          <span> {m.title}</span>
        </NavLink>
      </li>
    )
  })

  const navBarClassName = isShow ? s.cdStretchyNav + ' ' + s.navIsVisible : s.cdStretchyNav

  return (
    <div className={navBarClassName}>
      <a id={'menu'} className={s.cdNavTrigger} onClick={onClickHandler} ref={ref}>
        <span aria-hidden> </span>
      </a>
      <ul id={s.nav}>{mappedItems}</ul>
      <span aria-hidden className={s.stretchyNavBg}>
        {' '}
      </span>
    </div>
  )
}
