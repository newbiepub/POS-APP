import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, Platform,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextNormal} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import PriceGrid from '../../home/product/price/priceGrid';
import Entypo from 'react-native-vector-icons/Entypo';

class CreateModifyCategoryPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width,
            category: this.props.hasOwnProperty("category") ? this.props.category : {
                name: '',

            },
            currentView: 'Tạo loại hàng'

        };
    }


    closePopup() {
        this.props.closePopup();
    }

    render() {
        try {
            var listProduct = this.props.allProduct.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} >
                        <View style={[styleHome.borderBottom, styleHome.itemBar, {
                            flexDirection: 'row',
                            flex: 1
                        }]}>
                            <View style={[styleHome.itemIcon, {
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }]}>

                                <TextNormal style={styleBase.background2}>{data.name.substr(0, 2)}</TextNormal>
                            </View>
                            <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
                                <TextSmall style={{flex: 1}}>{data.name}</TextSmall>
                                <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                    {
                                        <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                                    }

                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            });
        }
        catch (e) {
            console.warn(e);
            return <View></View>
        }
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={[styleHome.heightHeader, styleBase.centerHorizontal, styleHome.borderBottom, {
                    flexDirection: 'row'
                }]}>
                    {
                        this.state.currentView === 'Tạo loại hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.currentView !== 'Thêm mặt hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({currentView: 'Thêm mặt hàng'});
                        }}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Ionicons name={"md-arrow-back"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <View style={[{flex: 1}]}>
                        <TextLarge>{this.state.currentView}</TextLarge>
                    </View>
                    {this.state.currentView === 'Tạo loại hàng' &&
                    (this.props.hasOwnProperty("category") ?
                            <TouchableWithoutFeedback onPress={() => {
                                this.create()
                            }}>
                                <View
                                    style={[styleBase.center, styleBase.background2, styleHome.heightHeader, styleHome.boxTitle]}>

                                    <TextLarge style={[styleBase.color5]}>Sửa</TextLarge>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback onPress={() => {
                                this.create()
                            }}>
                                <View
                                    style={[styleBase.center, styleBase.background2, styleHome.heightHeader, styleHome.boxTitle]}>

                                    <TextLarge style={[styleBase.color5]}>Thêm</TextLarge>
                                </View>
                            </TouchableWithoutFeedback>
                    )
                    }

                </View>
                <View style={{flex: 1}}>
                    {/*-------------COVER----------------*/}
                    <View style={[styleModalItems.modalItemCover, styleBase.background5]}>
                        <View style={[styleBase.center, {flex: 3}]}>
                            <View style={[styleProduct.productItem]}>
                                <View style={[styleBase.center, {flex: 3}]}>
                                    <TextLarge style={[styleBase.textE5]}>
                                        {this.state.category.name.substr(0, 2)}
                                    </TextLarge>
                                </View>
                                <View
                                    style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1}]}>
                                    <TextSmall numberOfLines={1}>{this.state.category.name}</TextSmall>
                                </View>
                            </View>
                        </View>
                        <View style={[styleHome.paddingModal, {flex: 1, paddingVertical: 0}]}>
                            <TextInputNormal
                                value={this.state.category.name}
                                onChangeText={(text) => this.setState({category: {name: text}})}
                                placeholder={"Tên loại"}
                                style={[{flex: 1}]}
                            />
                        </View>
                    </View>
                    <View style={[styleHome.paddingModal]}>
                        <TextNormal>
                            Sản phẩm
                        </TextNormal>
                        <ScrollView style={[styleHome.modalItem]}>
                            {listProduct}
                        </ScrollView>
                    </View>

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


export default connect(mapStateToProps, mapDispatchToProps)(CreateModifyCategoryPopup);