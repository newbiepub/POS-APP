import React from "react";
import {Navigator} from "react-native-deprecated-custom-components";
import Login from "../feature/login/container/login";
import EStyleSheet from "react-native-extended-stylesheet";
import {View} from "react-native";
import Home from "../feature/home/container/home";
import Popup from "../component/popup/popup";
import styleBase from "../styles/base";
import POSDetail from "../feature/pos/container/posDetail";
import ProductManagement from "../feature/productManagement/container/productManagement";

EStyleSheet.build(); //Build Extended StyleSheet

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = null;
    }

    static propTypes = {};

    static defaultProps = {};

    configureScene(route, navigator) {
        if (route.id === "home" || route.id === "pos_product_management") return Navigator.SceneConfigs.FadeAndroid;

        if(route.id === "pos_detail") return Navigator.SceneConfigs.FloatFromBottom;

        return Navigator.SceneConfigs.PushFromRight
    }
    renderScene(route, navigator) {
        switch (route.id) {
            case "login":
                return <Login navigator={navigator}/>;
            case "home":
                return <Home navigator={navigator}/>;
            case "pos_detail":
                return <POSDetail navigator={navigator} title={route.title} posItem={route.posItem}/>;
            case "pos_product_management":
                return <ProductManagement navigator={navigator} title={route.title} posItem={route.posItem}/>
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <Navigator
                    ref={(ref) => {
                        this.navigator = ref;
                    }}
                    initialRoute={{id: 'login', index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                />
                <Popup/>
            </View>
        )
    }
}

export default AppContainer