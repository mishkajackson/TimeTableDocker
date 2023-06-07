import styles from './style.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    function onFormSubmit(e) {
        e.preventDefault();
        axios.get(`http://localhost:4200/api/users/auth/${password}`)
        .then(res => {
            console.log(res.data)
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("authenticated", "true");
                navigate("/");
            }else {
                setError(true);
                console.log(error, "Ошибка авторизации");
            }
            
        })
        .catch(error => {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
            console.log(error, 'Ошибка авторизации')
            
        })
    }
    return (
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Вход</h1>
                <form className={styles.form} onSubmit={onFormSubmit}>
                    <div>
                        <p className={styles.inputName}>Пароль</p>
                        <input style={error ? { borderColor: '#f89999' } : {}} value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} type="text" placeholder="Ваш пароль" />
                    </div>
                    <div className={styles.forget}>Забыли пароль?</div>
                    <button type="submit" onClick={onFormSubmit} className={styles.btn}>Вход</button>
                        </form>
                        
                </div>
            
            </div>
    )
}

export default Auth