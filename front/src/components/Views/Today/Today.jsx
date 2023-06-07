import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../UI/CardToday/Card';
import Loader from '../../UI/Loader/Loader';
import DatePicker from '../../UI/DatePicker/DatePicker';
import styles from './style.module.css';

const today = new Date().toLocaleDateString()

function Today() {
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    useEffect(() => {
        let dates = []
        axios
          .get("/api/weekdates")
          .then((res) => {
            for (let i = 0; i < 6; i++) {
              dates.push(new Date(res.data[i]));
            }
          })
          .catch((error) => console.log(error));
        setCurrentWeekDates(dates);
    }, []);
    const handleChange = (value) => {
        setSelectedDay(value)
    }
    const [listOfTimeline, setlistOfTimeline] = useState([])
    useEffect(() => {
        axios.get("/api/timeline/week")
            .then(res => {
                setlistOfTimeline(res.data);
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div>
            <div className={styles.title} >
                <div>
                    <DatePicker currentWeekDates={currentWeekDates} selectedDay={selectedDay} setSelectedDay={handleChange}></DatePicker>
                </div>
            </div>
                    {
                    currentWeekDates.length
                    ? <div className={styles.content}>
                        <div className={styles.cards}>
                            <Card title={'ЭЭГ'} items={listOfTimeline} selectedDay={selectedDay} cab={3}></Card>
                            <Card title={'Платные'} items={listOfTimeline} selectedDay={selectedDay} cab={4}></Card>
                            <Card title={'Дежурство'} items={listOfTimeline} selectedDay={selectedDay} cab={5}></Card>
                        </div>
                    </div>
                            : <Loader></Loader>
                    }
        </div>
    )
}



export default Today
