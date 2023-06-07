import moment from 'moment'
import styles from './style.module.css';

function UpdateTime(time) {
    return (
        <div className={styles.main}>            
            <p>Обновлено <span>{moment(time.time).fromNow()}</span></p>
        </div>
        
        
    )
}

export default UpdateTime