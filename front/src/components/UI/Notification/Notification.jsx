import styles from './style.module.css'
function Notification({title, message}) {
    return (
        <div className={styles.main}>
            <div style={{ background: ''}} className={styles.title}>
                {title}
            </div>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    )
}

export default Notification