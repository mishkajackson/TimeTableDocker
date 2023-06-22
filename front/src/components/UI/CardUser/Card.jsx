import { useState } from "react";

import "../../../App.css";
import styles from "./style.module.css";
import { faCircleHalfStroke, faKey, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ addUser }) {
  const [user, setUser] = useState("");

  return (
    <>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.blocks}>
            <h1>Настройки</h1>
            <div className={styles.row}>
              <div className={styles.block}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faKey}
                ></FontAwesomeIcon>
                <p>Сменить пароль</p>
              </div>
              <div className={styles.block}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faUsers}
                ></FontAwesomeIcon>
                <p>Пользователи</p>
              </div>
              <div className={styles.block}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCircleHalfStroke}
                ></FontAwesomeIcon>
                <p>Оформление</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <input
            placeholder="Введите имя"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
          />
          <button className={styles.btn} onClick={() => addUser(user)}>
            Добавить
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
