import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import styleBase from "../../../styles/base";

const checkboxStyle = EStyleSheet.create({
    checkBox: {
        $size: 20,
        height: "$size",
        width: '$size',
        borderRadius: '0.5 * $size',
        borderWidth: 1,
        borderColor: '#444'
    },
    checkBoxActive: {
        $size: 15,
        height: '$size',
        width: '$size',
        borderRadius: '0.5 * $size',
        backgroundColor: '#444'
    }
})

class CheckBoxItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Handler
     */

    handlePickOption () {
        this.props.handlePickOption(this.props.option);
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        let { option, isActive } = this.props;

        return (
            <TouchableOpacity
                onPress={() => this.handlePickOption()}
                style={[styleBase.m_md_vertical, styleBase.row, styleBase.alignCenter]}>
                <View style={[checkboxStyle.checkBox, styleBase.m_sm_right, styleBase.center]}>
                    {
                        isActive &&
                            <View style={[checkboxStyle.checkBoxActive]}/>
                    }
                </View>
                <View>
                    <Text style={[styleBase.noBg]}>
                        {option.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

CheckBoxItem.propTypes = {
    option: PropTypes.object,
    isActive: PropTypes.bool,
    handlePickOption: PropTypes.func
};

CheckBoxItem.defaultProps = {
    option: {},
    isActive: true,
    handlePickOption: () => {}
};

export default CheckBoxItem;