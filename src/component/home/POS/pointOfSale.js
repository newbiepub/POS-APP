import React from "react";
import {connect} from "react-redux";
import {Text, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import * as Animate from "react-native-animatable";
import Entypo from 'react-native-vector-icons/Entypo';
import ProductGrid from "../product/product/productGrid";
import CustomAmount from './customAmount';
import Library from './library';
import {TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import {numberwithThousandsSeparator} from '../../reusable/function';

//import ProductGrid from '../product/product/listProduct';
class POS extends React.Component {
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

            allDiscounts: [],
            allProduct: []
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        const differentAllProduct = this.props.allProduct !== nextProps.allProduct;
        const differentCurrentView = this.state.currentView !== nextState.currentView;
        const differentListCart = this.props.cart !== nextProps.cart;
        return differentAllProduct || differentCurrentView || differentListCart;
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
        this.props.cart.forEach((item) => {
            totalPrice = totalPrice + item.totalPrice
        });
        return numberwithThousandsSeparator(totalPrice)
    }

    getWindowSize(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            window: {w: width, h: height}
        })
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
        try {
            var listCurrentSale = this.props.cart.map((data, index) => {
                return (
                    <View key={index} style={{flexDirection: 'row', padding: 10, alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            <TextNormal numberOfLines={2}>{data.name}</TextNormal>
                            {
                                data.quatity > 1 &&
                                <TextSmall style={styleBase.color6}>x{data.quatity}</TextSmall>
                            }

                        </View>
                        <TextNormal numberOfLines={1}>{numberwithThousandsSeparator(data.totalPrice)}đ</TextNormal>
                    </View>
                )
            });
        } catch (e) {
            console.warn(e)
            return <View></View>
        }

        return (
            <Animate.View animation={"fadeIn"} duration={750} style={[styleBase.container]}
                          onLayout={(event => this.getWindowSize(event))}>

                {/*----------------------------------------Header-------------------------------------*/}

                <View style={[styleHome.header]}>
                    <View>
                        <TouchableWithoutFeedback onPress={this.openMenu.bind(this)}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <TouchableWithoutFeedback onPress={() => this.changeView('GridItems')}>
                            <View
                                style={[styleHome.itemHeader, currentView === "GridItems" && styleBase.background2]}>
                                <Entypo name="shop" style={[styleBase.vector26, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('Library')}>
                            <View
                                style={[styleHome.itemHeader, currentView === "Library" && styleBase.background2]}>
                                <Entypo name="list" style={[styleBase.vector26, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('CustomAmount')}>
                            <View
                                style={[styleHome.itemHeader, currentView === "CustomAmount" && styleBase.background2]}>
                                <Entypo name="calculator" style={[styleBase.vector26, styleBase.color4]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>

                <View style={[{flex: 1, flexDirection: 'row'}]}>
                    {/*----------------------------------------Left-View-------------------------------------*/}
                    <View style={[styleBase.background5, {flex: 0.6}]}>
                        {
                            this.state.currentView === 'GridItems' &&
                            <ProductGrid data={this.props.allProduct}/>
                        }
                        {
                            this.state.currentView === 'Library' &&
                            <Library dataProducts={this.props.allProduct} dataDiscounts={this.state.allDiscounts}/>
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
                                style={[styleHome.titleBar, {
                                    zIndex: 6,
                                }]}>
                                <TextLarge style={[{flex: 1}]}>
                                    Đang mua
                                </TextLarge>
                                <Entypo name="chevron-thin-down" rotate={90}
                                        style={[styleBase.vector26, styleBase.color3,
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
                        <View style={styleHome.buttonCharge}>
                            <TextLarge numberOfLines={1}> Thanh toán {this.getTotalPrice()}đ </TextLarge>
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
        allProduct: state.product.allProduct,
        cart: state.cart.currentCart
    }
};

export default connect(mapStateToProps, null)(POS);