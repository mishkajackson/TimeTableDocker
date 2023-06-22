import { useEffect } from "react";
import styles from "./style.module.css";
import moment from "moment";

function Dot({ items, date, idCheckbox }) {
  const filteredItems = items.filter(
    (item) =>
      moment(item.date).format("DD.MM.YYYY") === date.format("DD.MM.YYYY") &&
      idCheckbox.includes(item.cabId)
  );

  return (
    <div className={styles.dots}>
      {filteredItems.map((item) => (
        <div
          key={item.id}
          style={
            item.cabId === 3
              ? { backgroundColor: "#6f7fff" }
              : item.cabId === 4
              ? { backgroundColor: "#00a600" }
              : item.cabId === 5
              ? { backgroundColor: "#ff5b5b" }
              : ""
          }
          className={styles.dot}
        ></div>
      ))}
    </div>
  );
}

export default Dot