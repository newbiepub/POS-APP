import React, {PureComponent} from "react";
import {Platform, StatusBar, Alert, View, AsyncStorage} from "react-native";
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
import {QUERY} from '../constant/query';
import {client} from '../root';

EStyleSheet.build(); // Build Extended StyleSheet
import {ASYNC_STORAGE} from '../constant/constant'

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
    checkLoginExpire(data) {
        try {
            if (data.error && data.error.networkError.statusCode === 500) {
                Alert.alert(
                    'Thông báo !',
                    'Phiên làm việc của bạn đã hết hạn !',
                    [
                        {
                            text: 'OK', onPress: () => {
                        }
                        },
                    ],
                    {cancelable: false}
                );
                AsyncStorage.removeItem(ASYNC_STORAGE.AUTH_TOKEN);
                this.props.navigator.resetTo({id: "login"})
            }
        } catch (e) {
            console.warn(e)
        }


    };

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[0].id ?
                        <POS checkLoginExpire={(data) => this.checkLoginExpire(data)}/> :
                        this.props.router.currentItem.id === this.props.router.menuItems[1].id ?
                            <Report/> :
                            this.props.router.currentItem.id === this.props.router.menuItems[2].id ?
                                <Transaction/> :
                                this.props.router.currentItem.id === this.props.router.menuItems[3].id ?
                                    <Invoice/> :
                                    this.props.router.currentItem.id === this.props.router.menuItems[4].id ?
                                        <Inventory/> :
                                        this.props.router.currentItem.id === this.props.router.menuItems[5].id &&
                                        <Setting navigator={this.props.navigator}/>

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