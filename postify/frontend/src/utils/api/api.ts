import axios from 'axios'
import { useEffect } from 'react'
import { tokenIsValid } from '../auth/tokenIsValid'
import useAuthStore from '../stores/authStore'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

const ApiConfig = () => {
  const { accessToken, refreshToken, logout, updateTokens } = useAuthStore()

  const refreshAccessToken = async () => {
    await api
      .post('/api/v1/refresh', {
        refresh: refreshToken,
      })
      .then((response) => {
        if (response.status === 200) {
          updateTokens(response.data.access)
        } else {
          logout()
        }
      })
      .catch((e) => {
        console.log(e)
        logout()
      })
  }

  useEffect(() => {
    if (accessToken) {
      if (tokenIsValid(accessToken)) {
        api.interceptors.request.use(
          async (config) => {
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
        refreshAccessToken()
      }
    }
  }, [accessToken, logout, refreshToken, updateTokens])

  return null
}

export { ApiConfig, api }
