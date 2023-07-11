import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

import Card from '../../UI/components/Card/Card';
import Loader from "../../UI/components/Loader/Loader";
import Header from "../../UI/components/Header/Header";
import Content from '../../UI/components/Card/Content';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


function Today() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [swipe, setSwipe] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsOfCab3, setItemsOfCab3] = useState()
    const [itemsOfCab4, setItemsOfCab4] = useState();
    const [itemsOfCab5, setItemsOfCab5] = useState();
    const [currentWeekDates, setCurrentWeekDates] = useState([]);

    useEffect(() => {
      const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
      let dates = [];
      for (let i = 0; i < 6; i++) {
        dates.push({id: i, date: moment(startOfWeek).add(i, "days").format("DD.MM.YYYY")});
      }
      setCurrentWeekDates(dates);
      const test = dates.filter((date) => 
        date.date ===
          moment().format("DD.MM.YYYY")
      )
      setSelectedDay(test[0])
    }, []);

    const setDate = (tab) => {
      const selectDay = currentWeekDates.filter((date) => 
      date.id === Number(tab)
      )
      setSelectedDay(selectDay[0]);
    }

     const changeDay = (value) => {
       setSelectedDay(value);
       swipe.slideTo(value.id);
     };
    function setItems(cabId, items) {
      let filteredItems = items
        .filter(
          (item) =>
            item.cabId === cabId
        )
        .sort(function (a, b) {
          if (a.timeOfDay > b.timeOfDay) {
            return -1;
          }
          return 0;
        });
        return filteredItems;
    }
    useEffect(() => {
      const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
      const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");
      axios
        .get(`timeline/filter?startDate=${startOfWeek}&endDate=${endOfWeek}`)
        .then((res) => {
          setItemsOfCab3(setItems(3, res.data));
          setItemsOfCab4(setItems(4, res.data));
          setItemsOfCab5(setItems(5, res.data));
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);
    return (
      <div>
        {!isLoading ? (
          <div>
            <div>
              <Header
                isVisibleDatepicker={true}
                currentWeekDates={currentWeekDates}
                selectedDay={selectedDay}
                changeDay={changeDay}
              />
            </div>
            <Swiper
              style={{ height: "1000px" }}
              speed={100}
              cssMode={true}
              initialSlide={selectedDay.id}
              onSlideChange={(swiper) => setDate(String(swiper.snapIndex))}
              onBeforeInit={(swipper) => setSwipe(swipper)}
            >
              {currentWeekDates.map((date) => (
                <div key={date.id}>
                  <SwiperSlide>
                    <Card title="Дежурство">
                      {itemsOfCab5.filter(
                        (item) =>
                          moment(item.date).format("DD.MM.YYYY") === date.date
                      ).length !== 0 ? (
                        <div>
                          {itemsOfCab5
                            .filter(
                              (item) =>
                                moment(item.date).format("DD.MM.YYYY") ===
                                date.date
                            )
                            .map((item) => (
                              <div key={item.id}>
                                <Content
                                  icon={
                                    item.timeOfDay === "morning"
                                      ? faSun
                                      : faMoon
                                  }
                                  text={item.user.name}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div>
                          <Content icon={faSun} text={"..."} />
                          <Content icon={faMoon} text={"..."} />
                        </div>
                      )}
                    </Card>
                    <Card title="ЭЭГ">
                      {itemsOfCab3.filter(
                        (item) =>
                          moment(item.date).format("DD.MM.YYYY") === date.date
                      ).length !== 0 ? (
                        <div>
                          {itemsOfCab3
                            .filter(
                              (item) =>
                                moment(item.date).format("DD.MM.YYYY") ===
                                date.date
                            )
                            .map((item) => (
                              <div key={item.id}>
                                <Content
                                  icon={
                                    item.timeOfDay === "morning"
                                      ? faSun
                                      : faMoon
                                  }
                                  text={item.user.name}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div>
                          <Content icon={faSun} text={"..."} />
                          <Content icon={faMoon} text={"..."} />
                        </div>
                      )}
                    </Card>

                    <Card title="Платные">
                      {itemsOfCab4.filter(
                        (item) =>
                          moment(item.date).format("DD.MM.YYYY") === date.date
                      ).length !== 0 ? (
                        <div>
                          {itemsOfCab4
                            .filter(
                              (item) =>
                                moment(item.date).format("DD.MM.YYYY") ===
                                date.date
                            )
                            .map((item) => (
                              <div key={item.id}>
                                <Content
                                  icon={
                                    item.timeOfDay === "morning"
                                      ? faSun
                                      : faMoon
                                  }
                                  text={item.user.name}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div>
                          <Content icon={faSun} text={"..."} />
                          <Content icon={faMoon} text={"..."} />
                        </div>
                      )}
                    </Card>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        ) : (
          <Loader></Loader>
        )}
      </div>
    );
}



export default Today
