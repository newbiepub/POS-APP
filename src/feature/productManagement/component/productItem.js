import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import { View, TouchableOpacity, Subtitle, Text, Icon, Divider } from "@shoutem/ui";
import styleBase from "../../../styles/base";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <View>
                <TouchableOpacity>
                    <View styleName="horizontal space-between v-center" style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
                        <Subtitle numberOfLines={1}>
                            TEN SAN PHAM
                        </Subtitle>

                        <Text numberOfLines={1}>1950</Text>
                        <Icon name="down-arrow" />
                    </View>
                </TouchableOpacity>
                <Divider styleName="line"/>
            </View>
        )
    }
}

export default ProductItem