import { createMuiTheme } from '@material-ui/core';

const muiTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                fontSize: "16px",
                fontFamily: "Roboto, Calibri, Tahoma, Arial, sans-serif",
                margin: "0",
                padding: "0px 0",
                width: "100%",
                background: "none",
                textAlign: "left",
                color: "inherit",
            },
            inputTypeSearch: {
                fontSize: "18px",
                padding: "16px 0",
                marginTop: "-8px"
            },
            underline: {
                "&:before": {
                    borderBottom: "1px solid #003e65"
                }
            }
        },
        MuiButton: {
            root: {
                "display": "inline-block",
                "marginBottom": "0",
                "fontWeight": "400",
                "textAlign": "center",
                "verticalAlign": "middle",
                "touchAction": "manipulation",
                "cursor": "pointer",
                "backgroundImage": "none",
                "border": "1px solid transparent",
                "whiteSpace": "nowrap",
                "padding": "6px 12px",
                "fontSize": "15px",
                "lineHeight": "1.42857",
                "borderRadius": "2px",
                "WebkitUserSelect": "none",
                "MozUserSelect": "none",
                "MsUserSelect": "none",
                "userSelect": "none",
                "color": "#222",
                "backgroundColor": "#fff",
                "borderColor": "#ccc",
                "-webkit-transition-duration": "0.4s", /* Safari */
                "transition-duration": "0.4s",
                textTransform: "none",
                "&:hover": {
                    color: "#222",
                    textDecoration: "none",
                    borderColor: "#8c8c8c",
                    //borderColor: "red",
                    backgroundColor: "#e6e6e6",
                    //backgroundColor: "red",
                },
                "&:focus": {
                    color: "#222",
                    textDecoration: "none",
                    borderColor: "#8c8c8c",
                    backgroundColor: "#e6e6e6",
                },
                "&:active, &:focus": {
                    borderColor: "#adadad",
                },
                "&:active, &:hover": {
                    borderColor: "#adadad",
                }
            }
        },
        MuiCheckbox: {
            root: {
                color: "#003e65",
                '&:checked': {
                    border: "2px solid #1460aa",
                    background: "#1460aa url(\"/images/tick.svg?embed\")",
                },
                '&:focus': {
                    boxShadow: "0 0 0 8px rgba(0, 0, 0, .1)",
                    backgroundColor: "rgba(0, 0, 0, .1)"
                }
            }
        },
        MuiInputBase: {
            input: {
                padding: "6px 0 7px",
                "&:hover": {
                    backgroundColor: 'rgba(20,96,170,0.1)'
                }
            },
            inputSelect: {
                "&:inactive": {
                backgroundColor: 'red'
                }
            }
        },
        MuiInputLabel: {
            root: {
                //marginTop: "-14px"
            },
            shrink: {
                color: "#1460aa",
                fontSize: "18px"
            },
        },
        MuiFormLabel: {
            root: {
                "bottom": "0",
                "color": "#222",
                "fontSize": "14px",
                "left": "0",
                "right": "0",
                "pointerEvents": "none",
                "position": "absolute",
                "display": "block",
                "top": "28px",
                "width": "100%",
                "overflow": "hidden",
                "whiteSpace": "nowrap",
                "textAlign": "left",
                "&:focus": {
                    color: "#1460aa",
                    fontSize: "18px",
                }
            }
        },
        MuiFormControlLabel: {
            label: {
                "WebkitTapHighlightColor": "rgba(255, 255, 255, 0)",
                //"position":"relative",
                "fontSize": "14px",
                "zIndex": "1",
                "verticalAlign": "middle",
                "display": "inline-block",
                "boxSizing": "border-box",
                "width": "100%",
                //"height":"24px",
                "margin": "0", "padding": "0"
            }
        },
        // Selects
        MuiNativeSelect: {
            select: {
                "&:hover": {
                    backgroundColor: 'rgba(20,96,170,0.1)'
                }
            }
        },
        // Calendar - Date Picker .MuiPickersToolbar-toolbar
        /*MuiPickersToolbar: {
            toolbar: {
                //height: "20px",
                display: 'none',
            },
        },
        MuiInputAdornment: {
            positionEnd: {
                display: 'none'
            }
        },*/
        MuiPickersToolbarButton: {
            toolbarBtn: {
                border: 'none',
                background: 'none',
            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                color: "#fff",
                backgroundColor: '#00416A'
            },
            toolbarBtnSelected: {
                color: "#fff",
                backgroundColor: '#00416A' // primary color
            }
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                /*datepicker td .ui-state-active {
                    color: #1460aa !important;
                    font-weight: 600 !important;
                }
                ui-datepicker th
                */
                color: '#999',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
            }
        }
    },
    palette: {
        primary: {
            main: '#00416A'//'#1c2e4a'//"#1460aa",
        },
        secondary: {
            main: '#1460AA'//'#152238'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'FontAwesome',
            'Calibri',
            'Tahoma',
            'Arial',
            'sans-serif'
        ].join(','),
    }
});

export default muiTheme;