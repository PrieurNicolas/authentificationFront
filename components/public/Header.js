import React from 'react'
import Link from 'next/link'
import Style from '../../styles/Header.module.css'

export default function Header() {
  return (
    <>
        <header className={Style.Header}>
            <nav>
                <ul className={Style.Headerul}>
                    <li className={Style.Headerli}><Link className={Style.HeaderLink} to="acceuil" href='/'>Acceuil</Link></li>
                    <li className={Style.Headerli}><Link to="service" href='/service'>service</Link></li>
                    <li className={Style.Headerli}><Link to="contact" href='/contact'>contact</Link></li>
                </ul>
            </nav>
        </header>
    </>
  )
}
