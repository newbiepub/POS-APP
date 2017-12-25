import React from "react";
import {
    Dimensions, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert,
    TextInput
} from "react-native";
import {TextInputNormal, TextInputPriceMask, TextLarge, TextSmall} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import PriceGrid from '../../company/product/price/priceGrid';
import Entypo from 'react-native-vector-icons/Entypo';
import styleSetting from "../../style/setting";
import config from "../../../config";
import LoadingOverlay from "../../loadingOverlay/loadingOverlay";
import {numberwithThousandsSeparator} from "../../reusable/function";
import * as _ from "lodash";
import {getProduct} from "../../../action/productCompany";

class CreateItem extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.productVariant = [];
        this.state = {
            width,
            productData: this.props.hasOwnProperty("productData") ? this.props.productData : {
                name: "",
                price: [],
                categoryId: '',
                categoryName: '',
                description: "",
                unit: "",
                quantity: 0
            },
            itemName: this.props.hasOwnProperty("item") ? this.props.item.name : "",
            itemPrice: this.props.hasOwnProperty("item") ? this.props.item.price[0].value : "",
            description: this.props.hasOwnProperty("item") ? this.props.item.description : "",
            producer: this.props.hasOwnProperty("item") ? this.props.item.producer : "",
            unit: this.props.hasOwnProperty("item") ? this.props.item.unit : "",
            newItemName: "",
            newItemPrice: 0,
            newItemSKU: "",
            category: this.props.hasOwnProperty("item") ? this.props.item.category : '',
            currentView: 'Thêm mặt hàng',
        };
    }


    closePopup() {
        this.props.closePopup();
    }

    componentDidMount() {
        this.productVariant = this.getVariantProduct(this.props.productData); // Update Product Variant To Parent Component
    }

    ChangeItem(name, text) {
        if (name === "category") {
            this.setState({
                productData: {
                    ...this.state.productData,
                    categoryId: text.id,
                    categoryName: text.name
                }
            })
        } else {
            let productData = {...this.state.productData};
            productData[name] = text;
            this.setState({productData})
        }
    }

    getVariantProduct(item) {
        return item != undefined ? (item.price || []) : [];
    }

    async onCreateProduct() {
        let loadingOverlay = this.refs.loadingOverlay;
        try {
            let {name, price, unit} = this.state.productData,
                {account} = this.props;
            if (loadingOverlay) {
                loadingOverlay.setLoading();
                if (name && price && unit) {
                    let response = await fetch(`${config.api}/company/api/product/create?access_token=${account.access_token}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            ...this.state.productData,
                            productVariant: this.productVariant
                        })
                    });
                    response = await response.json();
                    if (response.success) {
                        Alert.alert("Thành Công", "Thêm Sản Phẩm Mới Thành Công !!", [
                            {text: "OK", onPress: () => {
                                this.props.closePopup();
                                this.props.getProduct();
                            }}
                        ]);
                    }
                } else {
                    return Alert.alert("Thông báo", "Xin mời nhập giá và tên sản phẩm");
                }
                loadingOverlay.stopLoading();
            } else {
                return Alert.alert("Thông báo", "Đã có lỗi xảy ra");
            }
        } catch (e) {
            Alert.alert("Thất bại", "Đã có lỗi xảy ra");
            loadingOverlay.stopLoading();
        }
    }

    async onUpdateProduct() {
        let loadingOverlay = this.refs.loadingOverlay;
        try {
            let {name, price, unit} = this.state.productData,
                {account} = this.props;
            if (loadingOverlay) {
                loadingOverlay.setLoading();
                if (name && price && unit) {
                    let response = await fetch(`${config.api}/company/api/product/update?access_token=${account.access_token}`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            ..._.omit(this.state.productData, ['price']),
                            productVariant: this.productVariant
                        })
                    });
                    response = await response.json();
                    if (response.success) {
                        Alert.alert("Thành Công", "Cập nhật sản phẩm thành công !!", [
                            {text: "OK", onPress: () => {
                                this.props.closePopup();
                                this.props.getProduct();
                            }}
                        ]);
                    }
                } else {
                    return Alert.alert("Thông báo", "Xin mời nhập giá và tên sản phẩm");
                }
                loadingOverlay.stopLoading();
            } else {
                return Alert.alert("Thông báo", "Đã có lỗi xảy ra");
            }
        } catch (e) {
            Alert.alert("Thất bại", "Đã có lỗi xảy ra");
            loadingOverlay.stopLoading();
        }
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>
                    {
                        this.state.currentView === 'Thêm mặt hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.currentView !== 'Thêm mặt hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({currentView: 'Thêm mặt hàng'});
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-arrow-back"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <View style={[{flex: 1}]}>
                        <TextLarge>{this.state.currentView}</TextLarge>
                    </View>
                    {this.state.currentView === 'Thêm mặt hàng' &&
                    (this.props.hasOwnProperty("productData") ?
                            <TouchableOpacity onPress={this.onUpdateProduct.bind(this)}
                                              style={styleHome.modalButtonSubmit}>
                                <TextLarge style={[styleHome.modalButtonSubmitFont]}>Sửa</TextLarge>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={this.onCreateProduct.bind(this)}
                                              style={styleHome.modalButtonSubmit}>
                                <TextLarge style={[styleHome.modalButtonSubmitFont]}>Thêm</TextLarge>
                            </TouchableOpacity>
                    )
                    }

                </View>
                <View style={{flex: 1,}}>

                    {
                        this.state.currentView === 'Thêm mặt hàng' &&
                        <AddItem navigator={navigator} instant={this} productData={this.state.productData}
                                 ChangeItem={(name, text) => this.ChangeItem(name, text)}/>
                    }
                    {
                        this.state.currentView === 'Loại hàng' &&
                        <Category category={this.props.category} checkedCategory={this.state.productData.categoryId}
                                  changeCategory={(name, text) => this.ChangeItem(name, text)}/>
                    }
                    {
                        this.state.currentView === 'Thêm giá' &&
                        <AddPrice
                            instance={this}
                            listPrice={this.productVariant}/>
                    }
                </View>
                <LoadingOverlay ref="loadingOverlay" message="Xin vui lòng chờ"/>
            </View>
        )
    }
}

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            idAddItem: false,
            quantity: this.props.productData.quantity || 0,
            contentWidth: 50
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState) || !_.isEqual(this.props.productData, nextProps.productData);
    }


    changeView(id, name) {
        this.props.instant.setState({currentView: name});
    }

    onSubQuantity() {
        try {
            let quantity = +this.props.productData.quantity || 0;
            this.setState({quantity: quantity > 0 ? --quantity : 0}, () => {
                this.props.ChangeItem("quantity", this.state.quantity);
            });
        } catch (e) {
            console.warn("error - onSubQuantity - createModifyProduct");
        }
    }

    onChangeQuantity(data) {
        try {
            let newNum = data.replace(/\./g, '').replace(/^0+/, '');
            if (isNaN(newNum) !== true) {
                let quantity = +newNum || 0;
                this.setState({quantity: quantity > 0 ? quantity : 0}, () => {
                    this.props.ChangeItem("quantity", );
                });
            }
        } catch (e) {
            console.warn("error - onChangeQuantity - createModifyProduct");
        }
    }

    onAddQuantity() {
        try {
            let quantity = +this.props.productData.quantity || 0;
            this.setState({quantity: ++quantity}, () => {
                this.props.ChangeItem("quantity", this.state.quantity);
            });
        } catch (e) {
            console.warn("error - onAddQuantity - createModifyProduct");
        }
    }

    /**
     * On Change Content Width
     * */
    onChangeContentWidth(contentWidth) {
        alert(JSON.stringify(contentWidth));
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
                                <TextLarge style={[styleBase.textE5]}>
                                    {this.props.productData.name.substr(0, 2) || ""}
                                </TextLarge>
                            </View>
                            <View
                                style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1}]}>
                                <TextSmall numberOfLines={1}>{this.props.productData.name || ""}</TextSmall>
                            </View>
                        </View>
                    </View>
                    <View style={styleHome.paddingModal}>
                        {/*--------------Name item-----------------*/}
                        <View style={[styleModalItems.modalItem, styleModalItems.modalTextInput, {
                            marginTop: 0,
                            borderBottomWidth: 0
                        }]}>
                            <TextInputNormal placeholder={"Tên"}
                                             value={this.props.productData.name || ""}
                                             onChangeText={(text) => {
                                                 this.props.ChangeItem("name", text)
                                             }}

                                             style={[styleModalItems.modalTextInput, {flex: 1}]}
                            />
                        </View>
                        {/*------------------category-------------*/}
                        <TouchableWithoutFeedback onPress={() => {
                            this.changeView('Category', "Loại hàng")
                        }}>
                            <View
                                style={[styleModalItems.modalItem, styleModalItems.modalTextInput, styleBase.row, {marginTop: 0}]}>
                                <TextLarge
                                    style={{flex: 1}}>{this.props.productData.categoryName || 'Chọn loại hàng'}</TextLarge>
                                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*--------------------add price --------------------*/}
                        <View style={[styleModalItems.modalItem, styleModalItems.modalTextInput, {
                            marginTop: 0,
                            borderBottomWidth: 0
                        }]}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView('AddPrice', "Thêm giá")
                            }}>
                                <View style={[styleHome.boxPadding, styleBase.centerVertical, {
                                    flexDirection: 'row',
                                    paddingHorizontal: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#e5e5e5"
                                }]}>
                                    <TextLarge style={{flex: 1}}>Thêm giá</TextLarge>
                                    <EvilIcons name="chevron-right" style={[styleBase.vector32]}/>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                        <View style={[styleModalItems.modalItem, styleModalItems.modalTextInput, {
                            marginTop: 0,
                            borderBottomWidth: 0
                        }]}>
                            <TextInputNormal placeholder={"Mô tả"}
                                             value={this.props.productData.description || ""}
                                             onChangeText={(text) => {
                                                 this.props.ChangeItem("description", text)
                                             }}
                                             style={[styleModalItems.modalTextInput]}
                            />
                        </View>
                        <View style={[styleModalItems.modalItem, styleModalItems.modalTextInput, {
                            marginTop: 0,
                            borderBottomWidth: 0
                        }]}>
                            <TextInputNormal placeholder={"Đơn Vị"}
                                             value={this.props.productData.unit || ""}
                                             onChangeText={(text) => {
                                                 this.props.ChangeItem("unit", text)
                                             }}
                                             style={[styleModalItems.modalTextInput]}
                            />
                        </View>
                        <View style={[{marginTop: 20}]}>
                            <Text style={[styleBase.font18, styleBase.text4, styleBase.bold, {marginBottom: 20}]}>
                                Số Lượng
                            </Text>
                            <View style={[styleBase.row, styleBase.centerHorizontal,{justifyContent: "space-between"}]}>
                                <TouchableOpacity
                                    onPress={this.onSubQuantity.bind(this)}
                                    style={[styleBase.background5, styleBase.center, {paddingVertical: 5, paddingHorizontal: 15}]}>
                                    <Ionicons name="ios-remove-outline" style={[styleBase.font32]}/>
                                </TouchableOpacity>
                                <View style={[styleBase.center, styleBase.row]}>
                                    <TextInput
                                        keyboardType="numeric"
                                        onChangeText={(quantity) => this.onChangeQuantity(quantity)}
                                        onContentSizeChange={(e) => this.onChangeContentWidth(e.nativeEvent)}
                                        value={`${numberwithThousandsSeparator(this.state.quantity)}`}
                                        style={[styleBase.font16, styleBase.text4, {width: this.state.contentWidth}]}/>
                                </View>
                                <TouchableOpacity
                                    onPress={this.onAddQuantity.bind(this)}
                                    style={[styleBase.background5, styleBase.center, {paddingVertical: 5, paddingHorizontal: 15}]}>
                                    <Ionicons name="ios-add-outline" style={[styleBase.font32]}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styleModalItems.modalItem, styleModalItems.modalTextInput, {
                            marginTop: 0,
                            borderBottomWidth: 0
                        }]}>
                            <TextInputNormal placeholder={"Nhà Sản Xuất"}
                                             value={this.props.productData.producer || ""}
                                             onChangeText={(text) => {
                                                 this.props.ChangeItem("producer", text)
                                             }}
                                             style={[styleModalItems.modalTextInput]}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

class Category extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            checkedCategory: this.props.category || ''
        }
    }

    changeCategory(name, id) {
        this.props.changeCategory("category", {id: id, name: name})
    }

    render() {
        try {
            var listCategory = this.props.category.map((data) => {
                if (data.hasOwnProperty("name"))
                    return (
                        <TouchableWithoutFeedback key={data._id} onPress={() => {
                            this.changeCategory(data.name, data._id)
                        }}>
                            <View style={[styleHome.menuItem, {flexDirection: 'row'}, styleBase.centerHorizontal]}>
                                <TextLarge
                                    style={[this.props.checkedCategory === data._id ? styleBase.color2 : styleBase.color3, {flex: 1}]}>{data.name}</TextLarge>
                                <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                    {
                                        this.props.checkedCategory === data._id &&
                                        <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                                    }

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
            })
        } catch (e) {
            console.warn(e);
            return <View> <TextLarge>Không có loại hàng</TextLarge></View>
        }
        return (
            <View style={[styleBase.background4, styleBase.container]}>
                {/*New Category*/}
                <View style={[styleHome.borderBottom, styleModalItems.categoryAddNew, styleHome.paddingModal]}>
                    <TextLarge>Tạo mới loại hàng</TextLarge>
                    <TextInputNormal placeholder={"Tên loại"}
                                     value={this.state.categoryName}
                                     onChangeText={(text) => {
                                         this.setState({categoryName: text})
                                     }}
                                     style={[styleModalItems.modalTextInput, styleModalItems.modalItem]}
                    />
                </View>
                {/*List Category*/}
                <ScrollView>
                    <View style={styleHome.scrollView}>
                        {listCategory}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

class RowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            price: this.props.data.price
        }
    }

    static propTypes = {
        instance: React.PropTypes.object,
        row: React.PropTypes.object,
        data: React.PropTypes.object,
        listPrice: React.PropTypes.array,
        index: React.PropTypes.string
    };

    static defaultProps = {
        data: {name: "", price: 0},
    };

    onRemoveItem() {
        let listPrice = this.props.instance.state.data; // Get List Price
        listPrice.splice(this.props.index, 1);
        this.props.instance.setState({data: listPrice}); // Update List Price
    }

    render() {
        return (
            <View style={[styleHome.borderBottom, styleHome.borderTop, styleBase.center, {
                flexDirection: 'row',
                flex: 1
            }]}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableWithoutFeedback
                        underlayColor={'#eee'}
                        style={{
                            padding: 25,
                            backgroundColor: '#F8F8F8',
                            borderBottomWidth: 1,
                            borderColor: '#eee',

                        }}
                        {...this.props.sortHandlers}
                        delayLongPress={0}
                    >
                        <View>
                            <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex: 15}}>
                    <TextInputNormal placeholder={"Tên"}
                                     value={this.state.name}
                                     onChangeText={(name) => {
                                         this.setState({name}, () => {
                                             let listPrice = this.props.instance.state.data; // Get List Price
                                             listPrice[this.props.index] = {name: this.state.name, price: this.state.price};
                                             this.props.instance.setState({data: listPrice}); // Update List Price
                                         });
                                     }}
                                     style={[styleModalItems.modalTextInput, {flex: 1}]}
                    />
                    <View style={[styleHome.borderTop, {flexDirection: 'row'}]}>
                        <TextInputPriceMask placeholder={"0đ"}
                                            value={this.state.price}
                                            keyboardType={'numeric'}
                                            onChangeText={(price) => {
                                                price = parseInt(price);
                                                if (price >= 0) {
                                                    this.setState({price}, () => {
                                                        let listPrice = this.props.instance.state.data; // Get List Price
                                                        listPrice[this.props.index] = {
                                                            name: this.state.name,
                                                            price: this.state.price
                                                        };
                                                        this.props.instance.setState({data: listPrice}); // Update List Price
                                                    }); // Update Price
                                                }
                                            }}
                                            style={[styleModalItems.modalTextInput, {flex: 1}]}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.onRemoveItem.bind(this)} style={{flex: 1, alignItems: 'center'}}>
                    <Ionicons name={"md-close"} style={[styleBase.vector26, styleBase.color1]}/>
                </TouchableOpacity>
            </View>
        )
    }
}

class AddPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.listPrice || []
        }
    }

    static propTypes = {
        instance: React.PropTypes.object,
        listPrice: React.PropTypes.array
    };

    static defaultProps = {
        instance: {},
        listPrice: []
    };

    onAddPrice() {
        let data = this.state.data;

        data.push({name: '', price: 0});
        this.setState({data});
        this.props.instance.productVariant = this.state.data;
    }

    render() {
        let order = Object.keys(this.state.data); //Array of keys
        return (
            <View style={[styleHome.paddingModal, {flex: 1}]}>
                <View style={[styleBase.row]}>
                    <TouchableOpacity
                        onPress={this.onAddPrice.bind(this)}
                        style={[styleBase.center, styleBase.grow, styleSetting.addTaxButton]}>
                        <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                            Thêm Giá
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.data.length > 0 &&
                    <PriceGrid data={this.state.data} style={{flex: 1}}
                               order={order}
                               onRowMoved={e => {
                                   this.state.data.splice(e.from, 1);
                                   this.state.data.splice(e.to, 0, e.row.data);
                               }}
                               renderRow={(row, sId, index) => <RowComponent key={index} data={row}
                                                                             index={index}
                                                                             instance={this}
                                                                             listPrice={this.state.data}/>}/>
                }

            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup,
    getProduct
};
const mapStateToProps = (state) => {
    return {
        account: state.accountCompany,
        category: state.product.category,
        variantProduct: state.product.variantProduct
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);