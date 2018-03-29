import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList, Alert} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber, TextInputPriceMask, TextInputNormal} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {closePopup} from '../../popup/popupAction';
import {numberwithThousandsSeparator, removeTypeName} from "../../../reuseable/function/function";
import {graphql, compose} from 'react-apollo';
import {QUERY} from '../../../constant/query';
import {MUTATION, FRAGMENT} from '../../../constant/mutation';
import {Navigator} from "react-native-deprecated-custom-components";
import Moment from '../../moment';
import {normalizeProductItemsInput} from '../../../reuseable/function/normalizeData';
import MyDatePicker from '../../datePicker/datePicker';
import ListProduct from '../../listProduct/listProduct';
import LoadingOverlay from '../../loadingOverlay';
import {clearCart} from '../../cart/cartAction';
import _ from 'lodash';
import {client} from '../../../root';
import gql from 'graphql-tag';

class ChargeView extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.chargeProgressing = null;
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
                paid: 0,
                dueDate: null,
                description: "",
                customer: {
                    name: "",
                    email: "",
                    address: "",
                    phone: "",
                    description: ""
                }
            },


        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty("paymentStatus") && !this.state.transaction.paymentStatus) {
            this.setState({
                transaction: {
                    ...this.state.transaction,
                    paymentStatus: _.get(nextProps, "paymentStatus.paymentStatus[0]", null)
                }
            });
        }
        if (nextProps.hasOwnProperty("paymentMethod") && !this.state.transaction.paymentMethod) {
            this.setState({
                transaction: {
                    ...this.state.transaction,
                    paymentMethod: _.get(nextProps, "paymentMethod.paymentMethod[0]", null)
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
                return <Main navigator={navigator} transaction={this.state.transaction} instance={this}
                             cart={this.props.cart}/>;
            case "paymentMethod":
                return <PaymentMethod navigator={navigator} instance={this}
                                      currentPaymentMethod={this.state.transaction.paymentMethod}
                                      paymentMethodList={this.props.paymentMethod.paymentMethod}/>;
            case "selectDueDate":
                return <SelectDueDate navigator={navigator} instance={this}
                                      dueDate={this.state.dueDate}/>;
            case "customerInformation":
                return <CustomerInformation navigator={navigator} instance={this}
                                            customer={this.state.transaction.customer}/>;

        }
    }

    getPaymentStatus() {
        let status = this.props.paymentStatus.paymentStatus;

        function findPaymentStatus(type) {

            for (item of status) {
                if (item.type === type) {
                    return item
                }
            }
        }

        // console.warn(this.state.transaction.totalPrice)
        if (this.state.transaction.paid === 0) {
            return findPaymentStatus("unpaid")
        }
        if (this.state.transaction.paid >= this.state.transaction.totalPrice) {
            return findPaymentStatus("paid")
        }
        if (this.state.transaction.paid < this.state.transaction.totalPrice) {
            return findPaymentStatus("indebtedness")
        }
    }

    checkCondition() {
        if (this.state.transaction.paymentMethod.type === 'prepaid' && this.state.transaction.totalPrice <= this.state.transaction.paid) {
            return true;
        }
        if ((this.state.transaction.paymentMethod.type === 'postpaid' || this.state.transaction.paymentMethod.type === "indebtedness") && this.state.transaction.dueDate !== null) {
            return true
        }
        return false;
    }

    async subtractInventoryLocal() {
        let query = await QUERY.INVENTORY_PRODUCT;
        const data = await client.readQuery({
            query, variables: {
                userId: _.get(this.props, "currentUser.currentUser._id", "")
            }
        });
        for (items of this.state.transaction.productItems) {

            for (itemsData of data.getUserProductInventory) {
                if (items._id === itemsData.product._id) {
                    itemsData.quantity = itemsData.quantity - items.quantity;
                    break;
                }
            }
        }

        client.writeQuery({
            query,
            data: {
                getUserProductInventory: data.getUserProductInventory,
            },
            variables: {
                userId: _.get(this.props, "currentUser.currentUser._id", "")
            }
        });
    }

    async onCharge() {


        let condition = await this.checkCondition();

        if (condition) {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn thực hiện giao dịch này ?',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'Có', onPress: async () => {
                        await this.setState({
                            transaction: {
                                ...this.state.transaction,
                                paymentStatus: this.getPaymentStatus()
                            }
                        });
                        let paymentStatus = await removeTypeName(this.getPaymentStatus()),
                            paymentMethod = await removeTypeName(this.state.transaction.paymentMethod),
                            productItems = await normalizeProductItemsInput(this.state.transaction.productItems);
                        // console.warn(paymentStatus);
                        this.subtractInventoryLocal()
                        this.props.createTransaction({
                            variables: {
                                productItems: productItems,
                                type: "pay",
                                paymentStatus: paymentStatus,
                                paymentMethod: paymentMethod,
                                dueDate: this.state.transaction.dueDate,
                                totalQuantity: this.state.transaction.totalQuantity,
                                totalPrice: this.state.transaction.totalPrice,
                                paid: {date: new Date(), amount: this.state.transaction.paid},
                                description: this.state.transaction.description,
                                customer: this.state.transaction.customer,

                            }
                        });
                        this.props.clearCart();
                        this.props.closePopup();
                    }
                    },
                ],
                {cancelable: false}
            )

        } else {
            Alert.alert(
                'Thông báo !',
                'Bạn phải điền đúng thông tin',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    },
                ],
                {cancelable: false})
        }


        //this.chargeProgressing.setLoading()
    }

    render() {
        return (
            <View style={style.container}>
                <PopupHeader
                    title={`Tổng tiền: ${numberwithThousandsSeparator(this.getTotalPrice())}${_.get(this.props.currency, "currency[0].symbol", "")}`}
                    isBack={this.state.currentView !== 'main'}
                    submitFunction={() => this.onCharge()}
                    backFunction={() => {
                        this.setState({
                            currentView: 'main'
                        });
                        this.navigator.pop()
                    }}
                    buttonText={"Thanh toán"}/>
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
                <LoadingOverlay ref={ref => {
                    if (this.chargeProgressing === null) this.chargeProgressing = ref
                }}
                                loading={false}/>
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
            cashInput: 0
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
        this.props.instance.setState({
            currentView: type
        });
        this.props.navigator.push({id: type})
    }

    render() {
        return (
            <ScrollView style={style.container}>
                <TouchableWithoutFeedback onPress={() => this.navigatingView("paymentMethod")}>
                    <TextNormal style={[style.spaceLine]}>Hình thức thanh
                        toán: {this.props.transaction.paymentMethod ? this.props.transaction.paymentMethod.name : ""}</TextNormal>
                </TouchableWithoutFeedback>
                {
                    _.get(this.props.transaction, "paymentMethod.type", "") !== "prepaid" &&
                    <TouchableWithoutFeedback onPress={() => this.navigatingView("selectDueDate")}>
                        <TextNormal style={[style.spaceLine]}>Hạn thanh
                            toán:{this.props.instance.state.transaction.dueDate && Moment(this.props.instance.state.transaction.dueDate).format("dddd [ngày] DD MMMM [năm] YYYY")}</TextNormal>
                    </TouchableWithoutFeedback>
                }
                <View style={style.spaceLine}>
                    <View style={[{flexDirection: 'row'}]}>
                        <TextNormal>Tiền nhận:</TextNormal>
                        <TextInputPriceMask style={{flex: 1}} value={this.props.transaction.paid}
                                            onChangeText={(cash) => {
                                                this.props.instance.setState({
                                                    transaction: {
                                                        ...this.props.instance.state.transaction,
                                                        paid: cash
                                                    }
                                                })
                                            }}/>
                    </View>
                    {
                        this.props.transaction.paid > 0 &&
                        <View>
                            <TextSmall
                                style={[style.priceHint]}>{this.props.transaction.paid < this.props.transaction.totalPrice ? "Thiếu" : "Thừa"} {numberwithThousandsSeparator(Math.abs(this.props.transaction.totalPrice - this.props.transaction.paid))} {_.get(this.props.instance.props.currency, "currency[0].symbol", "")}</TextSmall>
                        </View>
                    }
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    this.navigatingView("customerInformation")
                }}>
                    <TextNormal style={[style.spaceLine]}>Thông tin khách hàng</TextNormal>
                </TouchableWithoutFeedback>
                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.transaction.description}
                                 placeholder={"ghi chú"}
                                 onChangeText={(text) => this.props.instance.setState(
                                     {
                                         transaction: {
                                             ...this.props.instance.state.transaction,
                                             description: text
                                         }
                                     }
                                 )}/>
                <View>
                    <TextNormal style={[style.spaceLine]}>Danh sách mặt hàng:</TextNormal>
                    <ListProduct data={this.props.cart}/>
                </View>


            </ScrollView>
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

class CustomerInformation extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
        }

    }

    onChangeValue(key, value) {
        if (key === "name") {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    customer: {
                        ...this.props.instance.state.transaction.customer,
                        name: value
                    }
                }

            })
        }
        if (key === "email") {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    customer: {
                        ...this.props.instance.state.transaction.customer,
                        email: value
                    }
                }

            })
        }
        if (key === "address") {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    customer: {
                        ...this.props.instance.state.transaction.customer,
                        address: value
                    }
                }

            })
        }
        if (key === "description") {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    customer: {
                        ...this.props.instance.state.transaction.customer,
                        description: value
                    }
                }

            })
        }
        if (key === "phoneNumber") {
            this.props.instance.setState({
                transaction: {
                    ...this.props.instance.state.transaction,
                    customer: {
                        ...this.props.instance.state.transaction.customer,
                        phone: value
                    }
                }

            })
        }

    }

    render() {
        return (
            <View style={style.container}>
                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.customer.name}
                                 placeholder={"Tên khách hàng"}
                                 onChangeText={(text) => this.onChangeValue("name", text)}/>

                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.customer.email}
                                 placeholder={"Địa chỉ email"}
                                 onChangeText={(text) => this.onChangeValue("email", text)}/>

                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.customer.address}
                                 placeholder={"Địa chỉ nhà"}
                                 onChangeText={(text) => this.onChangeValue("address", text)}/>


                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.customer.phone}
                                 placeholder={"Số điện thoại"}
                                 onChangeText={(text) => this.onChangeValue("phoneNumber", text)}/>

                <TextInputNormal style={[style.description, style.spaceLine]} value={this.props.customer.description}
                                 placeholder={"Ghi chú"}
                                 onChangeText={(text) => this.onChangeValue("description", text)}/>
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
                <MyDatePicker selectedDate={this.props.instance.state.transaction.dueDate}
                              onSelectDate={(date) => {
                                  this.props.instance.setState({
                                      transaction: {
                                          ...this.props.instance.state.transaction,
                                          dueDate: date
                                      }
                                  })
                              }}/>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.color2
    },
    spaceLine: {
        marginBottom: constantStyle.lg
    },
    body: {
        padding: constantStyle.headerHeight
    },
    titlePrice: {
        marginBottom: constantStyle.paddingHorizontal
    },
    priceHint: {
        color: 'gray',
        marginLeft: constantStyle.marginVerticalNormal
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
    description: {},
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
    closePopup,
    clearCart
};

let ChargeViewApollo = compose(
    graphql(QUERY.CURRENT_USER, {
        name: 'currentUser', options: {
            fetchPolicy: "cache-and-network"
        }
    }),
    graphql(QUERY.CURRENCY, {name: 'currency', options: {fetchPolicy: "cache-and-network"}}),
    graphql(QUERY.PAYMENT_STATUS, {name: 'paymentStatus', options: {fetchPolicy: "cache-and-network"}}),
    graphql(QUERY.PAYMENT_METHOD, {name: 'paymentMethod', options: {fetchPolicy: "cache-and-network"}}),
    graphql(MUTATION.CREATE_TRANSACTION, {name: 'createTransaction'})
)(ChargeView);
export default connect(mapStateToProps, mapDispatchToProps)(ChargeViewApollo);