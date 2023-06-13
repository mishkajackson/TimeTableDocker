
import moment from 'moment'
import "moment/locale/ru";
import styles from "./style.module.css";
import { useEffect, useState } from 'react';

function Calendar({ datesList, today }) {
  const weekdays = moment.weekdaysMin(true);
  const [selectDay, setSelectDay] = useState(today);

  return (
    <div className={styles.main}>
      <div className={styles.calendar}>
        <div className={styles.grid}>
          {weekdays.map((weekday, index) => (
            <div className={styles.weekday} key={index}>
              {weekday}
            </div>
          ))}
          {datesList.map((date, index) => (
            <div
              style={Object.assign(
                date.month() === today.month()
                  ? { color: "#5e5e5e" }
                  : { color: "#c1c1c1" },
                date.format("DD.MM.YYYY") === selectDay.format("DD.MM.YYYY")
                  ? { border: "1px solid #3674f9", borderRadius: "6px" }
                  : {}
              )}
              onClick={() => setSelectDay(date)}
              className={styles.date}
              key={index}
            >
              {date.format("D")}
              {/* <div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar