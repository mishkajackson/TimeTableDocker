
import Footer from '../components/Footer';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
    const authLocalStorage = JSON.parse(localStorage.getItem("authenticated"))
    const [authenticated, setAuthenticated] = useState(authLocalStorage);

    if (!authenticated) {
        return <Navigate replace to="/Login" />;
    } else {
        return (
            <div>
                <Footer></Footer>
            </div>
        );
    }
};

export default MainPage;