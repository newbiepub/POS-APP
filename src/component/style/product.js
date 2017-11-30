import EStyleSheet from "react-native-extended-stylesheet";

const styleProduct = EStyleSheet.create({
    productItem: {
        height: 140,
        width: 140,
        borderRadius: 15,
        margin:10,
        backgroundColor: "#999"
    },
    productName:{
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
    },
    productWrapper: {
        padding: 15
    },
    addItemButton: {
        height: 140,
        width: 140,
        borderRadius: 15,
        backgroundColor: "#444"
    }
});

export default styleProduct;