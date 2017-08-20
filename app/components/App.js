import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/styles.scss';
import Routes from '../routes';
import Simulator from './Simulator';
import { Panel } from 'react-bootstrap';


const App = () => (
    <div className={styles.mainWrapper}>

        <header className={styles.headerWrapper}>
            <div className={styles.logo}>LLamasoft Message Exercise</div>
            <div className={styles.slogan}>Supply Chain By Design</div>
        </header>

        <main className={styles.contentWrapper}>

            <h4 className={styles.blockStyle}>Developer: Hamed Peikari</h4>
            <div className={styles.blockStyle}>
                The simulation engine is implemented using async/await feature of ES7.
            </div>

            <div>
                There will be two seconds delay before the simulation engine kicks in and displays the notifications for the first time. After that, notification toasts will be generated at random times.
            </div>

            <div className={styles.blockStyle}>
                Notifications will be removed from the redux-store after 3 seconds.
            </div>

            <Simulator />

            {
                // here we render the inner pages and routes.
                Routes
            }

            <div className={styles.devTools}>
                <Panel header={'Dev Tools Settings'} bsStyle="info">
                    <div>Toggle Visibility Key = ctrl + h</div>
                    <div>Change Position Key = ctrl + w</div>
                </Panel>
            </div>
        </main>

        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link to="/">Home Page</Link> | <Link to="/about">About Page</Link> | <Link to="/excercise">Excercise Page</Link>
            </div>
            <span className={styles.copyRight}>&copy; LLamasoft 2017</span>
        </footer>
    </div>
);

export default App;
