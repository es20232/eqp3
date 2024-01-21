import axios from 'axios'
import { useEffect } from 'react'
import { tokenIsValid } from '../auth/tokenIsValid'
import useAuthStore from '../stores/authStore'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

const ApiConfig = () => {
  const { accessToken, logout } = useAuthStore()

  useEffect(() => {
    if (tokenIsValid(accessToken)) {
      api.interceptors.request.use(
        (config) => {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    } else {
      logout()
    }
  }, [accessToken, logout])

  return null
}

export { ApiConfig, api }
