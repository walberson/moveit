import Head from 'next/head'
import Link from 'next/link'

import { useContext, useEffect } from 'react'
import { ProfileContext } from '../../contexts/ProfileContext'

import styles from '../../styles/pages/Login.module.css'
export default function Login() {
  const { getUser, username, setUsername } = useContext(ProfileContext)

  function setUser() {
    setUsername(username)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      <div className={styles.symbol}>
        <img src="/Simbolo.svg" alt="" />
      </div>
      <div className={styles.wellcome}>
        <main>
          <img src="/logoMoveit.svg" alt="Logo" />
          <strong>Bem-vindo</strong>
          <div className={styles.githubContainer}>
            <img src="/icons/github.svg" alt="Github" />
            <p>Faça login com seu Github para começar</p>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Digite seu username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            <Link href="/dashboard">
              <button type="button" onClick={setUser}>
                <img src="/icons/right-arrow.svg" alt="Flecha para direita" />
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
