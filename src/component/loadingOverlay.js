import React from "react";
import {View, ActivityIndicator, Text} from "react-native";
import {constantStyle} from "../style/base";

class LoadingOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading
        }
    }

    setLoading() {
        this.setState({loading: true});
    }

    stopLoading() {
        this.setState({loading: false});
    }

    render() {
        let loadingIndicator = null;
        if (this.state.loading) {
            loadingIndicator =
                <View style={[{
                    justifyContent: 'center',
                    alignItems: "center",
                    position:'absolute',
                    width:"100%",
                    height:'100%',
                    backgroundColor: "rgba(0,0,0,0.2)"
                }, this.props.style]}>
                    <ActivityIndicator size="large"/>
                    <Text style={[{fontSize: constantStyle.sizeNormal, color: constantStyle.color2, marginTop: 15}]}>
                        {this.props.message}
                    </Text>
                </View>
        }
        return loadingIndicator;
    }
}

export default LoadingOverlay;