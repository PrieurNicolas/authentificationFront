import React, { useState } from 'react'
import Header from '../components/Header'
import Style from '../styles/Login.module.css'
import { useRouter } from 'next/router'
import Axios from '../src/_services/caller.service'

export default function Contact() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    email: 'lasang@cat.us',
    password: '123oui'
  })

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(credentials)
    Axios.post(`/api/auth/login`, credentials)
      .then(res => {
        console.log(res)
        document.cookie = `accessToken=${res.data.accessToken}`
        document.cookie = `refreshToken=${res.data.refreshToken}`
        router.push('/dashboard/user')
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      <div className={Style.divLogForm}>
        <h1 className={Style.LogH1}>Connexion</h1>
        <form onSubmit={onSubmit} className={Style.FormLog}>
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='email'>Email :</label>
            <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} required="required"/>
          </div>
          <div className={Style.group}>
            <label htmlFor='password'>Mot de passe :</label>
            <input className={Style.LogInp} type="password" name="password" value={credentials.password} onChange={onChange} required="required"/>
          </div>
          <div className={Style.group}>
            <button className={Style.ButtLog}>Connexion</button>
          </div>
        </form>

        <div className={Style.group}>
        <a href='/register'><button>S'enregistrer</button></a>
        </div>
      </div>
    </>
  )
}