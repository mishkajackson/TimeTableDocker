import axios from "axios";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
  const [swipe, setSwipe] = useState(0);
  const [tab, setTab] = useState('0');
  const [today, setDay] = useState(new Date());
  const [datesList, setDatesList] = useState([]);
  const [users, setUsers] = useState([]);
  const [listOfTimeline, setlistOfTimeline] = useState([])

  useEffect(() => {
    axios.get("users/").then((res) => {
      setUsers(res.data);
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
    if (e.target.id === "0") {
      setTab('0')
      swipe.slideTo(0);
    }
    if (e.target.id === "1") {
      setTab("1");
      swipe.slideTo(1);
    }
    if (e.target.id === "2") {
      setTab("2");
      swipe.slideTo(2);
    }
  }

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
            id="0"
            style={tab === "0" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            Платные
          </p>
          <p
            id="1"
            style={tab === "1" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            ЭЭГ
          </p>
          <p
            id="2"
            style={tab === "2" ? { background: "#e4e4e4" } : {}}
            onClick={(e) => changeTab(e)}
          >
            Дежурство
          </p>
        </div>
      </div>
      <div>
        <Swiper
          spaceBetween={200}
          slidesPerView={1}
          onSlideChange={(swiper) => setTab(String(swiper.snapIndex))}
          onBeforeInit={(swipper) => setSwipe(swipper)}
        >
          <SwiperSlide>
            <Table datesList={datesList} users={users} cab={4}></Table>
          </SwiperSlide>
          <SwiperSlide>
            <Table datesList={datesList} users={users} cab={3}></Table>
          </SwiperSlide>
          <SwiperSlide>
            <Table datesList={datesList} users={users} cab={5}></Table>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Schedule;
