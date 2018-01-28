import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback} from "react-native";
import {TextNormal, TextLarge, TextSmall} from '../../component/text';
import Header from '../../component/header';
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../style/base';
import {graphql} from 'react-apollo';
import {QUERY} from '../../constant/query';
import {connect} from 'react-redux';
import GridProduct from './gridProduct';
import Library from './library';
import CustomAmount from './customAmount'
import {numberwithThousandsSeparator} from "../../reuseable/function/function";

class POS extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clearSalesVisible: false,
            rightSideWidth: 0,
            currentView: "gridProduct",

        }
    }

    getRightSideWidth(evt) {
        let width = evt.nativeEvent.layout.width;
        this.setState({
            rightSideWidth: width
        })
    }

    render() {
        return (
            <View style={style.container}>
                {/*---------------Header------------------------*/}
                <Header type={"tabView"}>
                    <View style={style.tabView}>

                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'gridProduct'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'gridProduct' && style.tabItemSelected]}>
                            <View>
                                <Entypo name="shop"
                                        style={[style.tabIcon, this.state.currentView === 'gridProduct' && style.tabIconSelected]}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'library'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'library' && style.tabItemSelected]}>
                            <View>
                                <Entypo name="list"
                                        style={[style.tabIcon, this.state.currentView === 'library' && style.tabIconSelected]}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'customAmount'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'customAmount' && style.tabItemSelected]}>
                            <View>
                                <Entypo name="calculator"
                                        style={[style.tabIcon, this.state.currentView === 'customAmount' && style.tabIconSelected]}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Header>
                <View style={{flex: 1, flexDirection: "row"}}>
                    {/*---------------Left Side------------------------*/}
                    <View style={{flex: 0.6}}>
                        {
                            this.state.currentView === 'gridProduct' &&
                            <GridProduct/>
                        }
                        {
                            this.state.currentView === 'library' &&
                            <Library/>
                        }
                        {
                            this.state.currentView === 'customAmount' &&
                            <CustomAmount/>
                        }

                    </View>
                    {/*---------------Right Side------------------------*/}
                    <View style={{flex: 0.4, borderLeftColor: constantStyle.colorBorder, borderLeftWidth: 1}}>
                        <TouchableOpacity onLayout={(event) => this.getRightSideWidth(event)}>
                            <View
                                style={[style.buttonClearCart, {width: this.state.rightSideWidth}, this.state.clearSalesVisible && style.buttonClearCartOpen]}>
                                <TextLarge style={[{color: 'white'}]}>
                                    Xoá
                                </TextLarge>
                            </View>

                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({clearSalesVisible: !this.state.clearSalesVisible})
                        }}>
                            <View style={style.buttonShopping}>
                                <TextLarge style={[{flex: 1}]}>
                                    Đang mua
                                </TextLarge>
                                <Entypo name="chevron-thin-down" rotate={90}
                                        style={[{fontSize: constantStyle.sizeLarge}, this.state.clearSalesVisible && {
                                            transform: [{rotate: '180 deg'}]
                                        }]}/>

                            </View>

                        </TouchableWithoutFeedback>

                        <View style={{flex: 1}}>
                            {
                                this.props.cart.map((item) => {
                                    return (
                                        <View style={style.cartItem} key={item._id}>
                                            <View style={style.cartItemTitle}>
                                                <TextNormal>{item.name}</TextNormal>
                                                {
                                                    item.quantity > 1 &&
                                                    <TextSmall style={{color: 'gray'}}>x{item.quantity}</TextSmall>
                                                }

                                            </View>
                                            <TextSmall>{numberwithThousandsSeparator(item.price)}{item.currency}</TextSmall>

                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={style.buttonCharge}>
                            <TextLarge>
                                Thanh toán
                            </TextLarge>

                        </View>
                    </View>
                </View>


            </View>

        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.colorBackground
    },
    tabView: {
        flex: 1,
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        fontSize: constantStyle.sizeNormal,
        color: constantStyle.color2
    },
    tabItemSelected: {
        backgroundColor: constantStyle.color2
    },
    tabIconSelected: {
        color: constantStyle.color1
    },
    buttonShopping: {
        height: constantStyle.headerHeight,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
        backgroundColor: constantStyle.color2,
        zIndex: 2
    },
    buttonClearCart: {
        paddingHorizontal: 20,
        height: constantStyle.headerHeight,
        zIndex: 1,
        position: 'absolute',
        justifyContent: 'center',

        backgroundColor: "black",
    },
    buttonClearCartOpen: {
        top: constantStyle.headerHeight,

    },
    buttonCharge: {
        height: constantStyle.headerHeight,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
        backgroundColor: constantStyle.color1
    },
    cartItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems:'center'
    },
    cartItemTitle: {
        flex: 1
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}
export default connect(mapStateToProps, null)(POS);
// export default graphql(QUERY.PRODUCTS, {
//     name: 'productsData', options: {
//         fetchPolicy: "cache-and-network"
//     }
// })(POS);