import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {closePopup} from "../popup/actions/popupAction";

class DropDown extends React.Component {
    constructor(props) {
        super(props);

        this.onPressItem  = this.onPressItem.bind(this);
        this.onPressClose = this.onPressClose.bind(this);
    }

    onPressClose () {
        closePopup();
    }

    onPressItem(item) {
        return () => {
            this.props.onPressItem(item);
            closePopup();
        }
    }

    render() {
        return (
            <View style={[
                styleBase.container,
                styleBase.justifyCenter,
                styleBase.bgWhiteTransparent]}>
                <View style={[styleBase.center, styleBase.grow]}>
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                                  onPress={this.onPressItem(item)}
                                                  style={[styleBase.m_md_vertical]}>
                                    <Text style={[styleBase.fontRubik, styleBase.title]}>
                                        {item[this.props.label]}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity
                    onPress={this.onPressClose}
                    style={[styleBase.alignCenter, {justifyContent: 'flex-end'}]}>
                    <Ionicons name='ios-close' style={{fontSize: 40}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

DropDown.propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
    onPressItem: PropTypes.func
};

DropDown.defaultProps = {
    items: [],
    label: "",
    onPressItem: () => {}
};

export default DropDown;