import EStyleSheet from "react-native-extended-stylesheet";

const styleHome = EStyleSheet.create({
    $widthSize: 70,
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
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '$widthSize'
    },
    heightHeader: {
        height: '$widthSize',
    },
    box: {
        borderWidth: 1,
        borderColor: '#e3e3e3'
    },
    borderBottom:{
        borderBottomWidth:1,
        borderColor:'#e3e3e3'
    },
    borderTop:{
        borderTopWidth:1,
        borderColor:'#e3e3e3'
    },
    borderRight:{
        borderRightWidth:1,
        borderColor:'#e3e3e3'
    },
    borderLeft:{
        borderLeftWidth:1,
        borderColor:'#e3e3e3'
    },
    paddingModal: {
        padding: '$widthSize'
    }
    , boxTitle: {
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    boxPadding:{
        padding:15
    },
    itemHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderButtonCustomAmount: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    textCenterOfTheBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItem: {paddingVertical: 20}
});

export default styleHome;