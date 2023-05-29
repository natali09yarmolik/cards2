export const setLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'AUTH/SET_IS_LOGGED_IN', isLoggedIn } as const)
export const setIsSignedUpAC = (isSignedUp: boolean) =>
  ({ type: 'AUTH/SET_IS_SIGNED_UP', isSignedUp } as const)
export const setMailWasSentAC = (mailWasSent: boolean) =>
  ({ type: 'AUTH/SET_MAIL_WAS_SENT', mailWasSent } as const)
export const setIsPasswordChangedAC = (isPasswordChanged: boolean) =>
  ({
    type: 'AUTH/SET_IS_PASSWORD_CHANGED',
    isPasswordChanged,
  } as const)
