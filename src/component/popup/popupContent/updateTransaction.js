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

class UpdateTransaction extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.chargeProgressing = null;
        this.state = {
            width,
            height,
            currentView: "main",
            transaction: this.props.transaction,
            paid: 0


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

            case "selectDueDate":
                return <SelectDueDate navigator={navigator} instance={this}
                                      dueDate={this.state.dueDate}/>;
            case "customerInformation":
                return <CustomerInformation navigator={navigator} instance={this}
                                            customer={this.state.transaction.customer}/>;

        }
    }

    getTotalPaid(paid) {
        let price = 0;
        for (itemsPaid of paid) {
            price = price + itemsPaid.amount;
        }

        return price
    }

    checkCondition() {
        // if(this.getTotalPaid(this.state.transaction.paid + this.state.paid > this.state.totalPrice ))
        return true;
    }

    subtractInventoryLocal() {
        this.state.transaction.productItems.forEach(item => {
            client.writeFragment({
                id: item._id,
                fragment: FRAGMENT.INVETORY_PRODUCT,
                data: {
                    quantity: 100,
                    __typename: "ProductInventoryEmployee"
                },
            });
        });
    }

    async onCharge() {


        let condition = await this.checkCondition();
        //this.subtractInventoryLocal()
        if (condition) {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn thực hiện giao dịch này ?',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'Có', onPress: async () => {

                        this.props.updateTransaction({
                            variables: {
                                _id: this.state.transaction._id,
                                dueDate: this.state.transaction.dueDate,
                                paid: {date: new Date(), amount: this.state.paid},
                                description: this.state.transaction.description,

                            }
                        });
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
                    title={`Tổng tiền: ${numberwithThousandsSeparator(this.state.transaction.totalPrice)}${_.get(this.props.currency, "currency[0].symbol", "")}`}
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
                <TextNormal style={[style.spaceLine]}>Hình thức thanh
                    toán:{this.props.transaction.paymentMethod.name} </TextNormal>
                <TextNormal style={[style.spaceLine]}>Tình
                    trạng:{this.props.transaction.paymentStatus.name} </TextNormal>
                <TouchableWithoutFeedback onPress={() => this.navigatingView("selectDueDate")}>
                    <TextNormal style={[style.spaceLine]}>Hạn thanh
                        toán:{this.props.instance.state.transaction.dueDate && Moment(this.props.instance.state.transaction.dueDate).format("dddd [ngày] DD MMMM [năm] YYYY")}</TextNormal>
                </TouchableWithoutFeedback>
                <View style={style.spaceLine}>
                    <View style={[{flexDirection: 'row'}]}>
                        <TextNormal>Tiền nhận:</TextNormal>
                        <TextInputPriceMask style={{flex: 1}} value={this.props.instance.state.paid}
                                            onChangeText={(cash) => {
                                                this.props.instance.setState({
                                                    paid: cash
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
                    <ListProduct data={this.props.transaction.productItems}/>
                </View>


            </ScrollView>
        )
    }
}

class CustomerInformation extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <TextNormal style={[style.spaceLine]}>Tên khách hàng: {this.props.customer.name} </TextNormal>
                <TextNormal style={[style.spaceLine]}>Địa chỉ email: {this.props.customer.email} </TextNormal>
                <TextNormal style={[style.spaceLine]}>Địa chỉ nhà: {this.props.customer.address} </TextNormal>
                <TextNormal style={[style.spaceLine]}>Số điện thoại: {this.props.customer.phone} </TextNormal>
                <TextNormal style={[style.spaceLine]}>Ghi chú: {this.props.customer.description} </TextNormal>
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
    }
};
const mapDispatchToProps = {
    closePopup,
    clearCart
};

let UpdateTransactionApollo = compose(
    graphql(QUERY.CURRENCY, {name: 'currency', options: {fetchPolicy: "cache-and-network"}}),
    graphql(MUTATION.UPDATE_TRANSACTION, {name: 'updateTransaction'})
)(UpdateTransaction);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTransactionApollo);