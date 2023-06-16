import styles from "./style.module.css";

function Dot({date}) {


    return (
        <div style={{backgroundColor: '#6f7fff'}} className={styles.dot}></div>
    )
}

export default Dot