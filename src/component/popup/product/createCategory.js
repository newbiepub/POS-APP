import React from "react";
import {Dimensions, FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View,} from "react-native";
import {TextInputNormal, TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CreateModifyCategoryPopup extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width,
            category: this.props.hasOwnProperty("category") ? this.props.category : {
                name: '',
            },
        };
    }


    closePopup() {
        this.props.closePopup();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const allProductChanged = this.props.allProduct !== nextProps.allProduct;
        return allProductChanged
    }

    checkIfExistInCategory(product) {
        if (this.props.hasOwnProperty("category")) {
            if (product.categoryId === this.props.category._id) {
                return true
            }
        }
        return false


    }


    async pushNewProductInCategory(item) {
        item.categoryId = await this.props.category._id;
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={[styleHome.borderBottom, styleHome.itemBar, {
            flexDirection: 'row',
            flex: 1
        }]}>
            <View style={[styleHome.itemIcon, {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }]}>

                <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
            </View>
            <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
                <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                <View style={[styleBase.center, styleHome.borderRadioButton]}>
                    {
                        this.checkIfExistInCategory(item) === true &&
                        <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>
                    {
                        this.state.currentView === 'Tạo loại hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
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
                                    style={[styleHome.modalButtonSubmit]}>

                                    <TextLarge style={styleHome.modalButtonSubmitFont}>Sửa</TextLarge>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback onPress={() => {
                                this.create()
                            }}>
                                <View
                                    style={[styleHome.modalButtonSubmit]}>

                                    <TextLarge style={styleHome.modalButtonSubmitFont}>Thêm</TextLarge>
                                </View>
                            </TouchableWithoutFeedback>
                    )
                    }

                </View>
                <ScrollView style={{flex: 1}}>
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
                        <View style={[styleHome.modalItem]}>
                            <FlatList
                                data={this.props.allProduct}
                                extraData={this.state}
                                initialNumToRender={15}
                                keyExtractor={(item) => item._id}
                                renderItem={this._renderItem}
                            />
                            {
                                this.props.hasOwnProperty("category") &&
                                <View style={styleHome.buttonDelete}>
                                    <TextNormal style={styleBase.color4}>Xoá</TextNormal>
                                </View>

                            }
                        </View>

                    </View>

                </ScrollView>


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