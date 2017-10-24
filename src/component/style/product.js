import EStyleSheet from "react-native-extended-stylesheet";

const styleProduct = EStyleSheet.create({
    productItem: {
        height: 100,
        width: 100,
        borderRadius: 15,
        backgroundColor: "#999"
    },
    productWrapper: {
        padding: 15
    },
    addItemButton: {
        height: 100,
        width: 100,
        borderRadius: 15,
        backgroundColor: "#444"
    }
});

export default styleProduct;