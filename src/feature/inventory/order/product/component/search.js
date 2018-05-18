import React from "react";
import PropTypes from "prop-types";
import styleBase from "../../../../../styles/base";
import {View, TextInput, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EStyleSheet from "react-native-extended-stylesheet";

const customStyles = EStyleSheet.create({
    inputWrapper: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5'
    }
})

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.row, styleBase.p_sm_vertical,
                customStyles.inputWrapper, styleBase.alignCenter,
                styleBase.p_md_horizontal]}>
                <View>
                    <Ionicons name="ios-search-outline" style={[styleBase.fontIcon, styleBase.text4]}/>
                </View>
                <TextInput
                    onChangeText={(text) => this.props.onSearchText(text)}
                    style={[styleBase.p_md_vertical,
                        styleBase.p_md_horizontal, styleBase.grow]}
                    placeholder="TÌM KIẾM"/>
            </View>
        )
    }
}

SearchInput.propTypes = {
    onSearchText: PropTypes.func
};

SearchInput.defaultProps = {
    onSearchText: () => {}
};

export default SearchInput;