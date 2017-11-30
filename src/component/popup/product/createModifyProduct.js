import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, Platform,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextInputPriceMask} from '../../reusable/text';
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

class CreateItem extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width,
            productData: this.props.hasOwnProperty("productData") ? this.props.productData : {
                name: "",
                price: 0,
                categoryId: '',
                categoryName: '',
                description: ""
            },
            itemName: this.props.hasOwnProperty("item") ? this.props.item.name : "",
            itemPrice: this.props.hasOwnProperty("item") ? this.props.item.prices[0].value : "",
            itemSKU: this.props.hasOwnProperty("item") ? this.props.item.prices[0].SKU : "",
            description: this.props.hasOwnProperty("item") ? this.props.item.description : "",
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


    ChangeItem(name, text) {
        if (name === "name") {
            this.setState({
                productData: {
                    ...this.state.productData,
                    name: text
                }
            })
        }
        if (name === "category") {
            this.setState({
                productData: {
                    ...this.state.productData,
                    categoryId: text.id,
                    categoryName: text.name
                }
            })
        }
        if (name === "price") {
            this.setState({
                productData: {
                    ...this.state.productData,
                    price: text
                }
            })
        }
        if (name === "description") {
            this.setState({
                productData: {
                    ...this.state.productData,
                    description: text
                }
            })
        }


    }

    getVariantProduct(id, allVariant) {
        let variant = []
        allVariant.forEach(async (item) => {
            if (id === item.productVariantParent) {
                await variant.push(item);
            }
        });
        return variant;
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
                    (this.props.hasOwnProperty("item") ?
                            <TouchableWithoutFeedback onPress={() => {
                                this.create()
                            }}>
                                <View style={styleHome.modalButtonSubmit}>

                                    <TextLarge style={[styleHome.modalButtonSubmitFont]}>Sửa</TextLarge>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback onPress={() => {
                                this.create()
                            }}>
                                <View style={styleHome.modalButtonSubmit}>

                                    <TextLarge style={[styleHome.modalButtonSubmitFont]}>Thêm</TextLarge>
                                </View>
                            </TouchableWithoutFeedback>
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
                    <AddPrice listPrice={ this.getVariantProduct(this.state.productData._id || "",this.props.variantProduct) }/>
                    }
                </View>


            </View>
        )
    }
}

class AddItem extends React.PureComponent {
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
                        <TextInputNormal placeholder={"Tên"}
                                         value={this.props.productData.name || ""}
                                         onChangeText={(text) => {
                                             this.props.ChangeItem("name", text)
                                         }}

                                         style={[styleModalItems.modalTextInput, {flex: 1}]}
                        />
                        {/*------------------category-------------*/}
                        <TouchableWithoutFeedback onPress={() => {
                            this.changeView('Category', "Loại hàng")
                        }}>
                            <View style={[styleHome.boxPadding, styleBase.centerVertical, {
                                flexDirection: 'row',
                                paddingHorizontal: 0
                            }]}>
                                <TextLarge
                                    style={{flex: 1}}>{this.props.productData.categoryName || 'Chọn loại hàng'}</TextLarge>
                                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*----------------price and SKU-------------------*/}
                        <View style={[styleModalItems.modalItem, {flexDirection: 'row'}]}>
                            <TextInputPriceMask placeholder={"0đ"}
                                                value={this.props.productData.price.toString() || ""}
                                                keyboardType={'numeric'}
                                                onChangeText={(num) => {
                                                    this.props.ChangeItem("price", num)
                                                }}
                                                style={[styleModalItems.modalTextInput, {flex: 1}]}
                            />

                        </View>
                        {/*--------------------add price --------------------*/}
                        <View style={[styleModalItems.modalItem,]}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView('AddPrice', "Thêm giá")
                            }}>
                                <View style={[styleHome.boxPadding, styleBase.centerVertical, {
                                    flexDirection: 'row',
                                    paddingHorizontal: 0
                                }]}>
                                    <TextLarge style={{flex: 1}}>Thêm giá</TextLarge>
                                    <EvilIcons name="chevron-right" style={[styleBase.vector32]}/>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                        <View style={[styleModalItems.modalItem]}>
                            <TextInputNormal placeholder={"Mô tả"}
                                             value={this.props.productData.description || ""}
                                             onChangeText={(text) => {
                                                 this.props.ChangeItem("description", text)
                                             }}
                                             style={[styleModalItems.modalTextInput, {flex: 1}]}
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
            listCategory: [{name: 'Không'}, {name: 'kho'}, {name: 'long'}],
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
                            <View style={[styleHome.menuItem, {flexDirection: 'row'}]}>
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
                <ScrollView >
                    <View style={styleHome.scrollView}>
                        {listCategory}
                    </View>

                </ScrollView>
            </View>
        )
    }
}

class RowComponent extends React.Component {
    render() {
        let data = this.props.data;
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
                                     value={this.props.data.name}
                                     onChangeText={(text) => this.props.listPrice[this.props.listPrice.indexOf(data)].type = text}
                                     style={[styleModalItems.modalTextInput, {flex: 1}]}
                    />
                    <View style={[styleHome.borderTop, {flexDirection: 'row'}]}>
                        <TextInputPriceMask placeholder={"0đ"}
                                            value={this.props.data.price}
                                            keyboardType={'numeric'}
                            // onChangeText={(num) => {
                            //     instant.setState({newItemPrice: num})
                            // }}
                                            style={[styleModalItems.modalTextInput, {flex: 1}]}
                        />
                        {/*<TextInputNormal placeholder={"Mã SKU"}*/}
                            {/*// onChangeText={(text) => {*/}
                            {/*//     instant.ChangeItem("newItemSKU", text)*/}
                            {/*// }}*/}
                                         {/*style={[styleModalItems.modalTextInput, {flex: 1}]}*/}
                        {/*/>*/}

                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Ionicons name={"md-close"} style={[styleBase.vector26, styleBase.color1]}/>
                </View>
            </View>
        )
    }
}

class AddPrice extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.listPrice.push({name: "", price: 0})
        }
    }

    render() {

        let order = Object.keys(this.props.listPrice) //Array of keys
        return (
            <View style={[styleHome.paddingModal, {flex: 1}]}>

                <PriceGrid data={this.props.listPrice} style={{flex: 1}}
                           order={order}
                           onRowMoved={e => {
                               this.props.listPrice.splice(e.from, 1);
                               this.props.listPrice.splice(e.to, 0, e.row.data);
                           }}
                           renderRow={row => <RowComponent data={row} listPrice={this.props.listPrice}/>}/>
            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        category: state.product.category,
        variantProduct: state.product.variantProduct
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);