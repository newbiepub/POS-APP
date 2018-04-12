import React from "react";
import {Image, View, Text} from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../styles/base";

class CommingSoon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View pointerEvents="none" style={[styleBase.fillParent, styleBase.center]}>
                <Image
                    style={[{width: 150, height: 150}, styleBase.m_lg_vertical]}
                    source={require('../../assets/img/toolbox.png')}/>
                <Text style={[styleBase.title, styleBase.fontRubik]}>
                    TÍNH NĂNG ĐANG ĐƯỢC THỰC HIỆN
                </Text>
            </View>
        )
    }
}

CommingSoon.propTypes = {};

CommingSoon.defaultProps = {};

export default CommingSoon;