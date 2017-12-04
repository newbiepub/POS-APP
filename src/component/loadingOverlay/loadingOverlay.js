import React from "react";
import {View, ActivityIndicator, Text} from "react-native";
import styleBase from "../style/base";

class LoadingOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    static propTypes = {
        message: React.PropTypes.string
    };

    static defaultProps = {
        message: ""
    };

    setLoading() {
        this.setState({loading: true});
    }

    stopLoading() {
        this.setState({loading: false});
    }

    render() {
        let loadingIndicator = <View style={{width: 0, height: 0}}/>;
        if (this.state.loading) {
            loadingIndicator =
                <View style={[styleBase.overlay, styleBase.center, {backgroundColor: "rgba(0,0,0,0.85)"}]}>
                    <ActivityIndicator size="large"/>
                    <Text style={[styleBase.font18, {marginTop: 15}]}>
                        {this.props.message}
                    </Text>
                </View>
        }
        return loadingIndicator;
    }
}

export default LoadingOverlay;
