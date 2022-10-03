import React, { useState } from 'react'
import Header from '../components/public/Header'
import Style from '../styles/Login.module.css'
import axios from 'axios'

export default function Contact() {

  const insc = 'Inscription'

  const [credentials, setCredentials] = useState({
    pseudo: "",
    email: "",
    bio:"",
    password: ""
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
    axios.post('http://localhost:5000/api/utilisateur', credentials)
      .then(res => {
        console.log(res)
        insc = 'inscription reussis'
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      <div className={Style.divLogForm}>
        <h1 className={Style.LogH1}>Inscription :</h1>
        <form onSubmit={onSubmit} className={Style.FormLog}>
          
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='pseudo'>Pseudo :</label>
            <input className={Style.LogInp} type="text" name="pseudo" value={credentials.pseudo} onChange={onChange} />
          </div>

          <div className={Style.group}>
            <label htmlFor='password'>Email :</label>
            <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} />
          </div>
                    
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='bio'>Bio :</label>
            <input className={Style.LogInp} type="text" name="bio" value={credentials.bio} onChange={onChange} />
          </div>

          <div className={Style.group}>
            <label htmlFor='password'>Mot de passe :</label>
            <input className={Style.LogInp} type="password" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <div className={Style.group}>
            <button className={Style.ButtLog}>Inscription</button>
          </div>
        </form>
      </div>
    </>
  )
}