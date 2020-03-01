export const STYLES_DisplayField = {

    "card": {
        text: {
            marginBottom: "0px",
            height: "21px",
            fontSize: "11px",
            textOverflow: "ellipsis",
            overflow:"hidden",
            whiteSpace: "nowrap",
        },
        textValue : {
            fontWeight: "400",
            padding: 0,
        },
        textIndicator : {
            fontSize: "100%",
            padding: "1px 3px 1px 3px",
            fontWeight: 700,
            verticalAlign:  "middle",
        },
        textLabel: {
            fontWeight: "700",
        },
    },

    quickView: {
        fieldContainer: {
            width: "100%",
            padding: ".5em 0 .5em",
            textAlign: "center",
            borderBottom: ".5px solid rgba(0, 0, 0, 0.12)",
        },
        text: {
            marginBottom: "0px",
            height: "21px",
            fontSize: "11px",
            //textOverflow: "ellipsis",
            overflow:"hidden",
            whiteSpace: "nowrap",
        },
        textValue : {
            fontWeight: "400",
            padding: 0,
            margin: 0,
        },
        textIndicator : {
            fontSize: "100%",
            padding: "1px 3px 1px 3px",
            fontWeight: 700,
            verticalAlign:  "middle",
        },
        labelContainer: {
            paddingRight: "1em",
            flexGrow: .5,
            textAlign: "right",
        },
        textLabel: {
            fontWeight: "700",
        },
    },

}

export const styles = (purpose, theme) => {
    return STYLES_DisplayField[purpose];
}

export default styles;