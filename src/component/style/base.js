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
    },
    font14: {
        fontSize: 14
    },
    font16: {
        fontSize: 16
    },
    font18: {
        fontSize: 18
    },
    font26: {
        fontSize: 26
    },
    '@media (min-width: 768) and (max-width: 1024)': {

        font14: {
            fontSize: 18
        },
        font16: {
            fontSize: 20
        },
        font18: {
            fontSize: 22
        },
        font26: {
            fontSize: 30
        },
    },
    '@media (min-width: 1024)': {
        font14: {
            fontSize: 20
        },
        font16: {
            fontSize: 25
        },
        font18: {
            fontSize: 30
        },
        font26: {
            fontSize: 35
        },
    }
});

export default styles;