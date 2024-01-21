import { jwtDecode } from 'jwt-decode'

interface Token {
  user_id: 1
  name: string
  email: string
  username: string
  exp: number
}

export const getUsernameFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.username
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}
