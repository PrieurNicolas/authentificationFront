import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userService } from '../../src/_services/user.service';
import Style from '../../styles/Users.module.css'

export default function user() {
  const router = useRouter();
  const [users, setUsers] = useState([])
  const flag = useRef(false)

  useEffect(() => {
    if (flag.current === false) {
      userService.getAllusers()
        .then(res => {
          console.log(res.data)
          setUsers(res.data)
        })
        .catch(err => console.log(err))
    }
    return () => flag.current = true
  }, [])

  const logOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/')
  }

  return (
    <>
      <h1 className={Style.userH1}> Profil utilisateur : </h1>

      <div className={Style.divUsers}>
        <table className={Style.fltable}>
          <thead className={Style.flthead}>
            <tr className={Style.fltr}>
              <th>#</th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Date de creation</th>
              <th>Date de modification</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr className={Style.fltr}>
                  <td>{user.id}</td>
                  <td>{user.pseudo}</td>
                  <td>{user.email}</td>
                  <td>{user.bio}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className={Style.btnDiv}><button className={Style.btnLogOut} type="submit" onClick={() => logOut()}>Déconnexion</button></div>
    </>
  )
}
