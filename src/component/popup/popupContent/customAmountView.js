import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {addToCart, removeFromCart} from '../../cart/cartAction';
import {closePopup} from '../../popup/popupAction';
import CustomAmount from '../../../feature/pos/customAmount';
import {graphql} from 'react-apollo';
import {QUERY} from '../../../constant/query';

class CustomAmountView extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,

        }

    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        })
    }

    addToCart() {
        if (this.props.item.price.price > 0) {
            this.props.item.price.currency = this.props.currency.currency[0];
            if (this.props.item.name === "")
                this.props.item.name = "ghi chú";
            this.props.addToCart(this.props.item);
            this.props.closePopup();
        }

    }

    render() {
        return (
            <View style={style.container}>
                <PopupHeader
                    submitFunction={() => {
                        this.addToCart()
                    }}
                    buttonText={"Sửa"}/>
                <CustomAmount edit={true} item={this.props.item} closePopup={() => this.props.closePopup()}/>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        padding: constantStyle.headerHeight
    },
    titlePrice: {
        marginBottom: constantStyle.paddingHorizontal
    },
    pricePicker: {
        borderWidth: 1,
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal,
        paddingVertical: 10,
        borderColor: constantStyle.colorBorder
    },
    boxQuantity: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: constantStyle.headerHeight
    },
    subtend: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleQuantity: {
        marginTop: constantStyle.headerHeight,
        marginBottom: constantStyle.paddingHorizontal
    },
    inputQuantity: {
        marginHorizontal: constantStyle.paddingHorizontal,
        textAlign: "center",
        flex: 1
    },
    buttonDelete: {
        marginTop: constantStyle.headerHeight,
        paddingVertical: constantStyle.paddingHorizontal,
        textAlign: 'center',
        backgroundColor: 'red',
        color: constantStyle.color2

    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        popup: state.popupReducer
    }
};
const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    closePopup
};
let CustomAmountViewApollo = graphql(QUERY.CURRENCY, {
    name: 'currency', options: {
        fetchPolicy: "cache-and-network"
    }
})(CustomAmountView);
export default connect(mapStateToProps, mapDispatchToProps)(CustomAmountViewApollo);