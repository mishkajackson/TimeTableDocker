
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faStethoscope, faCalendarDays, faMoneyCheckDollar, faPills, faBrain, faUser  } from '@fortawesome/free-solid-svg-icons'
import '../App.css';




function Footer({slide}) {
    const navButtons = [
        { name: 'Сегодня', icon: faCalendarCheck, active: true, index: 0 },
        { name: 'Смены', icon: faStethoscope, active: false, index: 1 },
        { name: 'Графики', icon: faCalendarDays, active: false, index: 2 },
        { name: 'Профиль', icon: faUser, active: false, index: 3 }
        
    ]
    return (
      <div>
        <Outlet />
        <div className="footer">
          <div className="navButtons">
            {navButtons.map((navButton) => (
              <div key={navButton.index} onClick={() => slide(navButton.index)}>
                <button className="navButton">
                  <FontAwesomeIcon className="navIcon" icon={navButton.icon} />
                  <span className="navText">{navButton.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Footer