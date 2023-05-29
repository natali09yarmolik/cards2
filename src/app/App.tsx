import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { SimpleBackdrop } from '../common/components/Backdrop/Backdrop'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '../common/components/Header/Header'
import { InfoSnackbar } from '../common/components/InfoSnackbar/InfoSnackbar'
import { Spinner } from '../common/components/Spinner'

import { setAppIsLoadingAC } from './actions'
import { initializeAppTC } from './app-reducer'
import s from './App.module.css'
import { selectIsAppInitialized, selectIsAppMakeRequest } from './selectors'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const isLoading = useAppSelector(selectIsAppMakeRequest)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppIsLoadingAC(true))
    dispatch(initializeAppTC())
  }, [])

  if (!isAppInitialized) {
    return <SimpleBackdrop />
  }

  return (
    <div className={s.App}>
      <Header />
      <SimpleBackdrop />
      {!isLoading && <ErrorSnackbar />}
      {!isLoading && <InfoSnackbar />}
      <div className={s.appWrapper}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
