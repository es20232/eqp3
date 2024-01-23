import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuthStore from '../stores/authStore'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

const ApiConfig = () => {
  const { accessToken, refreshToken, logout, updateTokens } = useAuthStore()
  const [isRefreshingToken, setIsRefreshingToken] = useState(false)

  const refreshAccessToken = async () => {
    try {
      setIsRefreshingToken(true)
      const response = await api.post('/api/v1/refresh', {
        refresh: refreshToken,
      })

      if (response.status === 200) {
        updateTokens(response.data.access)
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      console.log(error)
      logout()
      return false
    } finally {
      setIsRefreshingToken(false)
    }
  }

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        if (accessToken != null) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          error.response?.status === 401 &&
          accessToken != null &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true

          if (!isRefreshingToken) {
            await refreshAccessToken()
          }

          return api(originalRequest)
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken, isRefreshingToken, logout, refreshToken, updateTokens])

  return null
}

export { ApiConfig, api }
