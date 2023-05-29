import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { modalReducer } from '../common/components/modals/Modal/modal-reducer'
import { authReducer } from '../features/auth/auth-reducer'
import { learnReducer } from '../features/learn/learn-reducer'
import { profileReducer } from '../features/profile/profile-reducer'
import { cardsReducer } from '../features/table/Cards/cards-reducer'
import { packsReducer } from '../features/table/Packs/packs-reducer'

import { appReducer } from './app-reducer'
import { AppThunkDispatch } from './types'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  app: appReducer,
  packs: packsReducer,
  cards: cardsReducer,
  modals: modalReducer,
  learn: learnReducer,
})
//localstorage
// const saveToLocalStorage = (state: AppRootStateType) => {
//     try {
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('persistedState', serializedState)
//     } catch (err: any) {
//         console.warn(err)
//     }
// }
// const loadFromLocalStorage = () => {
//     try {
//         const serialisedState = localStorage.getItem('persistedState')
//         if (serialisedState === null) {
//             return undefined
//         }
//         return JSON.parse(serialisedState)
//     } catch (err: any) {
//         console.warn(err)
//         return undefined
//     }
// }

const middlewareEnhancer = applyMiddleware<AppThunkDispatch, AppRootStateType>(thunk)
//enchancers это функции,которые пмогут добавлять нашему стору различные улучшения, например,
//мидлвар санок. Все эти улучшение можно объеденить специальной функцией, которая добавляет возможность
// пользоваться reactDevTools - очень полезное расширение для хрома.
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = legacy_createStore(rootReducer, composedEnhancers)
// store.subscribe(() => saveToLocalStorage(store.getState()))
export type AppRootStateType = ReturnType<typeof rootReducer>

//хуки тоже можно вынести в отдельный файл
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
