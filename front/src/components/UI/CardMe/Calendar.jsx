
import moment from 'moment'
import "moment/locale/ru";
import styles from "./style.module.css";
import { useEffect, useState } from 'react';

import Dot from './Dot'

function Calendar({ datesList, today }) {
  const weekdays = moment.weekdaysMin(true);
  const [selectDay, setSelectDay] = useState(today);

  const shifts = ['02.06.2023', '13.06.2023', '27.06.2023']

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
                  : { color: "#c1c1c1" }
              )}
              onClick={() => setSelectDay(date)}
              className={styles.date2}
              key={index}
            >
              <div
                className={styles.date}
                style={
                  date.format("DD.MM.YYYY") === selectDay.format("DD.MM.YYYY")
                    ? {
                        color: "#3674f9",
                        borderRadius: "100%",
                        fontWeight: "800",
                      }
                    : {}
                }
              >
                {date.format("D")}
              </div>
                  <div className={styles.dots}>
                    <Dot date={date}></Dot>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar