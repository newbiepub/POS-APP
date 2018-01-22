import EStyleSheet from "react-native-extended-stylesheet";
import {Dimensions} from 'react-native';
let {width} = Dimensions.get('window');
export const constantStyle = {
    headerHeight: 65,
    sizeSmall: width >1024 ? 18 : width > 768 ? 16 : 14 ,
    sizeNormal: width >1024 ? 20 : width > 768 ? 18 : 16 ,
    sizeLarge: width >1024 ? 34 : width > 768 ? 20 : 18 ,
    //BLue
    color1: '#6893d8',
//    white
    color2: '#fff',
    colorBackground: '#E9EBEE',
    //    gray
    colorBorder:'gray',
};

var Style = EStyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    }
});
export default Style;