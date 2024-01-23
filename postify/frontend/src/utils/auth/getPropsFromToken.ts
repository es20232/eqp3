import { jwtDecode } from 'jwt-decode'

interface Token {
  user_id: number
  name: string
  email: string
  username: string
  phone_number: string
  profile_image: string
  exp: number
}

const getIdFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.user_id
  } catch (error) {
    console.log('Invalid Token')
    return null
  }
}

const getUsernameFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.username
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}

const getNameFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.name
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}

const getEmailFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.email
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}

const getPhoneNumberFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.phone_number
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}

const getProfileImageFromToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token)
    return decodedToken.profile_image
  } catch (error) {
    console.log('Invalid Token')
    return ''
  }
}

export {
  getEmailFromToken,
  getIdFromToken,
  getNameFromToken,
  getPhoneNumberFromToken,
  getProfileImageFromToken,
  getUsernameFromToken
}

