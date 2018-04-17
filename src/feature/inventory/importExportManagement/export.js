import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import {getAllPOS} from "../../pos/action/posAction";
import styleBase from "../../../styles/base";
import {getCurrentUser} from "../../login/action/login";

class ExportAction extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickExportToPOS = this.handleClickExportToPOS.bind(this);
    }

    handleClickExportToPOS () {
        this.props.navigator.push({id: 'company_inventory_export_list_pos'})
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <TouchableOpacity
                    onPress={this.handleClickExportToPOS}
                    style={[
                        styleBase.width30,
                        styleBase.height50,
                        styleBase.center,
                        styleBase.shadowBox, styleBase.bgWhite,
                        styleBase.m_lg_vertical, styleBase.m_lg_horizontal]}>
                    <Image style={[{width: 128, height: 128}, styleBase.m_lg_vertical]}
                           source={require('../../../assets/img/deliver.png')}/>
                    <View style={[styleBase.center]}>
                        <Text style={[styleBase.title]}>
                            XUẤT HÀNG CHO ĐIỂM BÁN HÀNG
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

ExportAction.propTypes = {};

ExportAction.defaultProps = {};

export default (ExportAction);