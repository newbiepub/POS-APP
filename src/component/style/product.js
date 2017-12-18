import EStyleSheet from "react-native-extended-stylesheet";


const styleProduct = EStyleSheet.create({
    productItem: {
        borderRadius: 15,
        margin: 10,
        backgroundColor: "#999",
        height: 180,
        width: 180
    },
    productName: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    productWrapper: {
        padding: 15
    },
    addItemButton: {
        height: 140,
        width: 140,
        borderRadius: 15,
        backgroundColor: "#444"
    },
    swiperDeleteButton: {backgroundColor: "#D64242", height: 70, width: 70},
    chooseTypeDiscount: {
        width: 50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'#444',
        borderRadius:5
    }
});

export default styleProduct;