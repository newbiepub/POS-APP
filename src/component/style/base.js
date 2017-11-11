import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({

    // Orange
    color1: {
        color: '#f4ad42'
    },
    background1: {
        backgroundColor: '#f4ad42'
    },

    //Blue
    color2: {
        color: '#6893d8'
    },
    background2: {
        backgroundColor: '#6893d8'
    },
    //Black
    color3: {
        color: '#2d2b2b'
    },
    background3: {
        backgroundColor: '#2d2b2b'
    },
    //White
    color4: {
        color: '#ffffff'
    },
    background4: {
        backgroundColor: '#ffffff'
    },
    //gray
    color5: {
        color: '#e5e5e5'
    },
    background5: {
        backgroundColor: '#e5e5e5'
    },
    //lightPurple
    color6: {
        color: '#777791'
    },
    background6: {
        backgroundColor: '#5e5e87'
    },
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
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    vector14: {
        fontSize: 14,
    },
    vector16: {
        fontSize: 16,
    },
    vector18: {
        fontSize: 18,

    },
    vector26: {
        fontSize: 26,
    },
    vector32: {
        fontSize: 32,
    },
    vector100: {
        fontSize: 100,
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
        fontSize: 26,

    },
    font32: {
        fontSize: 32
    },
    text4: {
        color: "#444"
    },
    textE5: {
        color: "#e5e5e5"
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
            fontSize: 30,

        },
        font32: {
            fontSize: 42
        },

        vector14: {
            fontSize: 18,
        },
        vector16: {
            fontSize: 20,
        },
        vector18: {
            fontSize: 22,

        },
        vector26: {
            fontSize: 30,
        },
        vector32: {
            fontSize: 42,
        },
        vector100: {
            fontSize: 120,
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
            fontSize: 35,

        },
        font32: {
            fontSize: 49
        },
        vector14: {
            fontSize: 20,
        },
        vector16: {
            fontSize: 20,
        },
        vector18: {
            fontSize: 30,

        },
        vector26: {
            fontSize: 35,
        },
        vector32: {
            fontSize: 49,
        },
        vector100: {
            fontSize: 150,
        },
    }
});

export default styles;