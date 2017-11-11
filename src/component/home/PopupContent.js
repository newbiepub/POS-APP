import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, TextInput, Platform} from "react-native";
import styleBase from "../style/base";
import styleHome from '../style/home';
import styleModalItems from '../style/modalItem';
import styleProduct from "../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

class PopupContent extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width,
            itemName: "",
            itemPrice: '',
            itemSKU: "",
            itemNameFocus: false,
            itemPriceFocus: false,
            itemSkuFocus: false
        }
    }

    closePopup() {
        this.props.closePopup();
    }

    getNumberInput(num) {

        if (isNaN(num) !== true) {
            this.setState({
                itemPrice: num
            })
        }
    }
    render() {
        return (
            <View>
                {/*-----------Header_____________------*/}
                <View style={[styleHome.heightHeader, styleBase.centerHorizontal, styleHome.borderBottom, {
                    flexDirection: 'row'
                }]}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.closePopup()
                    }}>
                        <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                            <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[{flex: 1}]}>
                        <Text style={[styleBase.font18, styleBase.color3]}>{this.props.title || ""}</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        this.props.action()
                    }}>
                        <View
                            style={[styleBase.center, styleBase.background2, styleHome.heightHeader, styleHome.boxTitle]}>
                            <Text style={[styleBase.font18, styleBase.color5]}>{this.props.actionName || "Thêm"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <KeyboardAwareScrollView>
                    {/*-------------COVER----------------*/}
                    <View style={[styleModalItems.modalItemCover, styleBase.background5, styleBase.center]}>
                        <View style={[styleProduct.productItem]}>
                            <View style={[styleBase.center, {flex: 3}]}>
                                <Text style={[styleBase.font26, styleBase.textE5]}>
                                    {this.state.itemName.substr(0, 2)}
                                </Text>
                            </View>
                            <View
                                style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1}]}>
                                <Text style={[styleBase.font14, styleBase.color3]}
                                      numberOfLines={1}>{this.state.itemName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styleHome.paddingModal}>

                        <TextInput placeholder={"Tên"}
                                   value={this.state.itemName}
                                   onChangeText={(text) => {
                                       this.setState({itemName: text})
                                   }}
                                   onFocus={() => {
                                       this.setState({itemNameFocus: true})
                                   }}
                                   onBlur={() => {
                                       this.setState({itemNameFocus: false})
                                   }}
                                   style={[styleBase.font26, styleModalItems.modalTextInput, this.state.itemNameFocus ? styleModalItems.modalTextInputFocus : styleHome.borderBottom, {flex: 1}]}
                        />

                        <TouchableWithoutFeedback>
                            <View style={[styleHome.boxPadding, styleBase.centerVertical, {
                                flexDirection: 'row',
                                paddingHorizontal: 0
                            }]}>
                                <Text style={[styleBase.font26, styleBase.color3, {flex: 1}]}>Loại</Text>
                                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={[{flexDirection: 'row'}]}>
                            <TextInput placeholder={"0đ"}
                                       value={this.state.itemPrice}
                                       keyboardType={'numeric'}
                                       onChangeText={(num) => {
                                           this.getNumberInput(num)
                                       }}
                                       onFocus={() => {
                                           this.setState({itemPriceFocus: true})
                                       }}
                                       onBlur={() => {
                                           this.setState({itemPriceFocus: false})
                                       }}
                                       style={[styleBase.font26, styleModalItems.modalTextInput, this.state.itemPriceFocus ? styleModalItems.modalTextInputFocus : styleHome.borderBottom, {flex: 1}]}
                            />
                            <TextInput placeholder={"Mã SKU"}
                                       value={this.state.itemSKU}
                                       onChangeText={(text) => {
                                           this.setState({itemSKU: text})
                                       }}
                                       onFocus={() => {
                                           this.setState({itemSkuFocus: true})
                                       }}
                                       onBlur={() => {
                                           this.setState({itemSkuFocus: false})
                                       }}
                                       style={[styleBase.font26, styleModalItems.modalTextInput, this.state.itemSkuFocus ? styleModalItems.modalTextInputFocus : styleHome.borderBottom, {flex: 1}]}
                            />

                        </View>
                    </View>

                </KeyboardAwareScrollView>


            </View>
        )
    }
}


const mapDispatchToProps = {
    closePopup
}

export default connect(null, mapDispatchToProps)(PopupContent);