import styles from "./style.module.css";

function Card({ title, children }) {
  return (
    <div className={styles.content}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.blocks}>
            <h1>{title}</h1>
            <div className={styles.row}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card