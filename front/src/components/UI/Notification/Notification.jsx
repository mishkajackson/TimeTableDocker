import styles from './style.module.css'
import React, {useState, useEffect} from 'react'


function Notification() {

    return (

        <div className={styles.notification}>
          <div className={styles.message}>
            <h1>Ошибка</h1>
          </div>
        </div>
    );
}

export default Notification; 