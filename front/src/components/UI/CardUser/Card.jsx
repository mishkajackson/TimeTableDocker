
import "../../../App.css";
import styles from "./style.module.css";
import { faCircleHalfStroke, faKey, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ handleClick }) {
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
                  icon={faUsers}
                ></FontAwesomeIcon>
                <p id={"Users"} onClick={(e) => handleClick(e)}>
                  Пользователи
                </p>
              </div>
              <div className={styles.block}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faKey}
                ></FontAwesomeIcon>
                <p id={"Password"} onClick={(e) => handleClick(e)}>
                  Сменить пароль
                </p>
              </div>
              <div className={styles.block}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCircleHalfStroke}
                ></FontAwesomeIcon>
                <p id={"Theme"} onClick={(e) => handleClick(e)}>
                  Оформление
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
