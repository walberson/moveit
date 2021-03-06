import { GetServerSideProps } from 'next'

import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import Head from 'next/head'

import styles from '../styles/pages/Dashboard.module.css'
import React, { useContext, useEffect } from 'react'
import { CompleteChallenges } from '../components/CompletedChallenges'
import { ProfileContext, ProfileProvider } from '../contexts/ProfileContext'

interface DashboardProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Dashboard(props: DashboardProps) {
  const { getUser } = useContext(ProfileContext)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Dashboard | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
