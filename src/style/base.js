import EStyleSheet from "react-native-extended-stylesheet";
import {Dimensions} from 'react-native';

let {width} = Dimensions.get('window');
let xs = 5, sm = 10, md = 20, lg = 30, xl = 50;
export const constantStyle = {
        headerHeight: 65,
        sizeLarge: width > 1024 ? 46 : width > 768 ? 35 : 20,
        sizeSmall: width > 1024 ? 18 : width > 768 ? 16 : 14,
        sizeNormal: width > 1024 ? 40 : width = 768 ? 30 : 16,
        "$sm": 10,
        "$md": 20,
        "$lg": 30,
        //BLue
        color1: '#8593ae',//'#9398a0' 336B87 375e97
//    white
        color2: '#fff',
        colorBackground: '#E9EBEE',
        //    gray
        colorBorder: 'gray',
        paddingVerticalSmall: sm,
        paddingHorizontal: md,
        paddingGridItem: sm,
        sm: sm,
        md, lg, xl,xs,
        marginVerticalSmall:
        sm,
        marginVerticalNormal:
        md,
        marginVerticalLarge:
        lg,
//    listItemHeight
        listItemHeight:
            70
    }
;

var Style = EStyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    "$sizeLarge": 20,
    "$sizeNormal": 16,
    "$sizeSmall": 14,
    fontLarge: {
        fontSize: "$sizeLarge"
    },
    fontNormal: {
        fontSize: "$sizeNormal"
    },
    fontSmall: {
        fontSize: "$sizeSmall"
    },

    '@media (min-width: 768) and (max-width: 1024)': {
        "$sizeLarge": 35,
        "$sizeNormal": 2,
        "$sizeSmall": 16,
    },
    '@media (min-width: 1024)': {
        "$sizeLarge": 46,
        "$sizeNormal": 30,
        "$sizeSmall": 18,
    }
});
export default Style;