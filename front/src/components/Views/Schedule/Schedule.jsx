import axios from 'axios';
import styles from './style.module.css';
import Table from '../../UI/Table/Table'
import UpdateTime from '../../UI/UpdateTime/UpdateTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import moment from 'moment';


function Schedule() {
    const [tab, setTab] = useState('tab1')
    const [day, setDay] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [datesList, setDatesList] = useState([])
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        axios.get("http://localhost:4200/api/users/").then((res) => {
          setUsers(res.data);
        });
    }, [])

    useEffect(() => {
      axios
        .get(
          `http://localhost:4200/api/dates/${day}`
          
        )
        .then((res) => {
          setDatesList(res.data);
        })
        .catch((error) => console.log(error));
    }, [day]);
    
 
    function nextMonth() {
      const date = moment(day).add(1, "months").format("YYYY-MM-DD")
      setDay(date);
    }

    function prevMonth() {
        const date = moment(day).add(-1, "months").format("YYYY-MM-DD");
        setDay(date);
    }
    
    function changeTab(e) {
        if (e.target.id === '1') {
            setTab('tab1') 
        } 
        if (e.target.id === '2') {
            setTab('tab2')
        } 
        if (e.target.id === '3') {
            setTab('tab3')
        } 
    }

    const pages = [
      {
        id: "tab1",
        component: (
          <Table
            datesList={datesList}
            users={users}
            cab={4}
            today={day}
          ></Table>
        ),
      },
      {
        id: "tab2",
        component: (
          <Table
            datesList={datesList}
            users={users}
            cab={3}
            today={day}
          ></Table>
        ),
      },
      {
        id: "tab3",
        component: (
          <Table
            datesList={datesList}
            users={users}
            cab={5}
            today={day}
          ></Table>
        ),
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
          <h1>{moment(day).format("MMMM")}</h1>
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