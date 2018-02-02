import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback} from "react-native";
import {TextNormal, TextLarge, TextSmall} from '../../component/text';
import Header from '../../component/header';
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../style/base';
import {graphql} from 'react-apollo';
import {QUERY} from '../../constant/query';
import GridProduct from './gridView/gridProduct';
import Library from './library';
import CustomAmount from './customAmount';
import Cart from '../../component/cart/cart';

class POS extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clearSalesVisible: false,
            currentView: "gridProduct",

        }
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
                            <GridProduct loginExpire={() => this.props.loginExpire()}/>
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
                        <Cart/>
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
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default POS;
// export default graphql(QUERY.PRODUCTS, {
//     name: 'productsData', options: {
//         fetchPolicy: "cache-and-network"
//     }
// })(POS);