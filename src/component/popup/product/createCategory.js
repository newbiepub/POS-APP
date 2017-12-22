import React from "react";
import {Dimensions, FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, Alert} from "react-native";
import {TextInputNormal, TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as _ from "lodash";
import {createCategory, removeCategory, updateCategory} from "../../../action/category";
import LoadingOverlay from "../../loadingOverlay/loadingOverlay";
import {getProduct} from "../../../action/product";

class CreateModifyCategoryPopup extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.categoryProducts = this.props.hasOwnProperty("category") ? this.props.allProduct.filter(item => item.categoryId === this.props.category._id).map(item => item._id) : [];

        this.state = {
            width,
            category: this.props.hasOwnProperty("category") ? this.props.category : {
                name: '',
            },
            onCheckRadio: false
        };
    }

    closePopup() {
        this.props.closePopup();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const allProductChanged = this.props.allProduct !== nextProps.allProduct,
            onCheckRadio = this.state.onCheckRadio !== nextState.onCheckRadio,
            category = !_.isEqual(this.state.category, nextState.category);
        return allProductChanged || onCheckRadio || category;
    }

    checkIfExistInCategory(product) {
        return _.includes(this.categoryProducts, product._id)
    }


    async pushNewProductInCategory(item) {
        _.includes(this.categoryProducts, item._id) ? _.pull(this.categoryProducts, item._id) : this.categoryProducts.push(item._id);
        this.setState({onCheckRadio: !this.state.onCheckRadio});
    }


    /**
     *  Create Category
     */
    async onCreateCategory() {
        try {
            let {loadingOverlay} = this.refs;
            if (loadingOverlay) {
                loadingOverlay.setLoading();
                let name = this.state.category.name,
                    categoryProducts = this.categoryProducts,
                    response = await createCategory({name, categoryProducts});
                if (response.success) {
                    Alert.alert("Thành Công", "Đã tạo mục thành công !", [{
                        text: "OK", onPress: () => {
                            let {account} = this.props;
                            this.props.closePopup();
                            this.props.getProduct(account.access_token);
                        }
                    }])
                }
                loadingOverlay.stopLoading();
            }
        } catch (e) {
            alert(e);
        }
    }


    /**
     * Update Category
     * */
    async onUpdateCategory() {
        try {
            let {loadingOverlay} = this.refs;
            if (loadingOverlay) {
                loadingOverlay.setLoading();
                let name = this.state.category.name,
                    categoryProducts = this.categoryProducts,
                    response = await updateCategory(this.props.category._id, {name, categoryProducts});
                if (response.success) {
                    Alert.alert("Thành Công", "Cập nhật thành công", [{
                        text: "OK", onPress: () => {
                            let {account} = this.props;
                            this.props.closePopup();
                            this.props.getProduct(account.access_token);
                        }
                    }])
                }
                loadingOverlay.stopLoading();
            }
        } catch (e) {
            alert(e);
        }
    }

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.pushNewProductInCategory(item)}
                          style={[styleHome.borderBottom, styleHome.itemBar, {
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

    async onSubmitRemove() {
        try {
            let categoryId = this.props.category._id,
                response = await removeCategory(categoryId);
            if(response.success) {
                Alert.alert("Thành Công", "Đã xoá mục thành công !", [{
                    text: "OK", onPress: () => {
                        let {account} = this.props;
                        this.props.closePopup();
                        this.props.getProduct(account.access_token);
                    }
                }])
            }
        } catch (e) {
            alert(e);
            console.warn("Error - onSubmitRemove - createCategory");
        }
    }

   async onRemoveCategory() {
       Alert.alert("Cảnh Báo", "Bạn có muốn xoá mục này?", [{
           text: "Huỷ", style: "cancel"
       }, {
            text: "Có", onPress: this.onSubmitRemove.bind(this)
       }])
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.closePopup()
                    }}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={[{flex: 1}]}>
                        <TextLarge>{this.props.type === "create" ? "Tạo loại hàng" : "Cập nhật loại hàng"}</TextLarge>
                    </View>
                    {this.props.type !== 'create' ?
                        <TouchableWithoutFeedback onPress={() => {
                            this.create()
                        }}>
                            <TouchableOpacity
                                onPress={this.onUpdateCategory.bind(this)}
                                style={[styleHome.modalButtonSubmit]}>

                                <TextLarge style={styleHome.modalButtonSubmitFont}>Sửa</TextLarge>
                            </TouchableOpacity>
                        </TouchableWithoutFeedback> :
                        <TouchableWithoutFeedback onPress={() => {
                            this.create()
                        }}>
                            <TouchableOpacity onPress={this.onCreateCategory.bind(this)}
                                              style={[styleHome.modalButtonSubmit]}>

                                <TextLarge style={styleHome.modalButtonSubmitFont}>Thêm</TextLarge>
                            </TouchableOpacity>
                        </TouchableWithoutFeedback>
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
                                extraData={this.state.onCheckRadio}
                                initialNumToRender={15}
                                keyExtractor={(item) => item._id}
                                renderItem={this._renderItem}
                            />
                            {
                                this.props.hasOwnProperty("category") &&
                                <TouchableOpacity onPress={this.onRemoveCategory.bind(this)} style={styleHome.buttonDelete}>
                                    <TextNormal style={styleBase.color4}>Xoá</TextNormal>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </ScrollView>
                <LoadingOverlay ref="loadingOverlay" message="Đang Xử Lý..."/>
            </View>
        )
    }
}

CreateModifyCategoryPopup.propTypes = {
    type: React.PropTypes.string
};

CreateModifyCategoryPopup.defaultProps = {
    type: "create"
};


const mapDispatchToProps = {
    closePopup,
    getProduct
};
const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateModifyCategoryPopup);