import React from 'react';
import styles from './styles/Header';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const header = (props) => {
    //
    return (
        <div className={props.classes.root}>
            {props.appName}
        </div>
    );
}

header.propTypes = {
    appName: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(header);
