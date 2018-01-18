import EStyleSheet from "react-native-extended-stylesheet";

const styleBase = EStyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    alignCenter: {
        alignItems: "center"
    },
    container: {
        flex: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    },
    borderButton: {
        borderRadius: 4
    },
    shadowBox: {
        shadowColor: "#e5e5e5",
        shadowOffset: {
            width: 0.5,
            height: 1
        },
        elevation: 2,
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    bgE5: {
        backgroundColor: "#e5e5e5"
    },
    bgWhite: {
        backgroundColor: "#fff"
    },
    bgBlack: {
        backgroundColor: "#000"
    },
    noBg: {
        backgroundColor: "transparent"
    }
});

export default styleBase;