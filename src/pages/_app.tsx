import React from 'react'
import '../styles/global.css'
import { ProfileContext, ProfileProvider } from '../contexts/ProfileContext'

function MyApp({ Component, pageProps }) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />
    </ProfileProvider>
    )
}

export default MyApp
