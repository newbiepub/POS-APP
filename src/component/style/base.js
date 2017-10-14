import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    fillParent: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    whiteBackground: {
        backgroundColor: "#fff"
    },
    grow: {
        flexGrow: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    centerVertical: {
        justifyContent: "center"
    },
    centerHorizontal: {
        alignItems: "center"
    }
});

export default styles;