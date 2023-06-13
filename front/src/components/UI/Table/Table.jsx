import axios from "axios";
import styles from "./style.module.css";
import Card from "../../UI/CardSchedule/Card";
import Loader from "../../UI/Loader/Loader";
import moment from "moment";
import "moment/locale/ru";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Table({ datesList, users, cab }) {
  const [listOfTimeline, setlistOfTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  

  useEffect(() => {
    axios.get("timeline/").then((res) => {
      const data = res.data;
      setlistOfTimeline(data);
      setIsLoading(false);
    });
  }, []);
  function addUser(e, date, timeOfDay) {
    axios.post("timeline/", {
      date: moment.utc(date, "DD.MM.YYYY").format(),
      timeOfDay: timeOfDay,
      userId: Number(e.target.value),
      cabId: cab,
    });

    console.log("addUser");
  }
  function updateUser(id, e, date, timeOfDay) {
    if (Number(e.target.value) === 22) {
      axios.delete(`timeline/${id}`)
      console.log("delete");
    } else {
      axios.put(`timeline/${id}`, {
        date: date,
        timeOfDay: timeOfDay,
        userId: Number(e.target.value),
        cabId: cab,
      });
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
                    <p> {moment({ date }).format("dd")}</p>
                    <p>{moment({ date }).format("DD")}</p>
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
