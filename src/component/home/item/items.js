import React, {PureComponent} from "react";
import {TextInput, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView} from "react-native";
import {TextLarge, TextNormal, TextInputNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
class Item extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: 'allItem', name: 'Mặt hàng'}, {id: 'category', name: 'Loại hàng'}, {
                id: 'discount',
                name: 'Khuyết mãi'
            }],
            selected: {id: 'allItem', name: 'Mặt hàng'},
        }
    }

    onSelection(id) {
        this.setState({
            selected: id
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
                        style={[styleHome.heightHeader, styleBase.background6, styleBase.centerHorizontal, {flexDirection: 'row'}]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Entypo name="menu" style={[styleHome.iconHeader, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextLarge style={[styleBase.color3]}>Mặt hàng</TextLarge>
                    </View>
                    {/*contentr*/}
                    <View>
                        {list}
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.heightHeader, styleBase.background6, styleBase.centerHorizontal, styleHome.boxPadding, {flexDirection: 'row'}]}>
                        <TextLarge style={[styleBase.color3]}>{this.state.selected.name}</TextLarge>
                    </View>

                    <View>
                        {/*------Search------------*/}

                        <View
                            style={[styleHome.heightHeader, styleHome.boxPadding, styleHome.borderBottom, {flexDirection: 'row'}]}>
                            <View style={[styleBase.background4, {
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }]}>
                                <EvilIcons name="search"
                                           style={[styleBase.vector26, styleBase.background4, {alignSelf: 'center'}]}/>
                            </View>
                            <View style={[styleHome.boxTitle, styleHome.boxTitle, {flex: 1}]}>
                                <TextInput value={this.state.searchText} placeholder={"Tìm kiếm ..."}
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
                            this.state.selected.id === 'allItem' &&
                            <AllItem allItem={this.props.allItem}/>
                        }
                        {
                            this.state.selected.id === 'category' &&
                            <Category category={this.props.category}/>
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

class AllItem extends React.PureComponent {
    render() {
        try {
            var listAllItem = this.props.allItem.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.onPressItem(data)}>
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
                    <TouchableWithoutFeedback>
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
    render() {
        try {
            var listCategory = this.props.category.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.onPressItem(data)}>
                        <View style={[styleHome.itemBar, {
                            flexDirection: 'row',
                            flex: 1
                        }]}>
                            <TextNormal style={{flex:1}}>{data.name}</TextNormal>
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
                    <TouchableWithoutFeedback>
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
class Discount extends React.PureComponent {
    render() {
        try {
            var listDiscount = this.props.allDiscount.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.name} onPress={() => this.onPressItem(data)}>
                        <View style={[styleHome.borderBottom, styleHome.itemBar, {
                            flexDirection: 'row',
                            flex: 1
                        }]}>
                            <View style={[styleHome.itemIcon, {
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }]}>

                               <Octicons name={"tag"} style={[styleBase.vector26]}/>
                            </View>
                            <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
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
                    <View style={[styleHome.listItem,styleHome.borderTop]}>
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
        allItem: state.item.allItem,
        category: state.item.category,
        allDiscount : state.item.allDiscount,

    }
};
export default connect(mapStateToProps, null)(Item);