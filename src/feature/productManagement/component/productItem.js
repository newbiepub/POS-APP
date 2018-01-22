import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {View, TouchableOpacity, Subtitle, Text, Icon, Divider} from "@shoutem/ui";
import styleBase from "../../../styles/base";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    render() {
        let {item} = this.props;
        try {
            return (
                <View>
                    <TouchableOpacity>
                        <View styleName="horizontal space-between v-center"
                              style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
                            <View style={{flex: 0.3}}>
                                <Subtitle numberOfLines={1}>
                                    {item.productId.name || ""}
                                </Subtitle>
                            </View>

                            <View styleName="horizontal v-center h-center" style={{flex: 0.3}}>
                                <Text numberOfLines={1}>{item.quantity}</Text>
                            </View>

                            <View styleName="horizontal v-center h-center" style={{flex: 0.2}}>
                                <Text numberOfLines={1}>
                                    {item.productId.unit || ""}
                                </Text>
                            </View>

                            <View style={{flex: 0.13}} styleName="horizontal v-center h-end">
                                <Icon name="down-arrow" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider styleName="line"/>
                </View>
            )
        }
        catch (e) {
            console.warn("error - render ProductItem");
            return (
                <View>
                    <TouchableOpacity>
                        <View styleName="horizontal space-between v-center"
                              style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
                            <Subtitle numberOfLines={1}>
                                KHÔNG THỂ TẢI SẢN PHẨM
                            </Subtitle>

                            <Text numberOfLines={1}>0</Text>
                            <Icon name="down-arrow"/>
                        </View>
                    </TouchableOpacity>
                    <Divider styleName="line"/>
                </View>
            )
        }
    }
}

export default ProductItem