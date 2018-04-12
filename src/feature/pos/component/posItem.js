import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
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
        this.props.navigator.push({id: "pos_detail", title: this.props.item.profile.name || "POINT OF SALES", user: this.props.item});
    }

    render() {
        let {item} = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.navigatePOSDetail()}
                style={[
                    styleBase.m_md_vertical,
                    styleBase.m_md_horizontal,
                    styleBase.shadowBox,
                    styleBase.p_md_vertical,
                    styleBase.p_md_horizontal
                ]}>
                <View style={[styleBase.center]}>
                    <Image
                        source={require("../../../assets/img/online-shop.png")}
                        style={{width: 125, height: 125}}
                    />
                </View>

                <View style={[styleBase.m_md_top]}>
                    <View style={[styleBase.row, styleBase.m_sm_bottom]}>
                        <Text style={[styleBase.fontRubik, styleBase.normalText]}>
                            {"Tên: "}
                            {item.profile.name}
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.m_sm_bottom]}>
                        <Text style={[styleBase.fontRubik, styleBase.normalText]}>
                            {"Địa chỉ: "}
                            {item.profile.address}
                        </Text>
                    </View>

                    <View style={[styleBase.row, styleBase.m_sm_bottom]}>
                        <Text style={[styleBase.fontRubik, styleBase.normalText]}>
                            {"SĐT: "}
                            {item.profile.phoneNumber}
                        </Text>
                    </View>

                    <View style={[styleBase.row, styleBase.m_sm_bottom]}>
                        <Text style={[styleBase.fontRubik, styleBase.normalText]}>
                            {"Trạng thái: "}
                            <Text style={[styleBase.colorInput]}>
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