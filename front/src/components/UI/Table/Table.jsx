import axios from 'axios';
import styles from './style.module.css';
import Card from '../../UI/CardSchedule/Card';
import Loader from '../../UI/Loader/Loader';
import moment from 'moment'
import 'moment/locale/ru';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';


function Table({ datesList, users, cab, today }) {
    const [listOfTimeline, setlistOfTimeline] = useState([])
    // console.log(listOfTimeline);
    useEffect(() => {
      axios
        .get(`http://localhost:4200/api/timeline/month/${cab}/${today}`)
        .then((res) => {
          setlistOfTimeline(res.data);
        });
    }, [today]);
    function addUser(e, date, day) {
        const userid = users.filter(user => user.name === e.target.value )
        console.log(userid[0].id, date, day, cab);
        axios.post("http://localhost:4200/api/timeline/", {
          date: date,
          userId: userid[0].id,
          timeOfDay: day,
          cabId: cab,
        });
        console.log('addUser')
    }
    function updateUser(e, id, date, day) {
        console.log(id, Number(e.target.value), date, day)
        if (Number(e.target.value) === 22) {
            axios.delete(`http://localhost:4200/api/timeline/${id}`);
            console.log('delete')
        } else {
            axios.put(`http://localhost:4200/api/timeline/${id}`, {
              date: date,
              userId: Number(e.target.value),
              timeOfDay: day,
              cabId: cab,
            });
            console.log({ id: id, userid: Number(e.target.value), date: date, day: day, cab: cab })
        }

    }
    return (
      <div>
        {datesList.length ? (
          <div className={styles.content}>
            {datesList.map((date, index) => (
              <div key={index} className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.blocks}>
                    <div className={styles.block}>
                      <p> {moment.utc(date).format("DD")}</p>
                      <p>{moment.utc(date).format("dd")}</p>
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