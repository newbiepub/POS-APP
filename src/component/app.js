import React, { PureComponent } from "react";
import {StatusBar, View, Platform} from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import styleBase from "./style/base";
import Login from "./account/login";
import Home from './home/home';

import EStyleSheet from "react-native-extended-stylesheet";
import Popup from "./popup/popup";

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
                return <Home navigator={navigator}/>

        }
    }

    onWillFocus(route) {

    }

    configureScene(route, navigator) {
        if(route.id === "home") {
            return Navigator.SceneConfigs.FadeAndroid
        }
        return Navigator.SceneConfigs.PushFromRight
    }

    render() {
        return (
            <View style={[styleBase.container]}>
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

export default App;