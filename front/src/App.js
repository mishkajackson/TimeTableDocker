import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import MainPage from './components/MainPage';
import Today from './components/Views/Today/Today';
import Me from './components/Views/Me/Me'
import Schedule from './components/Views/Schedule/Schedule';
import User from './components/Views/User/User';
import Auth from './components/Views/Auth/Auth';



function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} >
            {/* <Route index element={<Today />} />
            <Route path="Today" element={<Today />} />
            <Route path="Me" element={<Me />} />
            <Route path="Schedule" element={<Schedule />} />
            <Route path="User" element={<User />} /> */}
          </Route>
          <Route path="Login" element={<Auth />} />
        </Routes>
      </BrowserRouter>


    </div>

  );
}

export default App;
