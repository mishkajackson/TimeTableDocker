import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Users({ backMenu, addUser }) {
  const [error, setError] = useState(false)
  const [name, setName] = useState('')
  const [isChecked, setIsChecked] = useState(false);


  return (
    <div>
      <button className={styles.btnBack} onClick={backMenu}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Назад</span>
      </button>
      <h3>Добавить пользователя</h3>
      <div>
        <div>
          <p className={styles.inputName}>Имя пользователя</p>
          <input
            style={error ? { borderColor: "#f89999" } : {}}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="Введите имя пользователя"
          />
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>Администратор</span>
          </label>
        </div>
        <button
          type="submit"
          onClick={() => addUser(name, isChecked)}
          className={styles.btn}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default Users