import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator} from "react-native";
import styleBase from "../../styles/base";

class LoadingOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    show() {
        this.setState({visible: true});
    }

    hide () {
        this.setState({visible: false});
    }

    render() {
        if(this.state.visible) {
            return (
                <View style={[styleBase.center, styleBase.fillParent, styleBase.overlay]}>
                    <ActivityIndicator size={'large'}/>
                </View>
            )
        }
        return null;
    }
}

LoadingOverlay.propTypes = {};

LoadingOverlay.defaultProps = {};

export default LoadingOverlay;