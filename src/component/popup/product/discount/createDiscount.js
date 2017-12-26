import React from "react";
import {
    FlatList,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
    ActivityIndicator
} from "react-native";
import {TextInputNormal, TextInputPriceMask, TextLarge, TextSmall, TextNormal} from '../../../reusable/text';
import styleBase from "../../../style/base";
import styleHome from '../../../style/home';
import styleModalItems from '../../../style/modalItem';
import styleProduct from "../../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {numberwithThousandsSeparator} from '../../../reusable/function';
import {createDiscount, upsertDiscount, getDiscount,removeDiscount} from '../../../../action/productCompany';
import ChooseProduct from './productItem'
import EmployeeSelection from './employeeSelection';

class CreateDiscount extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            currentView: 'Thêm khuyến mãi',
            width,
            height,
            onProgressing: false,
            discountData: this.props.hasOwnProperty("discountData") ? this.props.discountData : {
                employeeId: [],
                name: '',
                value: 0,
                type: 'percent',
                description: '',
                productItems: []
            },
        };

    }


    closePopup() {
        this.props.closePopup();
    }

    discountChange(name, value) {
        if (name === 'name') {
            this.setState({
                discountData: {
                    ...this.state.discountData,
                    name: value
                }
            })
        }
        if (name === 'value') {
            this.setState({
                discountData: {
                    ...this.state.discountData,
                    value: value
                }
            })
        }
        if (name === 'type') {
            this.setState({
                discountData: {
                    ...this.state.discountData,
                    type: value,
                    value: 0
                }
            })
        }
        if (name === 'description') {
            this.setState({
                discountData: {
                    ...this.state.discountData,
                    description: value
                }
            })
        }

    }

    async onRemoveDiscount() {
        Alert.alert(
            'Xoá khuyến mãi',
            'Bạn có muốn xoá khuyến mãi này không !',
            [
                {text: 'Không', style: 'cancel'},
                {text: 'OK', onPress: async () => {

                    this.setState({
                        onProgressing: true
                    });
                    let res = this.props.removeDiscount(this.state.discountData._id);
                    if (!res.hasOwnProperty("error")) {
                        this.props.getDiscount();
                        Alert.alert(
                            'Thành công',
                            'Bạn đã sửa thành công !',
                            [
                                {text: 'OK', onPress: () => this.props.closePopup()},
                            ],
                            {cancelable: false}
                        )
                    }
                    else
                        Alert.alert("Thất bại", "Đã có lỗi xảy ra !!");
                    this.setState({
                        onProgressing: false
                    });

                }
                },
            ],
            {cancelable: false}
        )
    }

    async onUpdateDiscount() {
        if (this.state.discountData.employeeId.length > 0 && this.state.discountData.name != "" && this.state.discountData.productItems.length > 0 && this.state.discountData.type !== "" && this.state.discountData.value > 0) {
            this.setState({
                onProgressing: true
            })
            let res = await this.props.upsertDiscount(this.state.discountData);
            if (res.status < 400) {
                this.props.getDiscount();
                Alert.alert(
                    'Thành công',
                    'Bạn đã sửa thành công !',
                    [
                        {text: 'OK', onPress: () => this.props.closePopup()},
                    ],
                    {cancelable: false}
                )
            }
            else
                Alert.alert("Thất bại", "Đã có lỗi xảy ra !!");
            this.setState({
                onProgressing: false
            });
        } else {
            Alert.alert("Chú ý", "Bạn đã nhập thiếu thông tin cần thiết !");
        }
    }

    getModalSize(evt) {
        var {width, height} = evt.nativeEvent.layout;
        this.setState({
            width,
            height
        })
    }

    async onCreateDiscount() {
        if (this.state.discountData.employeeId.length > 0 && this.state.discountData.name != "" && this.state.discountData.productItems.length > 0 && this.state.discountData.type !== "" && this.state.discountData.value > 0) {
            this.setState({
                onProgressing: true
            })
            let res = await this.props.createDiscount(this.state.discountData);
            if (res.status < 400) {
                this.props.getDiscount();
                Alert.alert(
                    'Thành công',
                    'Bạn đã thêm một khuyến mãi mới !',
                    [
                        {text: 'OK', onPress: () => this.props.closePopup()},
                    ],
                    {cancelable: false}
                )

            }
            else
                Alert.alert("Thất bại", "Đã có lỗi xảy ra !!");
            this.setState({
                onProgressing: false
            });
        } else {
            Alert.alert("Chú ý", "Bạn đã nhập thiếu thông tin cần thiết !");
        }


    }

    render() {
        return (
            <View onLayout={(event) => {
                this.getModalSize(event)
            }}
                  style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>
                    {
                        this.state.currentView === 'Thêm khuyến mãi' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.currentView !== 'Thêm khuyến mãi' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({currentView: 'Thêm khuyến mãi'});
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-arrow-back"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <View style={[{flex: 1}]}>
                        <TextLarge>{this.state.currentView}</TextLarge>
                    </View>
                    {this.state.currentView === 'Thêm khuyến mãi' &&
                    (this.props.hasOwnProperty("discountData") ?
                            <TouchableOpacity onPress={() => this.onUpdateDiscount()}
                                              style={styleHome.modalButtonSubmit}>
                                <TextLarge style={[styleHome.modalButtonSubmitFont]}>Sửa</TextLarge>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => this.onCreateDiscount()}
                                              style={styleHome.modalButtonSubmit}>
                                <TextLarge style={[styleHome.modalButtonSubmitFont]}>Thêm</TextLarge>
                            </TouchableOpacity>
                    )
                    }

                </View>
                <View style={{flex: 1}}>
                    {
                        this.state.currentView === 'Thêm khuyến mãi' &&
                        <AddDiscount instant={this} discountChange={(name, value) => {
                            this.discountChange(name, value)
                        }} removeDiscount={()=> this.onRemoveDiscount()}/>
                    }


                    {
                        this.state.currentView === 'Thêm hàng khuyến mãi' &&
                        <ChooseProduct instant={this} productData={this.props.product}/>
                    }

                    {
                        this.state.currentView === 'Thêm nơi khuyến mãi' &&
                        <EmployeeSelection instant={this} productData={this.props.product}/>
                    }
                </View>
                {
                    this.state.onProgressing &&
                    <View style={{
                        position: 'absolute',
                        width: this.state.width,
                        height: this.state.height,
                        backgroundColor: 'rgba(1,1,1,0.1)'
                    }}>
                        <View style={[styleBase.center, {flex: 1}]}>
                            <ActivityIndicator size={"large"}/>
                        </View>
                    </View>
                }

            </View>
        )
    }
}


class AddDiscount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            idAddItem: false,
        }

    }


    changeView(id, name) {
        this.props.instant.setState({currentView: name});
    }

    onValueChange(text) {
        let newText = '';
        let numbers = '0123456789';
        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                if (newText === '' && text[i] == 0) {

                } else {
                    newText = newText + text[i];

                }

            }
        }
        if (newText < 1) {
            newText = 0
        }
        if (newText > 100 && this.props.instant.state.discountData.type === 'percent') {
            newText = 100
        }
        this.props.discountChange("value", newText)
    }

    render() {

        let instant = this.props.instant;
        return (
            <View style={[styleBase.container]}>
                <KeyboardAwareScrollView
                    style={[styleBase.background4,]}>
                    {/*-------------COVER----------------*/}
                    <View style={[styleModalItems.modalItemCover, styleBase.background5, styleBase.center]}>
                        <View style={[styleProduct.productItem]}>
                            <View style={[styleBase.center, {flex: 3}]}>
                                <Ionicons name={"ios-pricetags-outline"} style={styleBase.vector32}/>
                            </View>
                            <View
                                style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1}]}>
                                <TextSmall
                                    numberOfLines={1}>{this.props.instant.state.discountData.name || ""}</TextSmall>
                            </View>
                        </View>
                    </View>
                    <View style={styleHome.paddingModal}>
                        {/*--------------Name discount-----------------*/}
                        <View style={styleModalItems.modalItemWithUnderLine}>
                            <TextInputNormal placeholder={"Tên khuyến mãi"}
                                             value={this.props.instant.state.discountData.name}
                                             onChangeText={(text) => {
                                                 this.props.discountChange("name", text)
                                             }}

                                             style={[styleModalItems.modalTextInput, {flex: 1, borderBottomWidth: 0}]}
                            />
                        </View>
                        {/*--------------value of discount-----------------*/}
                        <View style={styleModalItems.modalItemWithUnderLine}>
                            <TextInputNormal
                                value={numberwithThousandsSeparator(this.props.instant.state.discountData.value)}
                                onChangeText={(text) => {
                                    this.onValueChange(text)
                                }}

                                style={[styleModalItems.modalTextInput, {flex: 1, borderBottomWidth: 0}]}
                            />
                            <TouchableWithoutFeedback onPress={() => this.props.discountChange('type', "percent")}>
                                <View
                                    style={[styleProduct.chooseTypeDiscount, styleHome.box, this.props.instant.state.discountData.type === 'percent' && styleBase.background2]}>
                                    <TextSmall>%</TextSmall>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.discountChange('type', "amount")}>
                                <View
                                    style={[styleProduct.chooseTypeDiscount, styleHome.box, this.props.instant.state.discountData.type === 'amount' && styleBase.background2]}>
                                    <TextSmall>đ</TextSmall>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/*--------------------add discount employee  --------------------*/}

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.instant.setState({currentView: 'Thêm nơi khuyến mãi'})
                        }}>
                            <View style={styleModalItems.modalItemWithUnderLine}>
                                <TextLarge style={{flex: 1}}>Thêm nơi khuyến mãi</TextLarge>
                                <EvilIcons name="chevron-right" style={[styleBase.vector32]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*--------------------add discount product  --------------------*/}

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.instant.setState({currentView: 'Thêm hàng khuyến mãi'})
                        }}>
                            <View style={styleModalItems.modalItemWithUnderLine}>
                                <TextLarge style={{flex: 1}}>Thêm hàng khuyến mãi</TextLarge>
                                <EvilIcons name="chevron-right" style={[styleBase.vector32]}/>
                            </View>
                        </TouchableWithoutFeedback>


                        {/*--------------description discount-----------------*/}
                        <View style={styleModalItems.modalItemWithUnderLine}>
                            <TextInputNormal placeholder={"Ghi chú"}
                                             value={this.props.instant.state.discountData.description}
                                             onChangeText={(text) => {
                                                 this.props.discountChange("description", text)
                                             }}

                                             style={[styleModalItems.modalTextInput, {flex: 1, borderBottomWidth: 0}]}
                            />
                        </View>
                        {/*------------------delete---------------------------*/}
                        {
                            this.props.instant.props.hasOwnProperty("discountData") &&
                            <TouchableWithoutFeedback onPress={() => {
                                this.props.removeDiscount()
                            }}>
                                <View style={styleHome.buttonDelete}>
                                    <TextNormal style={styleBase.color4}>Xoá</TextNormal>
                                </View>
                            </TouchableWithoutFeedback>

                        }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}


const mapDispatchToProps = {
    closePopup,
    createDiscount,
    upsertDiscount,
    getDiscount,
    removeDiscount
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        category: state.product.category,
        variantProduct: state.product.variantProduct,
        product: state.product.allProduct
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateDiscount);