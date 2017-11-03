import EStyleSheet from "react-native-extended-stylesheet";

const styleHome = EStyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
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
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#a3a3a3',
        padding: 0
    },
    iconHeader: {
        fontSize: 30,
        color: 'white',
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70
    },
    heightHeader: {
        height: 70,
    },
    backgroundOnSelectedItem: {
        backgroundColor: 'rgb(104, 147, 216)'
    },
    box: {
        borderWidth: 1,
        borderColor: '#e3e3e3'
    },
    boxTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        alignItems: 'center',
        paddingHorizontal: 30,
        flexDirection:'row',
        backgroundColor:'white'
    },
    itemHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderButtonCustomAmount:{
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    textCenterOfTheBox:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItem: {paddingVertical: 20}
});

export default styleHome;