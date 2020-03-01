import React, { Component, Fragment } from 'react';
import styles from './styles/Register';
import { Grid, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Button from '../components/ui/Button';
import { updateObject, checkFieldValidity } from '../shared/utility';

class Registration extends Component {
    //
    state = {
        regForm: {
            username: {
                elementConfig: {
                    type: 'text',
                    label: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 15
                },
                validLabel: 'a Username',
                valid: false,
                valueUpdated: false,
                validationErrorMessage: ''
            },
            email: {
                elementConfig: {
                    type: 'text',
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                validLabel: 'an Email',
                valid: false,
                valueUpdated: false,
                validationErrorMessage: ''
            },
            password: {
                elementConfig: {
                    type: 'password',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                validLabel: 'a Password',
                valid: false,
                valueUpdated: false,
                validationErrorMessage: ''
            },
            confirm: {
                elementConfig: {
                    type: 'password',
                    label: 'Confirm Password'
                },
                value: '',
                validation: {
                    match: {
                        message: "Re-enter your password confirmation so it matches your password."
                    },
                    required: true,
                },
                validLabel: 'a Password',
                valid: false,
                valueUpdated: false,
                validationErrorMessage: ''
            },
        },
        formIsValid: false,
    }

    inputBlurHandler = (inputIdentifier, event) => {
        //
        const updatedFormElement = updateObject(this.state.regForm[inputIdentifier], {
            valueUpdated: true
        });

        const updatedRegForm = updateObject(this.state.regForm, {
            [inputIdentifier]: updatedFormElement
        })

        this.setState({
            regForm: updatedRegForm,
        });
    }

    inputChangedHandler = (inputIdentifier, event) => {
        //
        const value = event.target.value;
        let matcher = null;

        if (inputIdentifier === 'confirm') {
            // validate match between password and confirm
            matcher = this.state.regForm['password'].value;
        }

        const validity = checkFieldValidity(value, this.state.regForm[inputIdentifier].validation, this.state.regForm[inputIdentifier].validLabel, matcher);

        //console.log("New Value:", value, validity);
        const updatedFormElement = updateObject(this.state.regForm[inputIdentifier], {
            value: event.target.value,
            valid: validity.valid,
            validationErrorMessage: validity.errorMessage,
            //valueUpdated: true
        });

        const updatedRegForm = updateObject(this.state.regForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;

        for (let inputId in updatedRegForm) {
            if (updatedRegForm[inputId].validation) {
                formIsValid &= updatedRegForm[inputId].valid;
            }
        }

        this.setState({
            regForm: updatedRegForm,
            formIsValid: formIsValid
        });
    }

    register = () => {
        // go to completed page!
        this.props.history.push('/completed');
    }

    createInputField(id, config) {
        //
        return <input 
                id={id} 
                {...config} 
                value={this.state.regForm[id].value} 
                className={this.props.classes.input} 
                onChange={(e) => this.inputChangedHandler(id, e)}
                onBlur={(e) => this.inputBlurHandler(id, e)} />
    }

    render() {
        //
        //console.log("Form is valid? ", this.state.formIsValid);
        const { classes } = this.props;
        const formElementsArray = [];

        for (let key in this.state.regForm) {
            formElementsArray.push({
                id: key,
                config: this.state.regForm[key]
            })
        }

        let form =
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Grid key={formElement.id} item>
                        <Grid className={classes.inputLabel}>
                            {formElement.config.elementConfig.label}
                        </Grid>
                        <Grid>
                            {this.createInputField(formElement.id, formElement.config.elementConfig)}
                        </Grid>
                        <Grid className={classes.inputError}>
                            {this.state.regForm[formElement.id].valueUpdated ? this.state.regForm[formElement.id].validationErrorMessage : ''}
                        </Grid>
                    </Grid>
                ))}
            </form>

        return (
            <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
                <Grid container justify='flex-start' direction='column' className={classes.inputContainer}>
                    Create your FSCC Account:<br /><br /><br />
                    {form}
                    <Grid item>
                        <Button id='submitRegistration' disabled={!this.state.formIsValid} onClick={this.register} className={classes.button}>CREATE YOUR FSCC ACCOUNT</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default  withRouter(withStyles(styles, { withTheme: true })(Registration));