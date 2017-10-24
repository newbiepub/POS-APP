import React from "react";
import {connect} from "react-redux";
import {Text, View, TouchableWithoutFeedback} from "react-native";
import styleBase from "../style/base";
import styleHome from "../style/home";
import Entypo from 'react-native-vector-icons/Entypo';
import Menu from './Menu';

class POS extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            currentView: 'GridItems'
        }
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

    render() {
        let currentView = this.state.currentView;
        return (
            <View style={[styleBase.container]}>
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
                    <View style={{flex: 0.6,}}>
                        {
                            this.state.currentView === 'GridItems' &&
                            <GridItems/>
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
                    <View style={[styleHome.box,{flex: 0.4}]}>
                        <View style={[styleHome.boxTitle,{
                            flex: 0.1
                        }]}>
                            <Text style={[styleBase.font18, {}]}>
                                Đang mua
                            </Text>
                        </View>
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
            <View style={[styleHome.container,styleHome.box]}>
                < View style={[styleHome.boxTitle,{flex: 0.1}]}>
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

class CustomAmount extends React.PureComponent {
    render() {
        return (
            <View>
                <Text>
                    CustomAmount
                </Text>
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