import axios from "axios";
import styles from "./style.module.css";
import Table from "../../UI/Table/Table";
import UpdateTime from "../../UI/UpdateTime/UpdateTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Schedule() {
  const [tab, setTab] = useState("tab1");
  const [today, setDay] = useState(new Date());
  const [datesList, setDatesList] = useState([]);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [listOfTimeline, setlistOfTimeline] = useState(
    JSON.parse(localStorage.getItem("localStorageListSchedule") || "[]")
  );
  const [localStorageListSchedule, setlocalStorageListSchedule] = useState();
  const [localStorageUsers, setlocalStorageUsers] = useState();
  const [updateTime, setupdateTime] = useState();

 

  useEffect(() => {
    axios.get("users/").then((res) => {
      setUsers(res.data);
      setlocalStorageUsers(
        localStorage.setItem("users", JSON.stringify(res.data))
      );
      setDatesList(setDaysOfMonth);
    });
  }, []);

  function setDaysOfMonth() {
    const year = today.getFullYear();
    const month = today.getMonth();
    const countDays = 33 - new Date(year, month, 33).getDate();
    let dateList = [];
    for (let i = 1; i <= countDays; i++) {
      if (new Date(year, month, i).getDay() !== 0) {
        dateList.push(new Date(year, month, i).toLocaleDateString("ru-RU"));
      }
    }
    return dateList;
  }

  function nextMonth() {
    const day = new Date(today.setMonth(today.getMonth() + 1));
    setDay(day);
    setDatesList(setDaysOfMonth);
  }

  function prevMonth() {
    const day = new Date(today.setMonth(today.getMonth() - 1));
    setDay(day);
    setDatesList(setDaysOfMonth);
  }

  function changeTab(e) {
    if (e.target.id === "1") {
      setTab("tab1");
    }
    if (e.target.id === "2") {
      setTab("tab2");
    }
    if (e.target.id === "3") {
      setTab("tab3");
    }
  }

  const pages = [
    {
      id: "tab1",
      component: <Table datesList={datesList} users={users} cab={4}></Table>,
    },
    {
      id: "tab2",
      component: <Table datesList={datesList} users={users} cab={3}></Table>,
    },
    {
      id: "tab3",
      component: <Table datesList={datesList} users={users} cab={5}></Table>,
    },
  ];

  return (
    <div>
      <div className={styles.title}>
        <FontAwesomeIcon
          onClick={prevMonth}
          className={styles.icon}
          icon={faChevronLeft}
        />
        <h1>{today.toLocaleDateString("ru-RU", { month: "long" })}</h1>
        <FontAwesomeIcon
          onClick={nextMonth}
          className={styles.icon}
          icon={faChevronRight}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.nav}>
          <p
            id="1"
            style={tab === "tab1" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            Платные
          </p>
          <p
            id="2"
            style={tab === "tab2" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            ЭЭГ
          </p>
          <p
            id="3"
            style={tab === "tab3" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            Дежурство
          </p>
        </div>
      </div>
      <div>
        {pages
          .filter((page) => page.id === tab)
          .map((item) => (
            <div key={item.id}>{item.component}</div>
          ))}
      </div>
    </div>
  );
}

export default Schedule;
