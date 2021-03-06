import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { api } from '../service/api'

export const ProfileContext = createContext({} as ProfileContextData)

interface ProfileProviderProps {
  children: ReactNode
}

interface ProfileContextData {
  user: UserProps
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  getUser: () => void
}

interface UserProps {
  login: string
  avatar_url: string
  name: string
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [user, setUser] = useState({} as UserProps)
  const [username, setUsername] = useState('')

  async function getUser() {
    const response = await api.get(`/users/${username}`)
    setUser(response.data)
  }
  return (
    <ProfileContext.Provider value={{ user, username, setUsername, getUser }}>
      {children}
    </ProfileContext.Provider>
  )
}
