import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../UI/CardToday/Card';
import Loader from '../../UI/Loader/Loader';
import DatePicker from '../../UI/DatePicker/DatePicker';
import styles from './style.module.css';
import moment from 'moment';

function Today() {
    const [selectedDay, setSelectedDay] = useState(moment().format('DD.MM.YYYY'));
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    useEffect(() => {
        axios
          .get(`weekdates`)
          .then((res) => {
            let dates = []
            for (let i = 0; i < res.data.length; i++) {
              dates.push(moment(res.data[i]).format("DD.MM.YYYY"));
            }
            setCurrentWeekDates(dates);
          })
          .catch((error) => console.log(error));
        ;
    }, []);
    const handleChange = (value) => {
        setSelectedDay(value)
    }
    const [listOfTimeline, setlistOfTimeline] = useState([])
    useEffect(() => {
        axios.get(`timeline/week`)
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
                    listOfTimeline.length
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
