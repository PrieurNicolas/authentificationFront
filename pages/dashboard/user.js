import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userService } from '../../src/_services/user.service';
import Style from '../../styles/Users.module.css'
import Axios from '../../src/_services/caller.service'
import { accountService } from '../../src/_services/account.service';
import Header from '../../components/Header';

export default function user() {
  const router = useRouter();
  const [insc, setInsc] = useState("")
  var id = accountService.getId()
  const [usersId, setUsersId] = useState([])
  var refreshTokenCookie = accountService.getRToken()

  const refreshToken = () => {
  console.log(refreshTokenCookie)
  Axios.get(`api/auth/refresh_token/${refreshTokenCookie}`)
  .then(res => {
    console.log(res)
    alert(res.data)
  })
  .catch((error) => console.log(error) + setInsc((`Une erreur s'est produite, veuillez réessayer plus tard`)))
}


  const flag = useRef(false)
  useEffect(() => {
    if (flag.current === false) {
      userService.getUser(id)
        .then(res => {
          console.log(res.data)
          setUsersId(res.data)
          setUserPseudo(res.data.pseudo)
          setUserEmail(res.data.email)
          setUserBio(res.data.bio)
          credentials.pseudo=(res.data.pseudo)
          credentials.email=(res.data.email)
          credentials.bio=(res.data.bio)
        })
        .catch(err => console.log(err))
    }
    return () => flag.current = true
  }, [])

  const logOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('id')
    router.push('/')
  }

  const [credentials, setCredentials] = useState({
    pseudo: '',
    email: '',
    bio: '',
    password: '',
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
    Axios.put(`/api/utilisateur/${id}`, credentials)
      .then(res => {
        console.log(res)
        alert(res.data)
        window.location.reload(true)
      })
      .catch((error) => console.log(error) +
        setInsc((error.response.data)))
  }

  return (
    <>
    <Header/>
      <div className={Style.updateForm}>
        <h1 className={Style.userH1}> Profil utilisateur : </h1>

        <form onSubmit={onSubmit} className={Style.FormLog}>
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='pseudo'>Pseudo</label>
            <input className={Style.LogInp} type="text" name="pseudo" value={credentials.pseudo} onChange={onChange} />
          </div>
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='email'>Email</label>
            <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='bio'>Bio</label>
            <input className={Style.LogInp} type="text" name="bio" value={credentials.bio} onChange={onChange} />
          </div>
          <div className={Style.group}>
            <label className={Style.LogLabel} htmlFor='password'>Mot de passe</label>
            <input className={Style.LogInp} type="password" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <div className={Style.group}>
            <button className={Style.ButtLog}>Modifier</button>
          </div>
        </form>
        <h1 className={Style.LogH1}>{insc}</h1>
        <h2 className={Style.userH2}>Date de création du compte :{usersId.createdAt} <br /> Date de la dernière modification du profil : {usersId.updatedAt}</h2>
        <div className={Style.btnDiv}><button className={Style.btnLogOut} type="submit" onClick={() => logOut()}>Déconnexion</button></div>
        <div><button className={Style.btnLogOut} type="submit" onClick={() => refreshToken()}>refreshToken</button></div>
      </div>
    </>
  )
}
