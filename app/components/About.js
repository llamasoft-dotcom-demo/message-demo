import React from 'react';
import { Panel } from 'react-bootstrap';
import styles from '../styles/styles.scss';


const About = () => {
    const notes = [
        '* a working example of a button that triggers a message-notification simulator.',
        '* it also has a text field (controlled component) connected to the Redux store.',
        '* ES6/7 Support with Babel.',
        '* jQuery was removed, and lodash is used instead of underscore.',
        '* bootstrap styling and components for quick implementation of appealing visuals.',
        '* a toaster/notification package compatible with Redux.',
        '* Redux dev tools to keep track of the app\'s state.',
        '* routing and deep linking.',
        '* hot module replacement (HMR) support so you can change modules or react components without having to reload the browser',
        '* a webpack production config so you can build the app and make it ready for production',
        '* sass and css module support that prevents style-bleeding due to hashing',
        '* autoprefixer package to automatically add the vendor prefixes and remove the unnecessary CSS styles',
        '* eslint to keep the code more readable',
        '* shrinkwrap is used to lock package versions to avoid potential package discrepancies in future.',
        '* immutable library was not used. I write pure functions and follow functional paradigm myself and don\'t need a library to do the job for me.',
        '* much more...'
    ];

    return (
        <div>
            <Panel header="About This Project">
                <h3>Applicant: Hamed Peikari</h3>
                <div className={styles.blockStyle}>
                    This is a random about page! Notice the route is working properly in the navbar. That is because react-router is used.
                    Thanks for your interest in my application. I look forward to being part of your team and beringing my skills to your company.
                </div>

                <div className={styles.blockStyle}>
                    <h4> How does the simulator engine work?</h4>
                    Because components render automatically as soon as there is a change to the state/props, the process of sending messages at random times was hard to achieve using normal react lifecycle hooks without sending the app into an infinite/dead loop. I figured this can be done by utilizing the new async/await feature of ES7 to make delays between each rendering. The async/await would work asynchronously with promises, but it's more readable as the code reads like a synchronous code. (Use of 'generator' functions with 'yield' could possibly be a better option). In a real life scenario a more mature setup is required or the data will be provided to the notification component differently.

                    <div className={styles.blockStyle}>
                        Implemention of the simulator wasn't the scope of the excercise, and hence I didn't spend much time on it. Please note that there will be two seconds delay before the simulation engine kicks in.
                    </div>

                    <h4 className={styles.blockStyle}>
                        This project is created using a react, redux, and react-router with the help of webpack:
                    </h4>
                    {
                        notes.map( (note, indx) =>
                            <div key={indx}> { note } </div>
                        )
                    }
                </div>
            </Panel>
        </div>
    );
};

export default About;
