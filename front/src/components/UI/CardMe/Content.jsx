import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import '../../../App.css';
import styles from './style.module.css';
import moment from 'moment'



function Content({ title, items, today, user, cab }) {
    const startOfMonth = moment(today).startOf('month');
    const endOfMonth = moment(today).endOf('month');
    const filteredItems = items.filter(item => item.cab === cab && item.name === user.name
        && moment(item.date, 'DD.MM.YYYY').toDate() >= startOfMonth.toDate()
        && moment(item.date, 'DD.MM.YYYY').toDate() <= endOfMonth.toDate()
    )
    return (
        <div >
            <div>
                {
                    filteredItems.length
                        ?
                        <div>
                            {
                                filteredItems.map(filteredItem => (
                                    <div className={styles.block} key={filteredItem.id} >
                                        <p
                                            style={(
                                                moment(filteredItem.date, 'DD.MM.YYYY').format('DD.MM.YYYY')
                                                >= moment(new Date(), 'DD.MM.YYYY').format('DD.MM.YYYY')
                                            ) ? {} : { color: '#b0b0b0' }} >
                                            {moment(filteredItem.date, 'DD-MM-YYYY').format('DD')}
                                        </p>
                                        <p
                                            style={(
                                                moment(filteredItem.date, 'DD.MM.YYYY').format('DD.MM.YYYY')
                                                >= moment(new Date(), 'DD.MM.YYYY').format('DD.MM.YYYY')
                                            ) ? {} : { color: '#b0b0b0' }} >
                                             {moment(filteredItem.date, 'DD-MM-YYYY').format('dd')}
                                        </p>
                                        <FontAwesomeIcon
                                            style={(
                                                moment(filteredItem.date, 'DD.MM.YYYY').format('DD.MM.YYYY')
                                                >= moment(new Date(), 'DD.MM.YYYY').format('DD.MM.YYYY')
                                            ) ? {} : { color: '#b0b0b0' }}
                                            className={styles.icon}
                                            icon={filteredItem.day === 'morning' ? faSun : faMoon} />
                                    </div>
                                    
                                ))
                            }
                        </div>
                        : <p style={{paddingLeft: '20px'}}>...</p>
                }
            </div>

        </div>

    )
}

export default Content