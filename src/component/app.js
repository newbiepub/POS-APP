import React, {PureComponent} from "react";
import {Platform, StatusBar, View} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import styleBase from "./style/base";
import Login from "./account/login";
import Home from './home/home';
import EStyleSheet from "react-native-extended-stylesheet";
import Popup from "./popup/popup";
import {size} from './style/home';
import LoginCompany from "./account/companyLogin";
import {companyAuth} from "../action/accountCompany";
import {connect} from "react-redux";
import CompanyHome from "./company/home/companyHome";
import * as _ from "lodash";
import POSDetail from "./company/POSDetail/POSDetail";
import {ASYNC_STORAGE} from "../constant/constant";

EStyleSheet.build(); // Build Extended StyleSheet

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.navigator = null;
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "login":
                return <Login navigator={navigator}/>;
            case "home":
                return <Home navigator={navigator}/>;
            case "logincompany":
                return <LoginCompany navigator={navigator}/>;
            case "companyhome":
                return <CompanyHome navigator={navigator}/>;
            case "posdetail":
                return <POSDetail pos={route.employee} navigator={navigator}/>
        }
    }

    async componentDidMount() {
        try {
            /*require("react-native").AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, JSON.stringify({
                "access_token" : "c666591df0537cf226cc7d33d50a72a2d9d4c7651ff7caeae045f723528c3917",
                "refresh_token" : "55c1520824a84d75076a69c1a4c9dfe03ef400b649fe8c774f68754300946940",
            }))*/
            await companyAuth();
        } catch(e) {
            alert(e);
            console.warn("Error - ComponentDidMount - app.js")
        }
    }

    componentWillReceiveProps (nextProps) {
        if(!_.isEqual(this.props.accountCompany.isLogin, nextProps.accountCompany.isLogin) && nextProps.accountCompany.isLogin) {
            this.navigator.resetTo({id: "companyhome"});
        }
    }

    configureScene(route, navigator) {
        if (route.id === "home") {
            return Navigator.SceneConfigs.FadeAndroid
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    getSize(evt) {
        let {width, height} = evt.nativeEvent.layout;
        size.gridItemWidth = (width * 60 / 100 - 30) / 4 - 20;
        size.menuSize = width *30 / 100;
        size.window= {
            width: width,
            height: height
        }
    }

    onWillFocus() {

    }

    render() {
        return (
            <View style={[styleBase.container]} onLayout={(event) => this.getSize(event)}>
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
                    initialRoute={{id: 'login', index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                    onWillFocus={this.onWillFocus.bind(this)}
                />
                <Popup/>
            </View>
        )
    }
}


// Company Login
const mapStateToProps = (state) =>{
    return {
        accountCompany: state.accountCompany
    }
};

export default connect(mapStateToProps, null) (App);