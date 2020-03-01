import React from 'react';
import styles from './styles/TextField'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import { emptyIfNull } from '../../shared/utility';

const TextField = React.forwardRef(({handler, id, value, label, error, inputProps, ...restProps}, ref) => {
    //
    return (
        <MuiTextField
            inputRef={ref}
            id={id}
            error={error}
            value={emptyIfNull(value)}
            label={label}
            onChange={handler}
            inputProps={{ ...inputProps }}
            {...restProps}
        />
    );
});

TextField.defaultProps = {
    disabled: false
}

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    handler: PropTypes.any.isRequired,
    error: PropTypes.bool,
}

export default withStyles(styles)(TextField);