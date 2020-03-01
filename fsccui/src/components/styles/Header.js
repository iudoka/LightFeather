const styles = theme => ({
    root: {
        flex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '8px',
        width: '100%',
        backgroundColor: '#008cdd',
        color: '#FFF',
        borderBottom: '1 solid #ddd',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: '700',
        fontFamily: [
            'Roboto',
            'FontAwesome',
            'Calibri',
            'Tahoma',
            'Arial',
            'sans-serif'
        ].join(',')
    },
});

export default styles;