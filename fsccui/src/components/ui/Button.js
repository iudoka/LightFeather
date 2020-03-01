import React from 'react';
import styles from './styles/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const button = ({ id, children, ...rest }) => {

    return <button id={id} {...rest}>{children}</button>
}

button.propTypes = {
    id: PropTypes.string.isRequired,
}

export default withStyles(styles)(button);