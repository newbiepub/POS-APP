import EStyleSheet from "react-native-extended-stylesheet";

const style = EStyleSheet.create({
        modalItemCover: {
            height: 300,
        },
        modalTextInput: {
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e5e5",
        },
        modalTextInputFocus: {
            borderBottomWidth: 2,
            borderBottomColor: '#6893d8'
        },
        modalItem: {
            marginTop: 50,

        },
        modalItemWithUnderLine: {
            height: 80,
            justifyContent: 'center',
            alignItems:'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: "#e5e5e5"
        },
        marginVertical: {
            marginVertical: 10
        },
        categoryAddNew: {
            paddingVertical: 50
        },
        choosePriceItem: {
            height: 70,
            alignItems: 'center'
        }

    })
;

export default style;