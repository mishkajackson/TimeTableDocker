import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function Loader() {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon className={styles.spinner} icon={faCircleNotch} />
        </div>
    )
}

export default Loader
