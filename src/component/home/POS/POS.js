import React from "react";
import {connect} from "react-redux";
import {Text, View, TouchableWithoutFeedback, Animated,Dimensions} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import Entypo from 'react-native-vector-icons/Entypo';
import Menu from '../Menu';
import ProductGrid from "../product/productGrid";
import CustomAmount from './CustomAmount';

class POS extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            menuVisible: false,
            currentView: 'CustomAmount',
            clearSalesVisible: false,
            titleSize: {w: 0, h: 0},
            window: {w:width,h:height},
            clearBoxTop: new Animated.Value(0)
        }
        //console.warn(this.state.titleHeight)
    }

    openMenu() {
        this.setState({
            menuVisible: true
        })
    }

    changeView(view) {
        this.setState({
            currentView: view
        })
    }

    async openClearSales() {
        await this.setState({
            clearSalesVisible: !this.state.clearSalesVisible
        });
        if (this.state.clearSalesVisible) {
            Animated.timing(
                this.state.clearBoxTop,
                {
                    toValue: this.state.titleSize.h,
                    duration:200

                },
            ).start();
        } else {
            Animated.timing(
                this.state.clearBoxTop,
                {
                    toValue: 0,
                    duration:200

                },
            ).start();
        }


    }

    getWindowSize(evt){
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
        // console.warn(this.state.titleHeight)
    }

    render() {
        let currentView = this.state.currentView;
        return (
            <View style={[styleBase.container]} onLayout={(event => this.getWindowSize(event))}>
                <Menu visible={this.state.menuVisible} instant={this}/>


                <View style={[styleHome.header, styleHome.heightHeader]}>
                    <View>
                        <TouchableWithoutFeedback onPress={this.openMenu.bind(this)}>
                            <View style={[styleHome.menuButton, styleHome.heightHeader]}>
                                <Entypo name="menu" style={styleHome.iconHeader}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <TouchableWithoutFeedback onPress={() => this.changeView('GridItems')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "GridItems" && styleHome.backgroundOnSelectedItem]}>
                                <Entypo name="shop" style={styleHome.iconHeader}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('Library')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "Library" && styleHome.backgroundOnSelectedItem]}>
                                <Entypo name="list" style={styleHome.iconHeader}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.changeView('CustomAmount')}>
                            <View
                                style={[styleHome.itemHeader, styleHome.heightHeader, currentView === "CustomAmount" && styleHome.backgroundOnSelectedItem]}>
                                <Entypo name="calculator" style={styleHome.iconHeader}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.6}}>
                        {
                            this.state.currentView === 'GridItems' &&
                            <ProductGrid/>
                        }
                        {
                            this.state.currentView === 'Library' &&
                            <Library/>
                        }
                        {
                            this.state.currentView === 'CustomAmount' &&
                            <CustomAmount/>
                        }

                    </View>
                    <View style={[styleHome.box, {flex: 0.4}]}>
                        <TouchableWithoutFeedback onLayout={(event) => this.getTitleBoxSize(event)}
                                                  onPress={this.openClearSales.bind(this)}>
                            <View style={[styleHome.boxTitle, {
                                flex: 0.1, zIndex: 6,
                            }]}>
                                <Text style={[styleBase.font18, {flex: 1}]}>
                                    Đang mua
                                </Text>
                                <Entypo name="chevron-thin-down" rotate={90} style={[styleHome.iconHeader, {
                                    color: 'black'
                                },
                                    this.state.clearSalesVisible && {
                                        transform: [{rotate: '180 deg'}]
                                    }]}/>

                            </View>

                        </TouchableWithoutFeedback>
                        <Animated.View style={[styleHome.boxTitle, {
                            flex: 0.1,
                            position: 'absolute',
                            backgroundColor: '#1a1c1e',
                            zIndex: 5,
                            top: this.state.clearBoxTop,
                            height: this.state.titleSize.h,
                            width: this.state.titleSize.w
                        }]}>
                            <Text style={[styleBase.font18, {flex: 1,color:'white'}]}>
                                Xoa
                            </Text>
                        </Animated.View>
                        <View style={{flex: 0.8}}>

                        </View>
                        <View style={{
                            backgroundColor: 'rgb(244, 173, 66)',
                            flex: 0.1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={[styleBase.font18, {}]}> Thanh toán</Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

class GridItems extends React.PureComponent {
    render() {
        return (
            <View>
                <Text>
                    GridItem
                </Text>
            </View>
        )
    }
}

class Library extends React.PureComponent {
    render() {
        return (
            <View style={[styleHome.container, styleHome.box]}>
                < View style={[styleHome.boxTitle, {flex: 0.1}]}>
                    <Text style={[styleBase.font18, {}]}>
                        Danh dach
                    </Text>

                </View>
                <View style={{flex: 0.9}}>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(POS);