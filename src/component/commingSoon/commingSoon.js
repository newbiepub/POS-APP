import React from "react";
import { View, Title } from "@shoutem/ui";
import {Image} from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../styles/base";

class CommingSoon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View pointerEvents="none" styleName="fill-parent center vertical h-center v-center">
                <Image
                    style={[{width: 150, height: 150}, styleBase.m_lg_vertical]}
                    source={require('../../assets/img/toolbox.png')}/>
                <Title>
                    TÍNH NĂNG ĐANG ĐƯỢC THỰC HIỆN
                </Title>
            </View>
        )
    }
}

CommingSoon.propTypes = {};

CommingSoon.defaultProps = {};

export default CommingSoon;