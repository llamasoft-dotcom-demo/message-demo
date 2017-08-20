import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import {toastr} from 'react-redux-toastr';
import { clickMessageButton } from '../actions';
import _ from 'lodash';
import Notif from '../components/Notif';
import { Button, Alert } from 'react-bootstrap';

import styles from '../styles/styles.scss';

let loopHandle1 = null;
let loopHandle2 = null;

const quotes = [
    'What we\'ve got here is failure to communicate.',
    'Go ahead, make my day.',
    'I\'ve got a bad feeling about this.',
    'I don\'t know half of you half as well as I should like; and I like less than half of you half as well as you deserve.',
    'I find your lack of faith disturbing.',
    'You\'re gonna need a bigger boat.',
    'Tell Mike it was only business.',
    'I have come here to chew bubble gum and kick ass, and I\'m all out of bubble gum.',
    'Messages should appear near the top of the page!',
    'Messages should fade out after 3 seconds!',
    'If a new message appears before the previous message fades out, it should appear below the most recent visible message.',
    'Messages should have a close or delete box to dismiss the message before the fade out!',
    'jQuery is removed, and Lodash used instead of underscore!'
];


class Home extends React.Component {
    static propTypes = {
        homeState: PropTypes.shape({
            buttonText: PropTypes.string,
            sendMessage: PropTypes.boolean
        }),
        actions: PropTypes.shape({
            onButtonClick: PropTypes.func
        })
    };


    randomDelay(ms) {
        return new Promise(resolve => {loopHandle2 = setTimeout(resolve, ms);}); // eslint-disable-line
    }

    async simulate() {
        const rand = Math.round(Math.random() * (3000 - 500)) + 500;

        await this.randomDelay(rand);

        if (this.props.homeState.sendMessage) {
            const quote = _.sample(quotes);

            const toastrType = _.sample(['success', 'info', 'warning', 'error']);

            const toastrOptions = {
                timeOut: 3000,
                icon: toastrType,
                status: toastrType,
                component: (
                    <Notif
                        quote={quote}
                    />
                )
            };

            switch (toastrType) {
                case 'warning':
                    toastr.warning(toastrType, '', toastrOptions);
                    break;
                case 'info':
                    toastr.info(toastrType, '', toastrOptions);
                    break;
                case 'success':
                    toastr.success(toastrType, '', toastrOptions);
                    break;
                default:
                    toastr.error(toastrType, '', toastrOptions);
            }
        }

        return;
    }


    async initSimulator() {
        const {
            homeState
        } = this.props;

        clearTimeout(loopHandle1);

        while(homeState.sendMessage) {
            if (homeState.sendMessage) {
                await this.simulate();
                clearTimeout(loopHandle2);
            }
        }
    }


    async handleClick(e) {
        this.props.actions.onButtonClick(e);

        // Waiting 1 second to avoid racing issue.
        // In real life, we get the notif data from a server, or otherwise a more complex setup is required.
        // Either way, it's not in the scope of this excercise.
        loopHandle1 = setTimeout(() => this.initSimulator(), 1000);
    }

    render() {
        const {
            homeState
        } = this.props;

        const bootStrapStyle = homeState.sendMessage ? 'danger' : 'success';

        return (
            <div>
                <ReduxToastr
                    newestOnTop={false}
                    position="top-left"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                />

                <Button
                    className={styles.msgButton}
                    bsStyle={bootStrapStyle}
                    value={homeState.buttonText}
                    onClick={(e) => this.handleClick(e)}
                >
                    {homeState.buttonText} Messages
                </Button>

                <Alert bsStyle={bootStrapStyle} className={styles.alertBox}>
                    <div><strong>The button text: </strong> {homeState.buttonText} Messages </div>
                    <div><strong>The status of simulator: </strong> { homeState.sendMessage ? 'Sending...' : 'Not sending...' } </div>
                </Alert>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        homeState: state.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onButtonClick: e => dispatch(clickMessageButton(e.target.value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
