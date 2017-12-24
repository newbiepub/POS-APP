import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

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
    posItem: {
        width: Dimensions.get('window').width / 3 - 20,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
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