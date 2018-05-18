import React, {PureComponent} from "react";
import {Platform, StatusBar, Alert, View, AsyncStorage, InteractionManager} from "react-native";
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
import LoadingOverlay from '../component/loadingOverlay';
import {getProductAmount, getPaymentMethod, getPaymentStatus, getProduct,getDiscountEmployee} from '../component/listProduct/productAction';
import {ASYNC_STORAGE} from '../constant/constant'
import {getProfile, getCurrency} from './login/userAction';
import config from '../config';
EStyleSheet.build(); // Build Extended StyleSheet
var socket = require('socket.io-client')('http://localhost:3000');
import {createTransactionAsync, issueRefundAsync} from '../feature/transaction/transactionAction';
class App extends PureComponent {
    constructor(props) {
        super(props);
        this.navigator = null;
        this.state = {
            firstScene: 'login'
        }
    }

    componentDidMount(){
        socket.on('connect', ()=>{
            this.asyncData()
        });
    }

    asyncData(){
        InteractionManager.runAfterInteractions(() => {
            if (this.props.asyncTransaction.length > 0) {
                this.props.createTransactionAsync(this.props.asyncTransaction)
            }
            if (this.props.asyncIssueRefund.length > 0) {
                this.props.issueRefundAsync(this.props.asyncIssueRefund)
            }
        });
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
                return <Home router={this.props.router} navigator={navigator} initDatabase={()=>this.initData()}/>;

        }
    }

    async ensuringLogined() {
        let {api} = config, authToken = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);

        if (authToken != undefined) {
            authToken = JSON.parse(authToken);
            let {access_token, refresh_token} = authToken;
            try {
                var response = await fetch(`${api}/account/token/exchanges`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({access_token, refresh_token})
                });
                response = await response.json();
                if (response.errors) {
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
                    this.props.navigator.resetTo({id: "login"});
                    return false;
                } else {
                    await AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, JSON.stringify(response));
                    this.navigator.resetTo({id: "home"})
                }
            } catch (e) {
                if(response == undefined)
                {
                    console.warn("app.js-ensuringLogined-" + e);
                    this.navigator.resetTo({id: "home"})
                }

            }

        }
    }

    async componentWillMount() {

        await this.ensuringLogined();
        let {_id} = this.props.user;
        // await this.initData();
    }
    async initProduct() {
        let {_id} = this.props.user;
        let amount = await this.props.getProductAmount(_id);
        InteractionManager.runAfterInteractions(async () => {
            for (let i = 0; i <= amount; i += 10) {
                // console.warn(i)
                await this.props.getProduct(_id, 10, i);
            }

        });
    }

    async initData() {
        await this.props.getProfile();
        await this.props.getPaymentMethod();
        await this.props.getPaymentStatus();
        await this.props.getCurrency();
        await this.props.getDiscountEmployee();
        await this.initProduct()
        // let {_id} = this.props.user;
        // let amount = await this.props.getProductAmount(_id);
        // for (let i = 0; i <= amount; i += 10) {
        //     await this.props.getProduct(_id, 10, i);
        // }
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

class Home extends React.Component {

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
    componentWillMount()
    {
        this.props.initDatabase()
    }
    shouldComponentUpdate(nextProps, nextState) {
        const changeRoute = this.props.router != nextProps.router;
        return changeRoute;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.props.router.currentItem.id === this.props.router.menuItems[0].id ?
                        <POS/> :
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
                {
                    this.props.router.isLoading &&
                    <LoadingOverlay loading={true}/>
                }
                <Popup/>
                <Menu/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        router: state.menuReducer,
        user: state.userReducer,
        asyncTransaction: state.transactionReducer.asyncTransaction,
        asyncIssueRefund: state.transactionReducer.asyncIssueRefund
    }
}
const mapDispatchToProps = {
    getProfile,
    getProductAmount,
    getPaymentMethod,
    getPaymentStatus,
    getCurrency,
    getProduct,
    createTransactionAsync,
    issueRefundAsync,
    getDiscountEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(App);