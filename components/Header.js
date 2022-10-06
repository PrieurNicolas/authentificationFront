import React from 'react'
import Link from 'next/link'
import Style from '../styles/Header.module.css'

export default function Header() {
  return (
    <>
      <header className={Style.Header}>
        <nav>
          <ul className={Style.Headerul}>
            <li className={Style.Headerli}><Link className={Style.HeaderLink} to="Accueil" href='/'>Accueil</Link></li>
            <li className={Style.Headerli}><Link to="login" href='/login'>Compte</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
