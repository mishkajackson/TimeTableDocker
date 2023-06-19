
import moment from 'moment'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../UI/components/Loader/Loader';
import styles from './style.module.css';

import { useState, useEffect } from "react";
import Calendar from '../../UI/CardMe/Calendar';




function Me() {
    const [today, setDay] = useState(moment());
    const [datesList, setDatesList] = useState([]);

    useEffect(() => {
      setDaysOfMonth();
    }, [today]);

    function getTimelines() {
        
    }

    function setDaysOfMonth() {
     const startOfMonth = today.clone().startOf("month");
     const endOfMonth = today.clone().endOf("month");

     const startOfWeek = startOfMonth.clone().startOf('week')
     const endOfWeek = endOfMonth.clone().endOf("week");

     const calendarDates = []

     let currentDate = startOfWeek

     while(currentDate.isSameOrBefore(endOfWeek)) {
      calendarDates.push(currentDate.clone())
      
      currentDate = currentDate.clone().add(1, 'day')
     }
     setDatesList(calendarDates)
    }

    function nextMonth() {
      setDay(today.clone().add(1, "month"));
      setDatesList(setDaysOfMonth);
    }

    function prevMonth() {
      setDay(today.clone().add(-1, "month"));
      setDatesList(setDaysOfMonth);
    }


    return (
      <div>
        <div className={styles.title}>
          <FontAwesomeIcon
            onClick={prevMonth}
            className={styles.icon}
            icon={faChevronLeft}
          />
          <h1>{today.format("MMMM")}</h1>
          <FontAwesomeIcon
            onClick={nextMonth}
            className={styles.icon}
            icon={faChevronRight}
          />
        </div>
        <div>
          <Calendar datesList={datesList} today={today}></Calendar>
        </div>
      </div>
    );
}



export default Me;
