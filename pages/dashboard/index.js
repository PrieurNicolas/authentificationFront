import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { userService } from '../../src/_services/user.service';
import Style from '../../styles/Dashboard.module.css'
import Axios from '../../src/_services/caller.service'

export default function user() {
    const router = useRouter();
    const [users, setUsers] = useState([])
    const flag = useRef(false)
    const [insc, setInsc] = useState("")
    var id = 1

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

    const [usersId, setUsersId] = useState([])

    const [userPseudo, setUserPseudo] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userBio, setUserBio] = useState()
    const flag2 = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            userService.getUser(id)
                .then(res => {
                    console.log(res.data)
                    setUsersId(res.data)
                    setUserPseudo(res.data.pseudo)
                    setUserEmail(res.data.email)
                    setUserBio(res.data.bio)
                })
                .catch(err => console.log(err))
        }
        return () => flag2.current = true
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
                setInsc(res.data)
                window.location.reload(true)
            })
            .catch((error) => console.log(error) +
                setInsc((error.response.data)))
    }

    return (
        <>
            <h1 className={Style.userH1}> Dashboard : </h1>

            <form onSubmit={onSubmit} className={Style.FormLog}>
                <div className={Style.group}>
                    <label className={Style.LogLabel} htmlFor='pseudo'>Pseudo : {userPseudo}</label>
                    <input className={Style.LogInp} type="text" name="pseudo" value={credentials.pseudo} onChange={onChange} />
                </div>
                <div className={Style.group}>
                    <label className={Style.LogLabel} htmlFor='email'>Email : {userEmail}</label>
                    <input className={Style.LogInp} type="text" name="email" value={credentials.email} onChange={onChange} />
                </div>
                <div className={Style.group}>
                    <label className={Style.LogLabel} htmlFor='bio'>Bio : {userBio}</label>
                    <input className={Style.LogInp} type="text" name="bio" value={credentials.bio} onChange={onChange} />
                </div>

                <div className={Style.group}>
                    <button className={Style.ButtLog}>Modifier</button>
                </div>
                <h1 className={Style.LogH1}>{insc}</h1>
                <p>Creation du Profil :{usersId.createdAt} Modifier : {usersId.updatedAt}</p>
            </form>


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
