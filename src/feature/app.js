import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, AsyncStorage} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import Login from './login/login';
import POS from './pos/pos';
import Report from './report/report';
import Transaction from './transaction/transaction';
import Invoice from './invoice/invoice';
import Inventory from './inventory/inventory'
import Setting from './setting/setting';
import EStyleSheet from "react-native-extended-stylesheet";
import {connect} from 'react-redux';
import Menu from '../component/menu/menu';
import Popup from '../component/popup/popup';
EStyleSheet.build(); // Build Extended StyleSheet
import {ASYNC_STORAGE} from '../constant/constant'
import {QUERY} from '../constant/query';
class App extends PureComponent {
    constructor(props) {
        super(props);
        this.navigator = null;
        this.state = {
            firstScene: 'login'
        }
    }

    configureScene(route, navigator) {
        if (route.id === "home") {
            return Navigator.SceneConfigs.FadeAndroid
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "login":
                return <Login navigator={navigator}/>;
            case "home":
                return <Home router={this.props.router} navigator={navigator}/>;

        }
    }

    async ensuringLogined() {
        let authToken = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        if (authToken != undefined) {
            // console.warn(authToken);
            this.navigator.resetTo({id: "home"})


        }
    }

    async componentWillMount() {
        try{
            const res = await this.props.client.query({
                query: QUERY.PRODUCTS,
                fetchPolicy: 'cache-only'
            });
        }catch(e)
        {
            const res = await this.props.client.query({
                query: QUERY.PRODUCTS,
                fetchPolicy: 'cache-only'
            });
            console.warn(JSON.stringify(res.data.products))
        }


        this.ensuringLogined()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    Platform.OS === "ios" &&
                    <StatusBar
                        hidden={true}
                    />
                }
                <Navigator
                    ref={(ref) => {
                        this.navigator = ref;
                    }}
                    initialRoute={{id: "login", index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        )
    }
}

class Home extends PureComponent {
    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[0].id &&
                    <POS/>
                }
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[1].id &&
                    <Report/>
                }
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[2].id &&
                    <Transaction/>
                }
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[3].id &&
                    <Invoice/>
                }
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[4].id &&
                    <Inventory/>
                }
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[5].id &&
                    <Setting/>
                }
                <Popup/>
                <Menu/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        router: state.menuReducer
    }
}

export default connect(mapStateToProps, null)(App);