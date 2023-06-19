import axios from "axios";
import styles from "./style.module.css";
import Card from "../CardSchedule/Card";
import Loader from "../components/Loader/Loader";
import moment from "moment";
import "moment/locale/ru";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Table({ datesList, users, cab, today }) {
  const [listOfTimeline, setlistOfTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  function getTimeLine() {
    const startOfMonth = moment(today).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(today).endOf("month").format("YYYY-MM-DD");

    axios
      .get(`timeline/filter?startDate=${startOfMonth}&endDate=${endOfMonth}`)
      .then((res) => {
        const data = res.data;
        setlistOfTimeline(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getTimeLine();
  }, [today]);
  function addUser(e, date, timeOfDay) {
    axios.post("timeline/", {
      date: moment.utc(date).format(),
      timeOfDay: timeOfDay,
      userId: Number(e.target.value),
      cabId: cab,
    });

    console.log("addUser");
  }
  function updateUser(id, e, date, timeOfDay) {
    console.log(e.target.value, id);
    if (!e.target.value.length) {
      axios.delete(`timeline/${id}`);
      console.log("delete");
    } else {
      axios.put(`timeline/${id}`, {
        date: date,
        timeOfDay: timeOfDay,
        userId: Number(e.target.value),
        cabId: cab,
      })
      console.log("update");
    }
    
  }
  return (
    <div>
      {!isLoading ? (
        <div className={styles.content}>
          {datesList.map((date, index) => (
            <div key={index} className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.blocks}>
                  <div className={styles.block}>
                    <p> {moment(date).format("dd")}</p>
                    <p>{moment(date).format("DD")}</p>
                  </div>
                  <div className={styles.block}>
                    <Card
                      items={listOfTimeline}
                      users={users}
                      cab={cab}
                      addUser={addUser}
                      updateUser={updateUser}
                      date={date}
                      day={"morning"}
                      icon={faSun}
                    ></Card>
                    <Card
                      items={listOfTimeline}
                      users={users}
                      cab={cab}
                      addUser={addUser}
                      updateUser={updateUser}
                      date={date}
                      day={"evening"}
                      icon={faMoon}
                    ></Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader></Loader>
      )}
      {/* <Notification title={'Ошибка'} message={'Ошибка загрузки данных на сервер'}/> */}
    </div>
  );
}

export default Table;
