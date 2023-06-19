
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faStethoscope, faCalendarDays, faMoneyCheckDollar, faPills, faBrain, faUser  } from '@fortawesome/free-solid-svg-icons'
import '../App.css';




function Footer() {
    const navButtons = [
        { name: 'Сегодня', icon: faCalendarCheck, active: true, link: '/' },
        { name: 'Смены', icon: faStethoscope, active: false, link: '/Me' },
        { name: 'Графики', icon: faCalendarDays, active: false, link: '/Schedule' },
        { name: 'Профиль', icon: faUser, active: false, link: '/User' }
        
    ]
    return (
        
       
            <div>
                <Outlet />
            <div className='footer'>
                <div className='navButtons'>
                    {
                        navButtons.map((navButton) => (
                            <NavLink key={navButton.link} to={navButton.link}>
                                    <button className='navButton' >
                                        <FontAwesomeIcon className='navIcon' icon={navButton.icon} />
                                        <span className='navText'>{navButton.name}</span>
                                    </button>
                                </NavLink>
                        ))
                    }
                </div>
            </div>
            
            
        </div>
    )
}

export default Footer