import axios from 'configs/axios'
import { isValidToken } from 'utils'
import { EnumAuth } from 'contexts/auth/authReducer'

export const setSession = (token: any) => {
  if (token) {
    localStorage.setItem('x-access-token', token)
  } else {
    localStorage.removeItem('x-access-token')
  }
}

export const getProfile = async (dispatch: any) => {
  const token = localStorage.getItem('x-access-token')
  if (!isValidToken(token))
    return dispatch({
      type: EnumAuth.INIT,
      payload: { isAuthenticated: false, user: null },
    })

  try {
    setSession(token)
    const response = await axios({ method: 'GET', url: '/user/profile' })

    dispatch({
      type: EnumAuth.INIT,
      payload: { isAuthenticated: true, user: response.data.user },
    })
  } catch (err) {
    dispatch({
      type: EnumAuth.INIT,
      payload: { isAuthenticated: false, user: null },
    })
  }
}
