const styles = theme => {
    return {
        root: {
            position: 'relative',
            marginBottom: '8px',
        },
        accordionDiv: {
            //border: '1px solid rgba(0, 0, 0, 0.12)'
            backgroundColor: 'gray'
        },
        title: {
            fontWeight: 700,
            fontSize: '14px',
            color: '#000000', 
            marginLeft: '0px'
        },
        elevationPanel: {
            backgroundColor: "inherit",
            margin: 0,
            padding: 0,
            border: 0,
            boxShadow: "none",
            "-webkit-box-shadow": "none",
            "-moz-box-shadow": "none"
        },
        summaryDiv: {
            border: '1px solid #333333',
            backgroundColor: '#F2F2F2',
        },
        details: {
            padding: 0, 
            margin: 0
        },
        content: {
            display: 'inline-block',
            flexBasis: '100%',
            //width: "100%",
            padding: 32,
            margin: 0
        }
    }
}
export default styles;