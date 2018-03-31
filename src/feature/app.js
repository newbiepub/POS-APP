import React, {PureComponent} from "react";
import {Platform, StatusBar, Alert, View, AsyncStorage, Dimensions} from "react-native";
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
import {constantStyle} from '../style/base';

EStyleSheet.build(); // Build Extended StyleSheet
import {ASYNC_STORAGE} from '../constant/constant'
import Display from 'react-native-display';

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
    constructor(props) {
        super(props);
        this.enter = "fadeIn";
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height
        };
        this.exit = "None";
    }
    async componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        });
    }
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
                <View
                    style={[style.container, {width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[0].id ?
                            style.onShow :
                            style.onHide]}>
                    <POS checkLoginExpire={(data) => this.checkLoginExpire(data)}/>
                </View>

                <View
                    style={[style.container, {width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[1].id ?
                            style.onShow :
                            style.onHide]}>
                    <Report/>
                </View>

                <View
                    style={[style.container, {width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[2].id ?
                            style.onShow :
                            style.onHide]}>
                    <Transaction/>
                </View>

                <View
                    style={[style.container, {width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[3].id ?
                            style.onShow : style.onHide]}>
                    <Invoice/>
                </View>
                <View
                    style={[style.container, {width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[4].id ?
                            style.onShow :
                            style.onHide]}>
                    <Inventory/>
                </View>
                <View
                    style={[style.container,{width: this.state.width, height: this.state.height},
                        this.props.router.currentItem.id === this.props.router.menuItems[5].id ?
                            style.onShow :
                            style.onHide]}>
                    <Setting navigator={this.props.navigator}/>
                </View>


                <Popup/>
                <Menu/>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        backgroundColor: constantStyle.colorBackground,
        position: 'absolute',
    },
    onShow: {
        zIndex: 5,

    },
    onHide: {
        zIndex: 1,
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        router: state.menuReducer
    }
}

export default connect(mapStateToProps, null)(App);