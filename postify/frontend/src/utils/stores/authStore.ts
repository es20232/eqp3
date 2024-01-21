import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStoreState {
  isAuthenticated: boolean
  username: string | null
  accessToken: string | null
  refreshToken: string | null
}

interface AuthStoreActions extends AuthStoreState {
  login: (
    accessToken: string,
    refreshToken: string,
    username: string | null,
  ) => void
  logout: () => void
  updateTokens: (accessToken: string) => void
}

const useAuthStore = create<AuthStoreActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: '',
      accessToken: null,
      refreshToken: null,
      login: (accessToken, refreshToken, username) => {
        set({ accessToken, refreshToken, username, isAuthenticated: true })
      },
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          username: '',
          isAuthenticated: false,
        })
      },
      updateTokens: (accessToken) => {
        set({ accessToken })
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useAuthStore
