import React from "react";
import PropTypes from "prop-types";
import {Text, View, TouchableOpacity} from "@shoutem/ui";
import {StyleSheet, Image} from "react-native";
import styleBase from "../../../styles/base";

class POSItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    navigatePOSDetail () {
        this.props.navigator.push({id: "pos_detail", title: this.props.item.profile.name || "POINT OF SALES", posItem: this.props.item});
    }

    render() {
        let {item} = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.navigatePOSDetail()}
                style={StyleSheet.flatten([styleBase.shadowBox, styleBase.p_md_vertical, styleBase.p_md_horizontal])}>
                <View styleName="vertical v-center h-center">
                    <Image
                        source={require("../../../assets/img/online-shop.png")}
                        style={{width: 125, height: 125}}
                    />
                </View>

                <View styleName="md-gutter-top">
                    <View styleName="sm-gutter-bottom horizontal">
                        <Text>
                            {"Tên: "}
                            {item.profile.name}
                        </Text>
                    </View>
                    <View styleName="sm-gutter-bottom horizontal">
                        <Text>
                            {"Địa chỉ: "}
                            {item.profile.address}
                        </Text>
                    </View>

                    <View styleName="sm-gutter-bottom horizontal">
                        <Text>
                            {"SĐT: "}
                            {item.profile.phoneNumber}
                        </Text>
                    </View>

                    <View styleName="sm-gutter-bottom horizontal">
                        <Text>
                            {"Trạng thái: "}
                            <Text style={StyleSheet.flatten([styleBase.colorInput])}>
                                Đang Hoạt Động
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default POSItem