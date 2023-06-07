import '../../../App.css';
import Content from './Content'
import styles from './style.module.css';



function Card({ title, items, today, cab, user }) {

    return (

        <div>
            {
                items.length
                    ? < div className={styles.card}>
                        <div className={styles.blocks}>
                            <h1>{title}</h1>
                            <div className={styles.row}>

                                <Content title={title} items={items} today={today} cab={cab} user={user}></Content>

                            </div>

                        </div>
                        {/* <div>
                            <p className={styles.total}>Всего: </p>
                        </div> */}
                    </div>
                    : <div className={styles.row}>
                        <span>Смен нет</span>
                    </div>
            }
        </div>

    )
}

export default Card