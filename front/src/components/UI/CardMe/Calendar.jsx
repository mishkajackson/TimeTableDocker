
import moment from 'moment'
import "moment/locale/ru";
import styles from "./style.module.css";
import { useEffect, useState } from 'react';
import axios from "axios";

import Dot from './Dot'

function Calendar({ datesList, today }) {
  const weekdays = moment.weekdaysMin(true);
  const [selectDay, setSelectDay] = useState(today);
  const [listOfTimeline, setListOfTimeline] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
    axios
      .get(
        `timeline/user/${user.id}/filter?startDate=${startOfMonth}&endDate=${endOfMonth}`
      )
      .then((res) => {
        setListOfTimeline(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
              <div>
                <Dot items={listOfTimeline} date={date}></Dot>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar