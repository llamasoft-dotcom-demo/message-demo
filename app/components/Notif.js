/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

const Notif = ({
    quote
}) => (
    <div>
        <span>{quote}</span>
    </div>
);

Notif.PropTypes = {
    quote: PropTypes.string
};

export default Notif;
