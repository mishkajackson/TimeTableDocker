
import moment from 'moment'
import "moment/locale/ru";
import Check from './Check'
import styles from "./style.module.css";
import { useEffect, useState } from 'react';
import axios from "axios";

import Dot from './Dot'
import Loader from '../components/Loader/Loader';

function Calendar({ datesList, today }) {
  const weekdays = moment.weekdaysMin(true);
  const [selectDay, setSelectDay] = useState(today);
  const [listOfTimeline, setListOfTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([3, 4, 5]);
  const [countCab3, setCountCab3] = useState()
  const [countCab4, setCountCab4] = useState();
  const [countCab5, setCountCab5] = useState();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleChecked(id, isChecked) {
    if (isChecked) {
      setChecked([...checked, Number(id)]);
    } else {
      setChecked(checked.filter((item) => item !== Number(id)));
    }
  }

  function getTimelineOfFullMonth() {
    const startOfMonth = moment(today)
      .startOf("month")
      .startOf("week")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(today)
      .endOf("month")
      .endOf("week")
      .format("YYYY-MM-DD");

    axios
      .get(
        `timeline/user/${user.id}/filter?startDate=${startOfMonth}&endDate=${endOfMonth}`
      )
      .then((res) => {
        setListOfTimeline(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function countTimelineOfMonth() {
    const startOfMonth = moment(today)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(today)
      .endOf("month")
      .format("YYYY-MM-DD");

    axios
      .get(
        `timeline/user/${user.id}/filter?startDate=${startOfMonth}&endDate=${endOfMonth}`
      )
      .then((res) => {
        let arr = []
        arr = res.data;
        setCountCab3(arr.filter((item) => item.cabId === 3).length);
        setCountCab4(arr.filter((item) => item.cabId === 4).length);
        setCountCab5(arr.filter((item) => item.cabId === 5).length);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTimelineOfFullMonth();
    countTimelineOfMonth();
  }, [today, user.id]);

  return (
    <div>
      {!isLoading ? (
        <div className={styles.main}>
          <div>
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
                        date.format("DD.MM.YYYY") ===
                        selectDay.format("DD.MM.YYYY")
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
                      <Dot
                        items={listOfTimeline}
                        date={date}
                        idCheckbox={checked}
                        cab={3}
                      ></Dot>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.checkList}>
              <h1>Фильтры</h1>
              <div className={styles.cardCheckbox}>
                <Check
                  id={5}
                  label={"Дежурство"}
                  color={"#ff5b5b"}
                  checked={true}
                  handleChecked={handleChecked}
                  count={countCab5}
                />
                <Check
                  id={3}
                  label={"ЭЭГ"}
                  color={"#6f7fff"}
                  checked={true}
                  handleChecked={handleChecked}
                  count={countCab3}
                />
                <Check
                  id={4}
                  label={"Платные"}
                  color={"#00a600"}
                  checked={true}
                  handleChecked={handleChecked}
                  count={countCab4}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default Calendar