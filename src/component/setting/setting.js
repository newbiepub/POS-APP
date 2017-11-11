import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import styleBase from "../style/base";

class Setting extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>

            </View>
        )
    }
}

export default connect(null, null) (Setting);