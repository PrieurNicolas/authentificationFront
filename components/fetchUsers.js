import React, { useEffect, useState } from 'react'
import Style from '../styles/Users.module.css'
export default function Users() {

    const [allUsers, setAllUsers] = useState([]);
    
    const fetchAllUsers = async () => {
        const res = await fetch('http://localhost:5000/api/utilisateur/2');
        const allUsers = await res.json({});
        setAllUsers(allUsers);
      }

    useEffect(() => {
        fetchAllUsers();
      }, [])

      console.log(allUsers)
  return (
    <>
             {allUsers?.map(data => (
            <>
            <div key={data.id}>
                <a>
                    <div className={Style.divUsers}>
                    <h3>Utilisateur : {data.id}</h3>
                    <h1 className={Style.dataH1}> {data.pseudo} - {data.email} -<br/> {data.bio}</h1>
                    </div>
                </a>
            </div>
            </>
        ))}
    </>
  )
}