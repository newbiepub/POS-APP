import React from "react";
import {Navigator} from "react-native-deprecated-custom-components";
import Login from "../feature/login/container/login";
import EStyleSheet from "react-native-extended-stylesheet";
import {View} from "react-native";
import Home from "../feature/home/container/home";
import Popup from "../component/popup/popup";
import styleBase from "../styles/base";

EStyleSheet.build(); //Build Extended StyleSheet

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = null;
    }

    static propTypes = {};

    static defaultProps = {};

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
                return <Home navigator={navigator}/>

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