import React from 'react';
import styles from './styles/Footer.js';
import { withStyles } from '@material-ui/core';

const footer = (props) => {

    const { classes } = props;
    return (
        <div className={classes.root}>
        </div>
    );

}

export default withStyles(styles, { withTheme: true })(footer);