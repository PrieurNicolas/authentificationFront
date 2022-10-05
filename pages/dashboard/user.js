import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userService } from '../../src/_services/user.service';

export default function user() {
  const router = useRouter();

  useEffect(() => {
    console.log(useEffect)
    userService.getAllusers()
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [])
  

  const logOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/')
  }

  return (
    <>
    <h1> Profil utilisateur : </h1>
    <button type="submit" onClick={() => logOut()}>deconnexion</button>
    </>
  )
}
