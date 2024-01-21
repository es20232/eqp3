import { jwtDecode } from 'jwt-decode'

interface Token {
  user_id: 1
  name: string
  email: string
  username: string
  exp: number
}

export const tokenIsValid = (token: string | null) => {
  try {
    if (token == null) {
      return false
    }

    const decodedToken: Token = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decodedToken.exp < currentTime) {
      return false
    }

    return true
  } catch (error) {
    console.log('Invalid Token')
  }
}
