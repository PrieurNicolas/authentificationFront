import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';

export default function user() {
  const router = useRouter();
  

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
