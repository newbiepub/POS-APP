import EStyleSheet from "react-native-extended-stylesheet";

const styleHome = EStyleSheet.create({
    colorWhenNull: {
        color: '#e5e5e5'
    },
    paddingContent: {
        paddingHorizontal: 10,
    },
    vectorBackBTN: {
        fontSize: 26,
       //lineHeight:0
    },
    itemHeight: {
        height: 60
    },
    backgroundIconWidth:{
        width:60,
    },
    '@media (min-width: 768) and (max-width: 1024)': {
        vectorBackBTN: {
            fontSize: 30,
            //lineHeight:0
        },
    },
    '@media (min-width: 1024)': {
        vectorBackBTN: {
            fontSize: 35,
           //lineHeight:0
        },
    },

});

export default styleHome;