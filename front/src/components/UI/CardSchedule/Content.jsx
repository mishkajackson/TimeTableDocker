import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../../../App.css";
import styles from "./style.module.css";

function Content({ items, updateUser, users, day, date, addUser }) {
  return (
    <div>
      {!items.length ? (
        <div className={styles.block}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={day === "morning" ? faSun : faMoon}
          />
          <select
            value={users.id}
            defaultValue={"..."}
            onChange={(e) => addUser(e, date, day)}
            name="select"
          >
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.block}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={item.timeOfDay === "morning" ? faSun : faMoon}
            />
            <select
              value={item.userId}
              onChange={(e) =>
                updateUser(item.id, e, item.date, item.timeOfDay)
              }
              name="select"
            >
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default Content;
