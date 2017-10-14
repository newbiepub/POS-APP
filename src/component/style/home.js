import EStyleSheet from "react-native-extended-stylesheet";

const styleHome = EStyleSheet.create({
    homeWrapper: {
        paddingVertical: 15
    },
    main: {
        flex: 0.7
    },
    sidebar: {
        flex: 0.3
    },
    footer: {
        height: 54,
        backgroundColor: "#444",
        shadowColor: "#222",
        shadowOffset: {
            width: 2, height: 2
        },
        shadowOpacity: 0,
        shadowRadius: 2
    }
});

export default styleHome;