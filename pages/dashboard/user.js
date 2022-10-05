import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userService } from '../../src/_services/user.service';

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
      <h1> Profil utilisateur : </h1>


      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Date de creation</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.pseudo}</td>
                <td>{user.email}</td>
                <td>{user.bio}</td>
                <td>{user.dateIncription}</td>
              </tr>
            ))
          }
        </tbody>
      </table>




      <button type="submit" onClick={() => logOut()}>deconnexion</button>
    </>
  )
}
