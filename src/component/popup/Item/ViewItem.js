import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, TextInput,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextNormal, TextInputNumber} from '../../Reusable/Text';

import {Navigator} from "react-native-deprecated-custom-components";
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

class ViewItem extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            currentPrice: this.props.itemData.prices[0].value,
            itemQuatity: 1,
            note: ""
        };
    }


    closePopup() {
        this.props.closePopup();
    }


    getNumberInput(name, num) {

        if (isNaN(num) !== true) {
            switch (name) {
                case "itemPrice" :
                    this.setState({itemPrice: num});
                    return;
                case "newItemPrice" :
                    this.setState({newItemPrice: num});
                    return;
            }
        }
    }


    async create() {
        // console.warn(JSON.stringify(this.props.account.access_token));
        let {access_token} = this.props.account;
        let response = await  fetch(`http://localhost:3000/api/category/createCategory?access_token=${access_token}&companyId=helo&employeeId=&nam=long`);
        response = await response.json();
        console.warn('api', JSON.stringify(response))
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------------------Header_____________------*/}
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

                    <View style={[{flex: 1, flexDirection: 'row'}]}>
                        <TextLarge>{this.props.itemData.name || ""}</TextLarge>
                        <TextLarge>  {this.state.currentPrice * this.state.itemQuatity || ""} đ</TextLarge>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        this.create()
                    }}>
                        <View
                            style={[styleBase.center, styleBase.background2, styleHome.heightHeader, styleHome.boxTitle]}>

                            <TextLarge style={[styleBase.color5]}>Thêm vào giỏ</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styleHome.paddingModal, {flex: 1}]}>
                    {/*-----------------List---------------------------*/}
                    <ListPrice itemData={this.props.itemData} instant={this}/>


                    {/*-----------------Note and Quatity---------------------------*/}
                    <TextNormal style={[styleModalItems.marginVertical, styleModalItems.modalItem]}>GHI CHÚ VÀ SỐ
                        LƯỢNG</TextNormal>
                    <TextInputNormal placeholder={"Ghi chú"} value={this.state.note}
                                     onChangeText={(text) => this.setState({note: text})}
                                     style={styleModalItems.marginVertical}/>
                    <View style={[styleModalItems.marginVertical, {flexDirection: 'row'}]}>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({itemQuatity: this.state.itemQuatity > 1 ? this.state.itemQuatity - 1 : 1})}>
                            <View style={[styleHome.boxPadding, styleHome.box]}>
                                <TextLarge>-</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styleBase.center, {flex: 1}]}>
                            <TextInputNumber value={this.state.itemQuatity.toString()}
                                             style={{textAlign: 'center', width: 100}}
                                             placeholder={this.state.itemQuatity.toString()} onChangeText={(text) => {

                                this.setState({itemQuatity: text>0? text: 1})
                            }}/>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({itemQuatity: this.state.itemQuatity + 1})}>
                            <View style={[styleHome.boxPadding, styleHome.box]}>
                                <TextLarge>+</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


            </View>
        )
    }
}

class ListPrice extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            currentType: this.props.itemData.prices[0].type
        }
    }

    measureView(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        })
    }

    changeType(type, price) {
        this.props.instant.setState({currentPrice: price});
        this.setState({
            currentType: type
        })

    }

    render() {
        let margin = 20;
        let priceItemWidth = (this.state.width - 20) / 2;
        try {
            var listPrice = this.props.itemData.prices.map((data) => {
                return (
                    <TouchableWithoutFeedback key={data.type} onPress={() => this.changeType(data.type, data.value)}>
                        <View
                            style={[styleHome.box, styleHome.boxPadding, styleModalItems.marginVertical, styleModalItems.choosePriceItem, {
                                flexDirection: 'row',
                                width: priceItemWidth
                            }, this.props.itemData.prices.indexOf(data) % 2 === 0 && {marginRight: margin}, this.state.currentType === data.type && styleBase.background3]}>
                            <TextSmall numberOfLines={2}
                                       style={[styleBase.bold, this.state.currentType === data.type && styleBase.color4, {flex: 1}]}>{data.type}</TextSmall>
                            <TextSmall numberOfLines={2}
                                       style={this.state.currentType === data.type && styleBase.color4}>{data.value}đ</TextSmall>
                        </View>
                    </TouchableWithoutFeedback>
                )

            })
        }
        catch
            (e) {
            console.warn(e);
            return <View></View>
        }
        return (
            <View>
                <View onLayout={(event) => {
                    this.measureView(event)
                }} style={{flexDirection: 'row'}}>
                    <TextNormal style={[styleBase.bold]}>{this.props.itemData.name.toUpperCase()}</TextNormal>
                    <TextNormal> CHỌN GIÁ</TextNormal>
                </View>
                <View style={[styleModalItems.marginVertical, {flexDirection: 'row', flexWrap: "wrap"}]}>
                    {listPrice}
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup
};
const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);