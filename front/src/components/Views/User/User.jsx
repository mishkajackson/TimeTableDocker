import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CardUser from '../../UI/CardUser/Card'


function User() {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    function addUser(user) {
        console.log(user)
        axios.post("users/", { name: user, isAdmin: false })
            .then(res => {
                console.log(res.data)
            })
    }

    function logOut() {
        localStorage.removeItem('authenticated');
        setUser('')
        navigate("/Login");
    }


    return (
        <div>
            <div className={styles.title}>
                <FontAwesomeIcon className={styles.avatar} icon={faUser}></FontAwesomeIcon>
                <h1 className={styles.greeting}>{user.name}</h1>
                <p className={styles.role}>{user.isAdmin ? 'Администратор' : 'Пользователь'}</p>
            </div>
            <div>
                <div>
                    <CardUser addUser={addUser}></CardUser>
                </div>
                <div>
                    
                    <button className={styles.btn} onClick={logOut}>Выход</button>
                </div>
                
                
            </div>
        </div>
    )
}

export default User