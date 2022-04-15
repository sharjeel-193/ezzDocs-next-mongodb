
const MuiSwitch = {
    switchBase: {
        // color: "#d43226"
        color: 'red'
        
    },
    colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
        //   color: "#53aa6c"
        color: 'green'
        }
    },
    track: {
        backgroundColor: 'red',
        opacity: 0.2,
        '$checked$checked + &':{
            backgroundColor: 'green'
        }

    }
}

export default MuiSwitch

