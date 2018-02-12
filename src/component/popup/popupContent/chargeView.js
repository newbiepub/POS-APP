import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList,} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {addToCart, removeFromCart} from '../../cart/cartAction';
import {closePopup} from '../../popup/popupAction';
import {numberwithThousandsSeparator} from "../../../reuseable/function/function";
import {graphql, compose} from 'react-apollo';
import {QUERY} from '../../../constant/query';
import {Navigator} from "react-native-deprecated-custom-components";
import Moment from '../../moment';
import MyDatePicker from '../../datePicker/datePicker';

class ChargeView extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            currentView: "main",
            transaction: {
                productItems: this.props.cart,
                totalPrice: this.getTotalPrice(),
                totalQuantity: this.getTotalQuantity(),
                paymentStatus: null,
                paymentMethod: null,
            },
            dueDate: null,

        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty("paymentStatus") && !this.state.transaction.paymentStatus) {
            this.setState({
                transaction: {
                    ...this.state.transaction,
                    paymentStatus: nextProps.paymentStatus.paymentStatus[0]
                }
            });
        }
        if (nextProps.hasOwnProperty("paymentMethod") && !this.state.transaction.paymentMethod) {
            this.setState({
                transaction: {
                    ...this.state.transaction,
                    paymentMethod: nextProps.paymentMethod.paymentMethod[0]
                }

            });
        }
    }

    getTotalQuantity() {
        let totalQuantity = 0;
        this.props.cart.forEach((item) => {
            totalQuantity += item.quantity
        });

        return totalQuantity
    }

    getTotalPrice() {
        let totalPrice = 0;
        for (let i = 0; i < this.props.cart.length; i++) {
            totalPrice += (this.props.cart[i].price.price * this.props.cart[i].quantity)
        }

        return totalPrice
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

    configureScene(route, navigator) {
        if (route.id === "main") {
            return Navigator.SceneConfigs.FadeAndroid
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "main":
                return <Main navigator={navigator} transaction={this.state.transaction} instance={this}/>;
            case "paymentMethod":
                return <PaymentMethod navigator={navigator} instance={this}
                                      currentPaymentMethod={this.state.transaction.paymentMethod}
                                      paymentMethodList={this.props.paymentMethod.paymentMethod}/>;
            case "selectDueDate":
                return <SelectDueDate navigator={navigator} instance={this}
                                      dueDate={this.state.dueDate}/>;

        }
    }

    render() {
        return (
            <View style={style.container}>
                <PopupHeader
                    title={`Tổng tiền: ${numberwithThousandsSeparator(this.getTotalPrice())}${this.props.currency.currency[0].symbol}`}
                    isBack={this.state.currentView !== 'main'}
                    backFunction={() => {
                        this.setState({
                            currentView: 'main'
                        });
                        this.navigator.pop()
                    }}
                    buttonText={"Tiếp theo"}/>
                <View style={[style.body, style.container]}>
                    <Navigator
                        ref={(ref) => {
                            this.navigator = ref;
                        }}
                        initialRoute={{id: "main", index: 0}}
                        configureScene={this.configureScene.bind(this)}
                        renderScene={this.renderScene.bind(this)}
                    />
                </View>
            </View>
        )
    }
}

class Main extends React.Component {
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

    navigatingView(type) {
        if (type === "paymentMethod") {
            this.props.instance.setState({
                currentView: type
            });
            this.props.navigator.push({id: 'paymentMethod'})
        }
        if (type === "selectDueDate") {
            this.props.instance.setState({
                currentView: type
            });
            this.props.navigator.push({id: 'selectDueDate'})
        }
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={() => this.navigatingView("paymentMethod")}>
                    <TextNormal>Hình thức thanh
                        toán: {this.props.transaction.paymentMethod ? this.props.transaction.paymentMethod.name : ""}</TextNormal>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.navigatingView("selectDueDate")}>
                    <TextNormal>Hạn thanh toán:{this.props.instance.state.dueDate && Moment(this.props.instance.state.dueDate).format("dddd [ngày] DD MMMM [năm] YYYY")}</TextNormal>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

class PaymentMethod extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            currentPaymentMethod: this.props.currentPaymentMethod
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

    _renderPaymentMethod = ({item, index}) => (
        <TouchableWithoutFeedback onPress={() => {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    paymentMethod: item,
                }
            });
            this.setState({
                currentPaymentMethod: item
            })
        }}>
            <View style={style.paymentMethodItem}>
                <TextNormal style={{flex: 1}}>{item.name}</TextNormal>
                <View style={style.paymentMethodRadioButton}>
                    {
                        this.state.currentPaymentMethod._id === item._id &&
                        <View style={style.paymentMethodRadioButtonChecked}/>
                    }

                </View>
            </View>
        </TouchableWithoutFeedback>

    );

    render() {
        return (
            <View style={style.container}>
                <FlatList
                    data={this.props.paymentMethodList}
                    extraData={this.state}
                    keyExtractor={(item) => item.name}
                    renderItem={this._renderPaymentMethod}
                />
            </View>
        )
    }
}

class SelectDueDate extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
        }

    }


    render() {
        return (
            <View style={style.container}>
                <MyDatePicker selectedDate={this.props.instance.state.dueDate}
                              onSelectDate={(date) => {
                                  this.props.instance.setState({dueDate: date})
                              }}/>
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
    paymentMethodItem: {
        padding: constantStyle.paddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center'
    },
    paymentMethodRadioButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        width: constantStyle.sizeNormal,
        height: constantStyle.sizeNormal,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentMethodRadioButtonChecked: {
        borderRadius: 50,
        backgroundColor: constantStyle.color1,
        width: constantStyle.sizeSmall,
        height: constantStyle.sizeSmall,
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        popup: state.popupReducer,
        cart: state.cartReducer.cart
    }
};
const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    closePopup
};

let ChargeViewApollo = compose(
    graphql(QUERY.CURRENCY, {name: 'currency', options: {fetchPolicy: "cache-and-network"}}),
    graphql(QUERY.PAYMENT_STATUS, {name: 'paymentStatus', options: {fetchPolicy: "cache-and-network"}}),
    graphql(QUERY.PAYMENT_METHOD, {name: 'paymentMethod', options: {fetchPolicy: "cache-and-network"}}),
)(ChargeView);
export default connect(mapStateToProps, mapDispatchToProps)(ChargeViewApollo);