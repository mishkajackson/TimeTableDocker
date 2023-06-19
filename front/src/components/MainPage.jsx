
import Footer from '../components/Footer';
import Today from './Views/Today/Today';
import Me from "./Views/Me/Me";
import Schedule from "./Views/Schedule/Schedule";
import User from "./Views/User/User";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainPage = () => {
    const authLocalStorage = JSON.parse(localStorage.getItem("authenticated"))
    const [authenticated, setAuthenticated] = useState(authLocalStorage);
     const [swipe, setSwipe] = useState(0);
     const [tab, setTab] = useState(0);

     function slideTo(page) {
        swipe.slideTo(page);
     }

    if (!authenticated) {
        return <Navigate replace to="/Login" />;
    } else {
        return (
          <div>
            <Swiper
              spaceBetween={100}
              slidesPerView={1}
              
              onBeforeInit={(swipper) => setSwipe(swipper)}
            >
              <SwiperSlide>
                <Today />
              </SwiperSlide>
              <SwiperSlide>
                <Me />
              </SwiperSlide>
              <SwiperSlide>
                <Schedule />
              </SwiperSlide>
              <SwiperSlide>
                <User />
              </SwiperSlide>
            </Swiper>

            <Footer slide={slideTo}></Footer>
          </div>
        );
    }
};

export default MainPage;