const styles = theme => ({
    root: {
        marginTop: '80px',
        backgroundColor: '#FFFFFF',
        height: '80vh',
        fontFamily: [
            'Roboto',
            'FontAwesome',
            'Calibri',
            'Tahoma',
            'Arial',
            'sans-serif'
        ].join(',')
    },
    inputContainer: {
        width: '460px',
        padding: '20px',
        backgroundColor: '#f7fafc'
    },
    inputLabel: {
        fontSize: '14px',
        fontWeight: '700'
    },
    input: {
        padding: '8px',
        marginTop: '8px',
        width: '400px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    inputError: {
        color: 'red',
        fontSize: '12px',
        fontWeight: '400',
        marginBottom: '20px',
    },
    button: {
        padding: '8px',
        paddingTop: '12px',
        paddingBottom: '12px',
        backgroundColor: '#008cdd',
        width: '420px',
        border: '1px solid #008cdd',
        borderRadius: '2px',
        color: '#FFF',
        cursor: 'pointer',
        '&:disabled': {
            cursor: 'auto',
            color: '#ddd'
        }
    },
})

export default styles;