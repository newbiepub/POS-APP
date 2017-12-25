import EStyleSheet from "react-native-extended-stylesheet";

const styleSetting = EStyleSheet.create({
    sectionItem: {
        padding: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#e5e5e5"
    },
    activeSection: {
        backgroundColor: "#000",
        borderWidth: 0
    },
    activeText: {
        color: "#e5e5e5"
    },
    logoutButton: {
        paddingHorizontal: 40,
        marginHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d64242"
    },
    taxList: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    taxHistory:{
        padding:20
    },
    addTaxButton: {
        paddingVertical: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#999",
        backgroundColor: "#f9f9f9"
    }
});

export default styleSetting;