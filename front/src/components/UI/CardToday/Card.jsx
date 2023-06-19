import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import 'moment/locale/ru';

import '../../../App.css';

import styles from './style.module.css';




function Card({title, items, selectedDay, cab}) {
    const filteredItems = items.filter(
      (item) =>
        moment(item.date).format("DD.MM.YYYY") === selectedDay &&
        item.cabId === cab &&
        item.timeOfDay === "morning"
    );
    const filteredItems2 = items.filter(
      (item) =>
        moment(item.date).format("DD.MM.YYYY") === selectedDay &&
        item.cabId === cab &&
        item.timeOfDay === "evening"
    );
    return (
      <div>
        {filteredItems.length ? (
          <div className={styles.card}>
            <div className={styles.blocks}>
              <h1>{title}</h1>
              <div className={styles.row}>
                {filteredItems.map((item) => (
                  <div className={styles.block} key={item.id}>
                    <FontAwesomeIcon className={styles.icon} icon={faSun} />
                    <p>{item.user.name}</p>
                  </div>
                ))}
                {filteredItems2.map((item) => (
                  <div className={styles.block} key={item.id}>
                    <FontAwesomeIcon className={styles.icon} icon={faMoon} />
                    <p>{item.user.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.blocks}>
              <h1>{title}</h1>
              <div className={styles.row}>
                <div className={styles.block}>
                  <FontAwesomeIcon className={styles.icon} icon={faSun} />
                  <p>...</p>
                </div>
                <div className={styles.block}>
                  <FontAwesomeIcon className={styles.icon} icon={faMoon} />
                  <p>...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Card