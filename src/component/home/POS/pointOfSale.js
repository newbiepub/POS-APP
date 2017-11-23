import React from "react";
import {connect} from "react-redux";
import {Text, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import style from '../../style/POS';
import * as Animate from "react-native-animatable";
import Entypo from 'react-native-vector-icons/Entypo';
import ProductGrid from "../product/product/productGrid";
import CustomAmount from './customAmount';
import Library from './library';
import {TextLarge, TextNormal} from '../../reusable/text';


class POS extends React.PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            currentView: 'GridItems',
            clearSalesVisible: false,
            titleSize: {w: 0, h: 0},
            window: {w: width, h: height},
            clearBoxTop: new Animated.Value(0),
            listCurrentSale: [],
            allItems: [{name: 'Cồn', prices: [{type: "Bình thường", value: 100}]}, {
                name: 'Nước rửa chén',
                prices: [{type: "Bình thường", value: 1323}, {
                    type: "Đặc biệt",
                    value: 4534
                }, {
                    type: "Bìnhassadfsafsfsafsafsafsfsadfsafsafsdfsafasdfsadfasfsadfsafsadf",
                    value: 1323
                }, {type: "Đặc sdaf", value: 4534}]
            }],
            allDiscounts: []
        }
    }

    openMenu() {
      this.props.openMenu();
    }

    changeView(view) {
        this.setState({
            currentView: view
        })
    }

    clearSale() {
        this.setState({
            listCurrentSale: []
        })
        this.openClearSales();
    }

    addToList(itemName, itemPrice) {
        let newItem = {index: this.state.listCurrentSale.length, title: itemName, price: itemPrice};
        this.setState({
            listCurrentSale: [...this.state.listCurrentSale, newItem]
        })
    }


    async openClearSales() {

        if (this.state.listCurrentSale.length > 0) {
            await this.setState({
                clearSalesVisible: !this.state.clearSalesVisible
            });
            if (this.state.clearSalesVisible) {
                Animated.spring(
                    this.state.clearBoxTop,
                    {
                        toValue: this.state.titleSize.h,
                        duration: 200,
                        velocity: 10,
                        friction: 7,
                    },
                ).start();
            } else {
                Animated.spring(
                    this.state.clearBoxTop,
                    {
                        toValue: 0,
                        duration: 200,
                        velocity: 10,
                        friction: 10,
                    },
                ).start();
            }

        }
    }

    getTotalPrice() {
        var totalPrice = 0;
        this.state.listCurrentSale.forEach((item) => {
            totalPrice = totalPrice + item.price
        });
        return this.numberwithThousandsSeparator(totalPrice)
    }

    getWindowSize(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            window: {w: width, h: height}
        })
    }

    numberwithThousandsSeparator(x) {
        let parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }

    getTitleBoxSize(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            titleSize: {w: width, h: height}
        })
    }

    render() {
        let currentView = this.state.currentView;

        let listCurrentSale = this.state.listCurrentSale.map((data) => {
            return (
                <View key={data.index} style={{flexDirection: 'row', padding: 10}}>
                    <TextNormal numberOfLines={1} style={[{flex: 1}]}>{data.title}</TextNormal>
                    <TextNormal numberOfLines={1}>{this.numberwithThousandsSeparator(data.price)}đ</TextNormal>
                </View>
            )
        });
        return (
            <Animate.View animation={"fadeIn"} duration={750} style={[styleBase.container]}
                          onLayout={(event => this.getWindowSize(event))}>

                {/*----------------------------------------Header-------------------------------------*/}

                <View style={[styleHome.header, styleHome.heightHeader]}>
                    <View>
                        <TouchableWithoutFeedback onPress={this.openMenu.bind(this)}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Entypo name="menu" style={[styleHome.iconHeader, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <TouchableWithoutFeedback onPress={() => this.changeView('GridItems')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "GridItems" && styleBase.background2]}>
                                <Entypo name="shop" style={[styleHome.iconHeader, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('Library')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "Library" && styleBase.background2]}>
                                <Entypo name="list" style={[styleHome.iconHeader, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('CustomAmount')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "CustomAmount" && styleBase.background2]}>
                                <Entypo name="calculator" style={[styleHome.iconHeader, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>

                <View style={[{flex: 1, flexDirection: 'row'}]}>
                    {/*----------------------------------------Left-View-------------------------------------*/}
                    <View style={[styleBase.background5, {flex: 0.6}]}>
                        {
                            this.state.currentView === 'GridItems' &&
                            <ProductGrid data={this.state.allItems}/>
                        }
                        {
                            this.state.currentView === 'Library' &&
                            <Library dataItems={this.state.allItems} dataDiscounts={this.state.allDiscounts}/>
                        }
                        {
                            this.state.currentView === 'CustomAmount' &&
                            <CustomAmount addToList={(title, price) => {
                                this.addToList(title, price)
                            }}/>
                        }

                    </View>
                    {/*----------------------------------------Right-View-------------------------------------*/}
                    <View style={[styleHome.box, {flex: 0.4}]}>
                        <TouchableWithoutFeedback onLayout={(event) => this.getTitleBoxSize(event)}
                                                  onPress={this.openClearSales.bind(this)}>
                            <View
                                style={[styleHome.boxTitle, styleHome.borderBottom, style.itemHeight, styleBase.background4, {
                                    zIndex: 6,
                                }]}>
                                <Text style={[styleBase.font18, {flex: 1}]}>
                                    Đang mua
                                </Text>
                                <Entypo name="chevron-thin-down" rotate={90}
                                        style={[styleHome.iconHeader, styleBase.color3,
                                            this.state.clearSalesVisible && {
                                                transform: [{rotate: '180 deg'}]
                                            }]}/>

                            </View>

                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.clearSale.bind(this)}>
                            <Animated.View style={[styleHome.boxTitle, styleBase.background3, {
                                position: 'absolute',
                                zIndex: 5,
                                top: this.state.clearBoxTop,
                                height: this.state.titleSize.h,
                                width: this.state.titleSize.w
                            }]}>

                                <Text style={[styleBase.font18, styleBase.color4, {flex: 1}]}>
                                    Xoá
                                </Text>

                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <ScrollView style={{flex: 1}}>
                            {listCurrentSale}
                        </ScrollView>
                        <View style={[styleBase.background1, style.itemHeight, {
                            justifyContent: 'center',
                            alignItems: 'center'
                        }]}>
                            <Text numberOfLines={1} style={[styleBase.font18, {}]}> Thanh
                                toán {this.getTotalPrice()}đ </Text>
                        </View>
                    </View>
                </View>
            </Animate.View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
};

export default connect(mapStateToProps, null)(POS);