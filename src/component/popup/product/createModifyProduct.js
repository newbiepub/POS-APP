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
            productData:this.props.hasOwnProperty("productData") ? this.props.productData : {},
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
        switch (name) {
            case "itemName" :
                this.setState({itemName: text});
                return;
            case "itemSKU" :
                this.setState({itemSKU: text});
                return;
            case "description" :
                this.setState({description: text});
                return;
            case "newItemName" :
                this.setState({newItemName: text});
                return;
            case "category" :
                this.setState({category: text});
                return;
            case "newItemSKU" :
                this.setState({newItemSKU: text});
                return;
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
                <View style={{flex: 1}}>

                    {
                        this.state.currentView === 'Thêm mặt hàng' &&
                        <AddItem navigator={navigator} {...this.state} instant={this}/>
                    }
                    {
                        this.state.currentView === 'Loại hàng' &&
                        <Category category={this.state.category}
                                  changeCategory={(category) => this.setState({category})}/>
                    }
                    {
                        this.state.currentView === 'Thêm giá' &&
                        <AddPrice listPrice={this.props.hasOwnProperty("item") ? this.props.item.prices : []}/>
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
                                    {this.state.productData.name.substr(0, 2)}
                                </TextLarge>
                            </View>
                            <View
                                style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1}]}>
                                <TextSmall numberOfLines={1}>{instant.state.itemName}</TextSmall>
                            </View>
                        </View>
                    </View>
                    <View style={styleHome.paddingModal}>
                        {/*--------------Name item-----------------*/}
                        <TextInputNormal placeholder={"Tên"}
                                         value={instant.state.itemName}
                                         onChangeText={(text) => {
                                             instant.ChangeItem("itemName", text)
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
                                <TextLarge style={{flex: 1}}>{instant.state.category || 'Chọn loại hàng'}</TextLarge>
                                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*----------------price and SKU-------------------*/}
                        <View style={[styleModalItems.modalItem, {flexDirection: 'row'}]}>
                            <TextInputPriceMask placeholder={"0đ"}
                                                value={instant.state.itemPrice.toString()}
                                                keyboardType={'numeric'}
                                                onChangeText={(num) => {
                                                    instant.setState({itemPrice: num})
                                                }}
                                                style={[styleModalItems.modalTextInput, {flex: 1}]}
                            />
                            <TextInputNormal placeholder={"Mã SKU"}
                                             value={instant.state.itemSKU}
                                             onChangeText={(text) => {
                                                 instant.ChangeItem("itemSKU", text)
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
                                             value={instant.state.description}
                                             onChangeText={(text) => {
                                                 instant.ChangeItem("description", text)
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

    changeCategory(name) {
        this.setState({checkedCategory: name});
        this.props.changeCategory(name)
    }

    render() {
        try {
            var listCategory = this.state.listCategory.map((data) => {
                if (data.hasOwnProperty("name"))
                    return (
                        <TouchableWithoutFeedback key={data.name} onPress={() => {
                            this.changeCategory(data.name)
                        }}>
                            <View style={[styleHome.menuItem, {flexDirection: 'row'}]}>
                                <TextLarge
                                    style={[this.state.checkedCategory === data.name ? styleBase.color2 : styleBase.color3, {flex: 1}]}>{data.name}</TextLarge>
                                <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                    {
                                        this.state.checkedCategory === data.name &&
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
                <View style={styleHome.paddingModal}>
                    {listCategory}
                </View>
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
                                     value={this.props.listPrice[this.props.listPrice.indexOf(data)].type}
                                     onChangeText={(text) => this.props.listPrice[this.props.listPrice.indexOf(data)].type = text}
                                     style={[styleModalItems.modalTextInput, {flex: 1}]}
                    />
                    <View style={[styleHome.borderTop, {flexDirection: 'row'}]}>
                        <TextInputPriceMask placeholder={"0đ"}
                                            value={this.props.data.value}
                                            keyboardType={'numeric'}
                            // onChangeText={(num) => {
                            //     instant.setState({newItemPrice: num})
                            // }}
                                            style={[styleModalItems.modalTextInput, {flex: 1}]}
                        />
                        <TextInputNormal placeholder={"Mã SKU"}
                            // onChangeText={(text) => {
                            //     instant.ChangeItem("newItemSKU", text)
                            // }}
                                         style={[styleModalItems.modalTextInput, {flex: 1}]}
                        />

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
            data: this.props.listPrice.push({name: "", value: 0, SKU: ""})
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
        account: state.account
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);