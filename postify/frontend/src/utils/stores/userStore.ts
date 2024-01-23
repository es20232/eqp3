import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
  id: number | null
  name: string
  username: string
  email: string
  phoneNumber: string
  profileImage: string
}

interface UserStoreActions extends UserState {
  setUserProps: (
    id: number | null,
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
  ) => void
  setProfileImage: (profileImage: string) => void
}

const useUserStore = create<UserStoreActions>()(
  persist(
    (set) => ({
      id: null,
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      profileImage: '',
      setUserProps: (id, name, username, email, phoneNumber) => {
        set({ id, name, username, email, phoneNumber })
      },
      setProfileImage: (profileImage) => {
        set({ profileImage })
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useUserStore
