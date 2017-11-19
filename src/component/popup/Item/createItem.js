import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, Platform,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextInputPriceMask} from '../../reusable/text';

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

class CreateItem extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width,
            itemName: "",
            itemPrice: 0,
            itemSKU: "",
            description: "",
            newItemName: "",
            newItemPrice: 0,
            newItemSKU: "",
            category: '',
            currentView: 'Thêm mặt hàng',
            modalWidth: 0
        };
    }


    closePopup() {
        this.props.closePopup();
    }

    measureView(event) {
        this.setState({
            modalWidth: event.nativeEvent.layout.width
        })
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

    async getNumberInput(name, num) {
        let newNum =await num.replace(/\./g, '');
        if (isNaN(newNum) !== true) {
            switch (name) {
                case "itemPrice" :
                    this.setState({itemPrice: newNum});
                    return;
                case "newItemPrice" :
                    this.setState({newItemPrice: newNum});
                    return;
            }
        }
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "AddItem":
                return <AddItem navigator={navigator} {...this.state} instant={this}/>;
            case "Category":
                return <Category modalWidth={this.state.modalWidth} category={this.state.category}
                                 changeCategory={(category) => this.setState({category})}/>

        }
    }

    onWillFocus(route) {

    }

    async create() {
        // console.warn(JSON.stringify(this.props.account.access_token));
        let {access_token} = this.props.account;
        let response = await  fetch(`http://localhost:3000/api/category/createCategory?access_token=${access_token}&companyId=helo&employeeId=&nam=long`);
        response = await response.json();
        console.warn('api', JSON.stringify(response))
    }

    configureScene(route, navigator) {
        if (route.id === "POS") {
            return Navigator.SceneConfigs.FadeAndroid
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]} onLayout={(event) => this.measureView(event)}>
                {/*-----------Header_____________------*/}
                <View style={[styleHome.heightHeader, styleBase.centerHorizontal, styleHome.borderBottom, {
                    flexDirection: 'row'
                }]}>
                    {
                        this.state.currentView === 'Thêm mặt hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.currentView === 'Loại hàng' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({currentView: 'Thêm mặt hàng'});
                            this.navigator.pop()
                        }}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Ionicons name={"md-arrow-back"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <View style={[{flex: 1}]}>
                        <TextLarge>{this.state.currentView}</TextLarge>
                    </View>
                    {this.state.currentView === 'Thêm mặt hàng' &&
                    <TouchableWithoutFeedback onPress={() => {
                        this.create()
                    }}>
                        <View
                            style={[styleBase.center, styleBase.background2, styleHome.heightHeader, styleHome.boxTitle]}>

                            <TextLarge style={[styleBase.color5]}>Thêm</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                    }

                </View>
                <View style={{flex: 1}}>
                    <Navigator
                        ref={(ref) => {
                            this.navigator = ref;
                        }}
                        initialRoute={{id: 'AddItem', index: 0}}
                        configureScene={this.configureScene.bind(this)}
                        renderScene={this.renderScene.bind(this)}

                    />
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


    changeViewCategory() {
        this.props.instant.setState({currentView: 'Loại hàng'});
        this.props.navigator.push({
            id: 'Category',
        })
    }

    numberwithThousandsSeparator(x) {
        try{
            let parts = x.toString().split(",");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(".");
        }catch(e)
        {
            console.warn(e);
            return x + "đ";
        }


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
                                    {instant.state.itemName.substr(0, 2)}
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
                            this.changeViewCategory()
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
                                this.setState({isAddItem: !this.state.isAddItem})
                            }}>
                                <View style={[styleHome.boxPadding, styleBase.centerVertical, {
                                    flexDirection: 'row',
                                    paddingHorizontal: 0
                                }]}>
                                    <TextLarge style={{flex: 1}}>Thêm giá</TextLarge>
                                    <EvilIcons name="chevron-down" style={[styleBase.vector32, this.state.isAddItem && {
                                        transform: [{rotate: '180 deg'}]
                                    }]}/>
                                </View>
                            </TouchableWithoutFeedback>
                            {
                                this.state.isAddItem &&
                                <View>
                                    <TextInputNormal placeholder={"Tên"} value={instant.state.newItemName}
                                                     onChangeText={(text) => instant.ChangeItem("newItemName", text)}
                                                     style={[styleModalItems.modalTextInput, {flex: 1}]}
                                    />
                                    <View style={[{flexDirection: 'row', marginTop: 20}]}>
                                        <TextInputPriceMask placeholder={"0đ"}
                                                            value={instant.state.newItemPrice.toString()}
                                                            keyboardType={'numeric'}
                                                            onChangeText={(num) => {
                                                                    instant.setState({newItemPrice: num})
                                                            }}
                                                            style={[styleModalItems.modalTextInput, {flex: 1}]}
                                        />
                                        <TextInputNormal placeholder={"Mã SKU"}
                                                         value={instant.state.newItemSKU}
                                                         onChangeText={(text) => {
                                                             instant.ChangeItem("newItemSKU", text)
                                                         }}
                                                         style={[styleModalItems.modalTextInput, {flex: 1}]}
                                        />

                                    </View>
                                </View>

                            }

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

const mapDispatchToProps = {
    closePopup
};
const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);