import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback} from "react-native";
import {TextNormal, TextLarge} from '../reuseable/ui/text';
import Header from '../reuseable/ui/header';
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../style/base';
import {graphql} from 'react-apollo';
import {QUERY} from '../../constant/query';
import GridProduct from './gridProduct';
import CustomAmount from './customAmount'

class POS extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clearSalesVisible: false,
            rightSideWidth: 0,
            currentView: "customAmount",

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
                <Header tabView={true}>
                    <View style={style.tabView}>

                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'gridProduct'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'gridProduct' && {backgroundColor: constantStyle.color2}]}>
                            <View>
                                <Entypo name="shop" style={style.tabIcon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'library'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'library' && {backgroundColor: constantStyle.color2}]}>
                            <View>
                                {/*<Entypo name="list" style={style.tabIcon}/>*/}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({currentView: 'customAmount'})
                        }}
                                          style={[style.tabItem, this.state.currentView === 'customAmount' && {backgroundColor: constantStyle.color2}]}>
                            <View>
                                <Entypo name="calculator" style={style.tabIcon}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Header>
                <View style={{flex: 1, flexDirection: "row"}}>
                    {/*---------------Left Side------------------------*/}
                    <View style={{flex: 0.6}}>
                        {
                            this.state.currentView === 'gridProduct' &&
                            <GridProduct data={this.props.productsData.products}/>
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
        fontSize: constantStyle.sizeLarge
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
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default graphql(QUERY.PRODUCTS, {name: 'productsData'})(POS);