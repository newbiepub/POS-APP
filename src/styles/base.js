import EStyleSheet from "react-native-extended-stylesheet";

const styleBase = EStyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    fullHeight: {
        height: "100%"
    },
    height80: {
        height: "80%"
    },
    height70: {
        height: '70%'
    },
    width50: {
        height: "50%"
    },
    height50: {
        height: "50%"
    },
    width30: {
        height: "30%"
    },
    height30: {
        height: "30%"
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
    divider: {
        height: 1,
        borderColor: "#e5e5e5",
        borderWidth: 1,
    },
    column: {
        flexDirection: "column"
    },
    nav: {
        height: 60,
        backgroundColor: "#fff"
    },
    fillParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    textInput: {
        height: 40
    },
    fontRubik: {
        fontFamily: 'Rubik',
        color: "#444"
    },
    grow: {
        flexGrow: 1
    },
    borderButton: {
        borderRadius: 4
    },
    textWhite: {
        color: "#fff"
    },
    text4: {
        color: "#444"
    },
    imgLargeTile: {
        height: "20%",
        width: "20%"
    },
    fontBold: {
        fontWeight: "600"
    },
    shadowBox: {
        elevation: 2,
        shadowColor: "#e5e5e5",
        shadowOffset: {
            width: 0.5,
            height: 1.5
        },
        backgroundColor: "#fff",
        shadowOpacity: 0.9,
        shadowRadius: 1.5,
        borderBottomWidth: 0,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 5
    },
    colorInput: {
        color: "#55db55"
    },
    panelHeader: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5"
    },
    card: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#e5e5e5",
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    title: {
        fontSize: '1.1rem'
    },
    normalText: {
        fontSize: '1rem'
    },
    bgE5: {
        backgroundColor: "#e5e5e5"
    },
    bgWhite: {
        backgroundColor: "#fff"
    },
    bgWhiteTransparent: {
        backgroundColor: 'rgba(255,255,255,0.9)'
    },
    bgBlack: {
        backgroundColor: "#000"
    },
    noBg: {
        backgroundColor: "transparent"
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    /* Gutters */
    p_sm_top: {
        paddingTop: 5
    },
    p_sm_left: {
        paddingLeft: 5
    },
    p_sm_right: {
        paddingRight: 5
    },
    p_sm_bottom: {
        paddingBottom: 5
    },
    p_sm_vertical: {
        paddingVertical: 5
    },
    p_sm_horizontal: {
        paddingHorizontal: 5
    },
    m_sm_top: {
        marginTop: 5
    },
    m_sm_left: {
        marginLeft: 5
    },
    m_sm_right: {
        marginRight: 5
    },
    m_sm_bottom: {
        marginBottom: 5
    },
    m_sm_vertical: {
        marginVertical: 5
    },
    m_sm_horizontal: {
        marginHorizontal: 5
    },
    // Padding md
    p_md_top: {
        paddingTop: 15
    },
    p_md_left: {
        paddingLeft: 15
    },
    p_md_right: {
        paddingRight: 15
    },
    p_md_bottom: {
        paddingBottom: 15
    },
    p_md_vertical: {
        paddingVertical: 15
    },
    p_md_horizontal: {
        paddingHorizontal: 15
    },
    // Gutter md
    m_md_top: {
        marginTop: 15
    },
    m_md_left: {
        marginLeft: 15
    },
    m_md_right: {
        marginRight: 15
    },
    m_md_bottom: {
        marginBottom: 15
    },
    m_md_vertical: {
        marginVertical: 15
    },
    m_md_horizontal: {
        marginHorizontal: 15
    },

    // Gutter LG
    m_lg_top: {
        marginTop: 30
    },
    p_lg_top: {
        paddingTop: 30
    },
    p_lg_right: {
        paddingRight: 30
    },
    m_lg_right: {
        marginRight: 30
    },
    p_lg_vertical: {
        paddingVertical: 30
    },
    m_lg_vertical: {
        marginVertical: 30
    },
    p_lg_horizontal: {
        paddingHorizontal: 30
    },
    m_lg_horizontal: {
        marginHorizontal: 30
    },

    //Gutter XL
    m_xl_top: {
        marginTop: 45
    },
    m_xl_bottom: {
        marginBottom: 45
    },
    m_xl_horizontal: {
        marginHorizontal: 45
    },
    m_xl_vertical: {
        marginVertical: 45
    },
    p_xl_top: {
        paddingTop: 45
    },
    p_xl_bottom: {
        paddingBottom: 45
    },
    p_xl_horizontal: {
        paddingHorizontal: 45
    },
    p_xl_vertical: {
        paddingVertical: 45
    }
});

export default styleBase;