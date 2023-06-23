import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CardUser from '../../UI/CardUser/Card'
import Users from '../../UI/CardUser/Menu/Users'
import Password from "../../UI/CardUser/Menu/Password";
import Theme from "../../UI/CardUser/Menu/Theme";


function User() {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [menuIsShow, setMenuIsShow] = useState(false);
    const [openMenu, setOpenMenu] = useState(null)

    function handleClick(e) {
      setMenuIsShow(true);
      setOpenMenu(e.target.id);
      console.log(menuIsShow);
    }

    function backMenu() {
      setMenuIsShow(false)
    }

    function addUser(name, isChecked) {
      axios
        .post("users/", { name: name, isAdmin: isChecked })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }

    function logOut() {
        localStorage.removeItem('authenticated');
        setUser('')
        navigate("/Login");
    }


    return (
      <div>
        {!menuIsShow ? (
          <div>
            <div className={styles.title}>
              <input
                type="file"
                name="file"
                id="file"
                className={styles.inputfile}
              />
              <label htmlFor="file">
                <FontAwesomeIcon
                  className={styles.avatar}
                  icon={faUser}
                ></FontAwesomeIcon>
              </label>

              <h1 className={styles.greeting}>{user.name}</h1>
              <p className={styles.role}>
                {user.isAdmin ? "Администратор" : "Пользователь"}
              </p>
            </div>
            <div>
              <div>
                <CardUser handleClick={handleClick}></CardUser>
              </div>
              <div>
                <button className={styles.btn} onClick={logOut}>
                  Выход
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {openMenu === "Users" ? (
              <Users backMenu={backMenu} addUser={addUser} />
            ) : openMenu === "Password" ? (
              <Password backMenu={backMenu} />
            ) : openMenu === "Theme" ? (
              <Theme backMenu={backMenu} />
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    );
}

export default User