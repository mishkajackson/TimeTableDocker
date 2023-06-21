import styles from "./style.module.css";

function Check({ name, color, isChecked, setChecked }) {
  return (
    <div className={styles.check}>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={isChecked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      <label>{name}</label>
    </div>
  );
}

export default Check;
