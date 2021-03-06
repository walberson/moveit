import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  activeChallenges: Challenge
  experienceToNextLevel: number
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface ChallengeProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)
export function ChallengesProvider({
  children,
  ...rest
}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  )
  const [activeChallenges, setActiveChallenges] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // useEffect(() => {
  //   setLevel(Number(Cookies.get('level')))
  //   setCurrentExperience(Number(Cookies.get('currentExperience')))
  //   setChallengesCompleted(Number(Cookies.get('challengesCompleted')))
  // }, [])

  useEffect(() => {
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenges(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenges(null)
  }

  function completeChallenge() {
    if (!activeChallenges) {
      return null
    }
    const { amount } = activeChallenges

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenges(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenges,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
