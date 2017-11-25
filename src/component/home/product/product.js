import React, {PureComponent} from "react";
import {TextInput, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView} from "react-native";
import {TextLarge, TextNormal, TextInputNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: 'allProduct', name: 'Mặt hàng'}, {id: 'category', name: 'Loại hàng'}, {
                id: 'discount',
                name: 'Khuyến mãi'
            }],
            searchText: '',
            selected: {id: 'allProduct', name: 'Mặt hàng'},
        }
    }

    onSelection(id) {
        this.setState({
            selected: id
        })
    }

    previewCategory(category) {
        this.setState({
            selected: {
                id: 'previewCategory',
                name: category.name,
                data: category
            }
        })

    }

    render() {
        try {
            var list = this.state.list.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.id} onPress={() => {
                        this.onSelection(data)
                    }}>
                        <View
                            style={[styleHome.boxPadding, this.state.selected.id === data.id && styleBase.background3, styleHome.heightHeader, styleBase.centerVertical]}>
                            <TextNormal
                                style={[this.state.selected.id === data.id && styleBase.color4]}>{data.name}</TextNormal>
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
            <View style={[styleBase.container, styleBase.background4, {flexDirection: 'row'}]}>
                {/*----------------leftSide--------------------*/}
                <View style={[styleHome.borderRight, {flex: 3}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextLarge style={[styleBase.color3]}>Mặt hàng</TextLarge>
                    </View>
                    {/*content*/}
                    <View>
                        {list}
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>

                        {
                            this.state.selected.id === 'previewCategory' &&
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({
                                    selected: {id: 'category', name: 'Loại hàng'},
                                })
                            }}>
                                <EvilIcons name="arrow-left"
                                           style={[styleHome.titleBarIconBack]}/>
                            </TouchableWithoutFeedback>
                        }
                        <TextLarge style={[styleBase.color3]}>{this.state.selected.name}</TextLarge>
                    </View>

                    <View>
                        {/*------Search------------*/}

                        <View style={styleHome.itemBar}>
                            <View style={[styleHome.itemBarIcon,styleBase.background4]}>
                                <EvilIcons name="search" style={[styleBase.vector26]}/>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextInput value={this.state.searchText} placeholder={`Tìm kiếm ${this.state.selected.name.toLowerCase()}...`}
                                           onChangeText={(text) => {
                                               this.setState({searchText: text})
                                           }} style={[styleBase.font16, {flex: 1}]}/>
                                {
                                    this.state.searchText !== '' &&
                                    <TouchableWithoutFeedback onPress={() => this.setState({searchText: ''})}>
                                        <EvilIcons name="close" style={[styleBase.vector26]}/>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        </View>

                        {/*content*/}
                        {
                            this.state.selected.id === 'allProduct' &&
                            <AllProduct allItem={this.props.allItem} openPopup={() => this.props.openPopup()}
                                        renderPopup={(renderContent) => this.props.renderPopup(renderContent)}/>
                        }
                        {
                            this.state.selected.id === 'category' &&
                            <Category allProduct={this.props.allItem} category={this.props.category}
                                      openPopup={() => this.props.openPopup()}
                                      previewCategory={(category) => {
                                          this.previewCategory(category)
                                      }}
                                      renderPopup={(renderContent) => this.props.renderPopup(renderContent)}/>
                        }
                        {
                            this.state.selected.id === 'previewCategory' &&
                            <CategoryPreview category={this.state.selected.data}
                                             allProduct={this.props.allItem} openPopup={() => this.props.openPopup()}
                                             renderPopup={(renderContent) => this.props.renderPopup(renderContent)}/>
                        }
                        {
                            this.state.selected.id === 'discount' &&
                            <Discount allDiscount={this.props.allDiscount}/>
                        }

                    </View>
                </View>
            </View>
        )
    }
}

class AllProduct extends React.PureComponent {

    createItem() {
        this.props.renderPopup(<CreateModifyProductPopup/>);
        this.props.openPopup();
    }

    modifyItem(item) {
        this.props.renderPopup(<CreateModifyProductPopup item={item}/>);
        this.props.openPopup();
    }

    render() {
        try {
            var listAllItem = this.props.allItem.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.modifyItem(data)}>
                        <View style={[styleHome.itemBar]}>
                            <View style={[styleHome.itemBarIcon]}>

                                <TextNormal style={styleBase.background2}>{data.name.substr(0, 2)}</TextNormal>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextSmall style={{flex: 1}}>{data.name}</TextSmall>
                                <TextSmall> {Object.keys(data.prices).length} giá</TextSmall>
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

            <ScrollView>
                <View style={[styleHome.paddingModal]}>
                    <TouchableWithoutFeedback onPress={() => this.createItem()}>
                        <View style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center]}>
                            <TextNormal style={[styleBase.color2]}>Thêm hàng</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.listItem, styleHome.borderTop]}>
                        {listAllItem}
                    </View>
                </View>

            </ScrollView>
        )
    }
}

class Category extends React.PureComponent {

    createCategory() {
        this.props.renderPopup(<CreateCategory allProduct={this.props.allProduct}/>);
        this.props.openPopup();
    }

    render() {
        try {
            var listCategory = this.props.category.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.props.previewCategory(data)}>
                        <View style={[styleHome.categoryBar]}>
                            <TextNormal style={{flex: 1}}>{data.name}</TextNormal>
                            <EvilIcons name="chevron-right" style={styleBase.vector32}/>
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

            <ScrollView>
                <View style={[styleHome.paddingModal]}>
                    <TouchableWithoutFeedback onPress={() => this.createCategory()}>
                        <View style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center]}>
                            <TextNormal style={[styleBase.color2]}>Thêm loại</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.listItem,]}>
                        {listCategory}
                    </View>
                </View>

            </ScrollView>
        )
    }
}


class CategoryPreview extends React.PureComponent {
    modifyCategory() {
        this.props.renderPopup(<CreateCategory allProduct={this.props.allProduct} category={this.props.category}/>);
        this.props.openPopup();
    }

    render() {
        try {
            var listProductInCategory = this.props.allProduct.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name}>
                        <View style={styleHome.itemBar}>
                            <View style={styleHome.itemBarIcon}>

                                <TextNormal style={styleBase.background2}>{data.name.substr(0, 2)}</TextNormal>
                            </View>
                            <View style={styleHome.itemBarTitle}>
                                <TextSmall style={{flex: 1}}>{data.name}</TextSmall>
                                <TextSmall> {Object.keys(data.prices).length} giá</TextSmall>
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
            <ScrollView>
                <View style={[styleHome.paddingModal]}>
                    <TouchableWithoutFeedback onPress={() => this.modifyCategory()}>
                        <View style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center]}>
                            <TextNormal style={[styleBase.color2]}>Thêm hàng</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.listItem, styleHome.borderTop]}>
                        {listProductInCategory}
                    </View>
                </View>

            </ScrollView>

        )
    }
}


class Discount extends React.PureComponent {
    render() {
        try {
            var listDiscount = this.props.allDiscount.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.modifyItem(data)}>
                        <View style={[styleHome.itemBar]}>
                            <View style={[styleHome.itemBarIcon]}>

                                <Octicons name={"tag"} style={[styleBase.vector26]}/>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextSmall style={{flex: 1}}>{data.name}</TextSmall>
                                <TextSmall>{data.value}</TextSmall>
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

            <ScrollView>
                <View style={[styleHome.paddingModal]}>
                    <TouchableWithoutFeedback>
                        <View style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center]}>
                            <TextNormal style={[styleBase.color2]}>Thêm khuyến mãi</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.listItem, styleHome.borderTop]}>
                        {listDiscount}
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        allItem: state.product.allItem,
        category: state.product.category,
        allDiscount: state.product.allDiscount,

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);