import axios from "axios";
import styles from "./style.module.css";
import Card from "../CardSchedule/Card";
import Loader from "../components/Loader/Loader";
import moment from "moment";
import "moment/locale/ru";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function Table({ datesList, users, cab, isLoading, listOfTimeline, callErrorNotification }) {
  function addUser(e, date, timeOfDay) {
    axios
      .post("timeline/", {
        date: moment.utc(date).format(),
        timeOfDay: timeOfDay,
        userId: Number(e.target.value),
        cabId: cab,
      })
      .catch((error) => callErrorNotification());

    console.log("addUser");
  }
  function updateUser(id, e, date, timeOfDay) {
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
      .catch((error) => callErrorNotification())
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
                  <div className={styles.block} style={{borderRight: '1px solid #e2e2e2'}}>
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
      
    </div>
  );
}

export default Table;
