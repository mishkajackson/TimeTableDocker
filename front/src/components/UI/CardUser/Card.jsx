import { useState } from 'react';

import '../../../App.css';
import styles from './style.module.css';




function Card({addUser}) {

    const [user, setUser] = useState('')
    
    return (
        <>
        <div className={styles.cards}>
            <div className={styles.card}>
                <div className={styles.blocks}>
                    <h1>Настройки</h1>
                    <div className={styles.row}>
                        <div className={styles.block}>
                            <p>Сменить пароль</p>
                        </div>
                        <div className={styles.block}>
                            <p>Добавить пользователя</p>
                            
                    
                    
                </div>
                        </div>
                    </div>
                </div>
                
        </div>
        <div className={styles.cards}>
                    <div className={styles.card}>
                        <input placeholder='Введите имя' value={user} onChange={(e) => setUser(e.target.value)} type="text" />
                        <button onClick={() => addUser(user)}>Регистрация</button>
                    </div>
            </div>
            </>
    )
}

export default Card