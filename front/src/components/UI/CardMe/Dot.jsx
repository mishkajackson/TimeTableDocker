import styles from "./style.module.css";

function Dot({color}) {
    return (
        <div style={{backgroundColor: color}} className={styles.dot}></div>
    )
}

export default Dot