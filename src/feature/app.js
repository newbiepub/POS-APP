import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, AsyncStorage} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import Login from './login/login';
import POS from './pos/pos';
import EStyleSheet from "react-native-extended-stylesheet";

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
            case "pos":
                return <POS navigator={navigator}/>;

        }
    }

    async ensuringLogined() {
        let authToken = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);
        if (authToken != undefined) {
            // console.warn(authToken);
            this.navigator.push({id: "pos"})


        }
    }

    componentWillMount() {
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


export default App;