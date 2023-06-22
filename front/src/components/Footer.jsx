
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser, faListCheck, faTableColumns, faGear } from '@fortawesome/free-solid-svg-icons'
import '../App.css';




function Footer() {
    const navButtons = [
        { name: 'На неделе', icon: faListCheck, active: true, link: '/' },
        { name: 'Календарь', icon: faCalendarDays, active: false, link: '/Me' },
        { name: 'Графики', icon: faTableColumns, active: false, link: '/Schedule' },
        { name: 'Настройки', icon: faGear, active: false, link: '/User' }
        
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