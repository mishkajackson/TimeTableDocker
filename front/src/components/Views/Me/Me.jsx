import { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Card from '../../UI/CardMe/Card';
import Loader from '../../UI/Loader/Loader';
import styles from './style.module.css';


const today = moment(new Date()).format("YYYY-MM-DD");





function Me() {
     const [selectedDay, setSelectedDay] = useState(today);
     const [currentWeekDates, setCurrentWeekDates] = useState([]);
     const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
     useEffect(() => {
       let dates = [];
       axios
         .get("http://localhost:4200/api/weekdates")
         .then((res) => {
           for (let i = 0; i < 6; i++) {
             dates.push(new Date(res.data[i]));
           }
         })
         .catch((error) => console.log(error));
       setCurrentWeekDates(dates);
     }, []);
     const handleChange = (value) => {
       setSelectedDay(value);
     };
     const [listOfTimeline, setlistOfTimeline] = useState([]);
     useEffect(() => {
       axios
         .get(

           `http://localhost:4200/api/timeline/monthbyid/${user.id}/${today}`
         )
         .then((res) => {
           setlistOfTimeline(res.data);
         })
         .catch((error) => console.log(error));
     }, []);
    // function nextMonth() {
    //     const day = new Date(today.setMonth(today.getMonth() + 1))
    //     setDay(day)
    //     setDatesList(setDaysOfMonth)
    // }

    // function prevMonth() {
    //     const day = new Date(today.setMonth(today.getMonth() - 1))
    //     setDay(day)
    //     setDatesList(setDaysOfMonth)
    // }


    return (
        <div>
            <div className={styles.title}>
                {/* <FontAwesomeIcon onClick={prevMonth} className={styles.icon} icon={faChevronLeft} /> */}
                <h1>{today}</h1>
                {/* <FontAwesomeIcon onClick={nextMonth} className={styles.icon} icon={faChevronRight} /> */}
            </div>
                    {
                    listOfTimeline.length
                    ? <div className={styles.content}>
                        <div className={styles.cards}>
                                <div>
                                <Card title={'Платные'} items={listOfTimeline} cab={3}></Card>
                                <Card title={'ЭЭГ'} items={listOfTimeline}  cab={4}></Card>
                                <Card title={'Дежурство'} items={listOfTimeline} cab={5}></Card>
                                </div>
                        </div>
                    </div>
                            : <Loader></Loader>
                    }
                    
                
        </div>
    )
}



export default Me;
