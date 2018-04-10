import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback} from "react-native";
import {TextNormal, TextLarge, TextSmall} from '../../component/text';
import Header from '../../component/header';
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../style/base';
import {graphql} from 'react-apollo';
import {QUERY} from '../../constant/query';
import GridProduct from '../../component/listProduct/gridView/gridProduct';
import CustomAmount from './customAmount';
import Cart from '../../component/cart/cart';

class POS extends PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            clearSalesVisible: false,
            currentView: "gridProduct",
            leftWidth:width * 0.7,
            leftHeight:height-constantStyle.headerHeight
        }
    }
    async componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                leftWidth:width* 0.7,
                leftHeight:height -constantStyle.headerHeight
            })
        });



    }
    render() {
       // console.warn(JSON.stringify(this.props.paymentStatus))
        return (
            <View style={style.container}>
                {/*---------------Header------------------------*/}
                <Header type={"custom"}>
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
                        {/*<TouchableOpacity onPress={() => {*/}
                            {/*this.setState({currentView: 'library'})*/}
                        {/*}}*/}
                                          {/*style={[style.tabItem, this.state.currentView === 'library' && style.tabItemSelected]}>*/}
                            {/*<View>*/}
                                {/*<Entypo name="list"*/}
                                        {/*style={[style.tabIcon, this.state.currentView === 'library' && style.tabIconSelected]}/>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
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
                    <View style={{flex: 0.7}}>
                        <View
                            style={[style.body, {
                                width: this.state.leftWidth,
                                height: this.state.leftHeight
                            }, this.state.currentView === 'gridProduct' ? style.onShow : style.onHide]}>
                            <GridProduct/>
                        </View>
                        <View
                            style={[style.body, {
                                width: this.state.leftWidth,
                                height: this.state.leftHeight
                            }, this.state.currentView === 'customAmount' ? style.onShow : style.onHide]}>
                            <CustomAmount/>
                        </View>
                    </View>
                    {/*---------------Right Side------------------------*/}
                    <View style={{flex: 0.3, borderLeftColor: constantStyle.colorBorder, borderLeftWidth: 1}}>
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
    body: {
        backgroundColor: constantStyle.colorBackground,
        position: 'absolute',
    },
    onShow: {
        zIndex: 5,
    },
    onHide: {
        zIndex: 1,
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
