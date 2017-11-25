import EStyleSheet from "react-native-extended-stylesheet";

const styleHome = EStyleSheet.create({
    $widthSize: 70,
    $marginTopInModalEachItem: 40,
    $font16: 16,
    $color1: '#f4ad42',
    $color2: "#6893d8",
    $color4: '#ffffff',
    $color6: '#a3a3a3',
    $color5: '#e5e5e5',
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
    boxTitle: {
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    boxPadding: {
        padding: 15
    },
    //-------------------------------
    header: {
        flexDirection: 'row',
        backgroundColor: '#a3a3a3',
        height: '$widthSize',
        alignItems: 'center'
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '$widthSize',
        height: '$widthSize'
    },
    box: {
        borderWidth: 1,
        borderColor: '#e3e3e3'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#e3e3e3'
    },
    borderTop: {
        borderTopWidth: 1,
        borderColor: '#e3e3e3'
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#e3e3e3'
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderColor: '#e3e3e3'
    },
    paddingModal: {
        padding: '$widthSize'
    },
    itemHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '$widthSize'
    },
    menuItem: {
        paddingVertical: 20
    },
    borderRadioButton: {
        borderRadius: 50,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: 'black'
    },
    checkedRadioButton: {
        borderRadius: 50,
        width: 20,
        height: 20
    },
    listItem: {
        marginTop: "$widthSize",
    },
    //POS--------------------
    titleBar: {
        height: '$widthSize',
        flexDirection: 'row',
        backgroundColor: '$color4',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        paddingHorizontal: 15,
        alignItems: "center"
    },
    titleBarIconBack: {
        fontSize: '$font16',
        height: 10,
    },
    buttonCharge: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '$widthSize',
        backgroundColor: '$color1'
    },
//    Modal
    modalHeader: {
        flexDirection: 'row',
        backgroundColor: "$color4",
        height: '$widthSize',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    modalButtonSubmit: {
        height: '$widthSize',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '$color2'
    },
    modalButtonSubmitFont: {
        color: "$color4"
    },
//    transaction
    transactionSearch:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:5
    },
    transactionSearchText:{
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: '$color4',
        flex: 1
    },
    listTransactionHeader: {
        paddingHorizontal: 10,
        backgroundColor: '$color5',
        paddingVertical: 10
    },
    listTransactionItem: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '$color4',
        height: '$widthSize',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    listTransactionItemTitle: {
        flex: 1,
        paddingHorizontal:10,
        height:'$widthSize',
        justifyContent:'center'
    },
    listTransactionItemIcon:{
        fontSize: '$font16',
        height: 16,
    },
//    product
    categoryBar: {
        height: '$widthSize',
        flexDirection: 'row',
        backgroundColor: '$color4',
        alignItems: 'center'
    },
    itemBar: {
        height: '$widthSize',
        flexDirection: 'row',
        backgroundColor: '$color4',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',

    },
    itemBarIcon: {
        backgroundColor: '$color2',
        justifyContent: 'center',
        alignItems: 'center',
        width: '$widthSize'
    },
    itemBarTitle: {
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '$color4',
        flex: 1
    },
    buttonDelete: {
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: '$marginTopInModalEachItem'
    },
    itemIcon: {
        height: '$widthSize',
        width: '$widthSize',
        backgroundColor: '$color2'
    },
    modalItem: {
        marginTop: "$marginTopInModalEachItem"
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {
        $font16: 30,
        titleBarIconBack: {
            fontSize: '$font16',
            height: 24,
        },
        listTransactionItemIcon:{
            fontSize: '$font16',
            height: 30,
        },
    },
    '@media (min-width: 1024)': {
        $font16: 40,
        titleBarIconBack: {
            fontSize: '$font16',
            height: 30,
        },
        listTransactionItemIcon:{
            fontSize: '$font16',
            height: 40,
        },
    }
});

export default styleHome;