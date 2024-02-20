import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStoreState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
}

interface AuthStoreActions extends AuthStoreState {
  login: (accessToken: string, refreshToken: string) => void
  updateTokens: (accessToken: string) => Promise<void>
}

const useAuthStore = create<AuthStoreActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      login: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true })
      },
      updateTokens: async (accessToken) => {
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
