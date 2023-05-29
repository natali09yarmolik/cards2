import { createHashRouter } from 'react-router-dom'

import App from '../../../app/App'
import { Login } from '../../../features/auth/Login/Login'
import { NewPassword } from '../../../features/auth/NewPassword/NewPassword'
import { RecoveryPassword } from '../../../features/auth/RecoveryPassword/RecoveryPassword'
import { SignUp } from '../../../features/auth/SignUp/SignUp'
import { Learn } from '../../../features/learn/Learn'
import { Profile } from '../../../features/profile/Profile'
import { Cards } from '../../../features/table/Cards/Cards'
import { Packs } from '../../../features/table/Packs/Packs'
import { ErrorPage } from '../../components/ErrorPage/ErrorPage'
import { Test } from '../../components/Test/Test'

export const PATH = {
  login: '/login',
  signUp: '/sign-up',
  profile: '/profile',
  pageNotFound: '/404',
  passwordRecovery: '/password-recovery',
  newPassword: '/set-new-password/:token',
  test: '/test',
  packs: '/packs',
  cards: '/cards',
  learn: '/learn',
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Packs /> },

          {
            path: PATH.login,
            element: <Login />,
          },
          {
            path: PATH.signUp,
            element: <SignUp />,
          },
          {
            path: PATH.profile,
            element: <Profile />,
          },
          {
            path: PATH.passwordRecovery,
            element: <RecoveryPassword />,
          },
          {
            path: PATH.newPassword,
            element: <NewPassword />,
          },
          {
            path: PATH.test,
            element: <Test />,
          },
          {
            path: PATH.packs,
            element: <Packs />,
          },
          {
            path: PATH.cards,
            element: <Cards />,
          },
          {
            path: PATH.learn,
            element: <Learn />,
          },
        ],
      },
    ],
  },
])

export default router
