import React, { useState } from 'react'
import Header from '../components/public/Header'
import Style from '../styles/Login.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Contact() {
  const router = useRouter()


  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
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
    axios.post('http://localhost:5000/api/auth/login', credentials)
      .then(res => {
        console.log(res)
        router.push('/admin/dashboard')
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
            <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className={Style.group}>
            <label htmlFor='password'>Mot de passe :</label>
            <input className={Style.LogInp} type="password" name="password" value={credentials.password} onChange={onChange} />
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