import { useState } from "react";
import styles from "./style.module.css";

function Check({ id, label, checked, color, handleChecked, count }) {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handle(e) {
    setIsChecked((prev) => !prev);
    handleChecked(e.target.id, !isChecked);
  }

  return (
    <div className={styles.checkboxWrapper}>
      <label>
        <input
          id={id}
          style={
            isChecked ? { backgroundColor: color, position: "relative" } : {}
          }
          className={styles.checked}
          type="checkbox"
          checked={defaultChecked}
          onChange={(e) => handle(e)}
        />
        <span>{label}</span>
      </label>
      <span className={styles.count}>{count}</span>
    </div>
  );
}

export default Check;
