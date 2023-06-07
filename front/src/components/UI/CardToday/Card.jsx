import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import 'moment/locale/ru';

import '../../../App.css';

import styles from './style.module.css';




function Card({title, items, selectedDay, cab}) {
    const filteredItemsCab2 = items.filter(item => moment(item.date.slice(0,10)).format('DD.MM.YYYY') === selectedDay && item.cabId === cab)
    return (
        <div>
            
            {
                filteredItemsCab2.length
                
                    ? < div className={styles.card}>
                        <div className={styles.blocks}>
                            <h1>{title}</h1>
                            <div className={styles.row}>
                               {
                            filteredItemsCab2.map(item => (
                                <div className={styles.block} key={item.id} >
                                    <FontAwesomeIcon className={styles.icon} icon={item.timeOfDay === 'morning' ? faSun : faMoon} />
                                    <p>{item.user.name}</p>
                                </div>
                            ))
                        }
                            </div>
                        </div>
                    </div>
                    : < div className={styles.card}>
                        <div className={styles.blocks}>
                            <h1>{title}</h1>
                            <div className={styles.row}>
                                <p style={{ paddingLeft: '20px' }}>...</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Card