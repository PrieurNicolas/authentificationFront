import React, { useState } from 'react'
import Header from '../components/Header'
import Style from '../styles/Login.module.css'
import axios, { Axios, AxiosError } from 'axios'
import { useRouter } from 'next/router'

export default function Contact() {
  const router = useRouter()

  const [insc, setInsc] = useState ("")

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
    
    if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(credentials.email)){
      alert('Veuillez entrer un email valide.')
    }
    else{
    e.preventDefault()
    axios.post('http://localhost:5000/api/utilisateur', credentials)
      .then(res => {
        console.log(res)
        setInsc(res.data)
      })
      .catch((error) => console.log(error) + 
      setInsc((error.response.data)))
    }}


  return (
    <>
      <Header />
      <div className={Style.divLogForm}>
        <h1 className={Style.LogH1}>Ma première connexion</h1>
        <form onSubmit={onSubmit} className={Style.FormLog}>
          
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='pseudo'>Mon pseudo</label>
            <input className={Style.LogInp} type="text" name="pseudo" value={credentials.pseudo} onChange={onChange} required="required"/>
          </div>

          <div className={Style.group}>
            <label htmlFor='password'>Mon Email</label>
            <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} required="required"/>
          </div>
                    
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='bio'>Ma bio :</label>
            <input className={Style.LogInp} type="text" name="bio" value={credentials.bio} onChange={onChange} required="required"/>
          </div>

          <div className={Style.group}>
            <label htmlFor='password'>Mon mot de passe</label>
            <input className={Style.LogInp} type="password" name="password" value={credentials.password} onChange={onChange} required="required"/>
          </div>

          <div className={Style.group}>
            <button className={Style.ButtLog}>S'inscrire</button>
          </div>
        </form>
        <h1 className={Style.LogH1}>{insc}</h1>
      </div>
    </>
  )
}