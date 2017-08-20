import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onTextInputChange } from '../actions';
import { FormControl } from 'react-bootstrap';

import styles from '../styles/styles.scss';

class Home extends React.Component {
    static propTypes = {
        homeState: PropTypes.shape({
            textFieldValue: PropTypes.string
        }),
        actions: PropTypes.shape({
            onTextEntered: PropTypes.func
        })
    };

    onChange(e) {
        this.props.actions.onTextEntered(e);
    }

    render() {
        const { homeState } = this.props;

        return (
            <div>
                <form className={styles.formStyles}>
                    <div className={styles.descText}>Working with this form demonstrates that notifications are not disruptive to the user work flow.</div>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                        value={homeState.textFieldValue || ''}
                        onChange={(e) => this.onChange(e)}
                    />
                </form>

                {
                    homeState.textFieldValue &&
                    <div className={styles.textOutput}>
                        <div><strong>This is the text you entered in the field: </strong></div>
                        <div>{homeState.textFieldValue}</div>
                    </div>
                }
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
            onTextEntered: e => dispatch(onTextInputChange(e.target.value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
