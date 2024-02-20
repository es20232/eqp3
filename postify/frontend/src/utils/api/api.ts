import axios from 'axios'
import useAuthStore from '../stores/authStore'
import useUserStore from '../stores/userStore'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken

    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { accessToken, refreshToken, updateTokens } = useAuthStore.getState()
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      accessToken != null &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const response = await api.post('/api/v1/refresh', {
          refresh: refreshToken,
        })

        if (response.status === 200) {
          updateTokens(response.data.access)
          return api(originalRequest)
        } else {
          useAuthStore.persist.clearStorage()
          useUserStore.persist.clearStorage()
          return Promise.reject(error)
        }
      } catch (error) {
        useAuthStore.persist.clearStorage()
        useUserStore.persist.clearStorage()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export { api }
