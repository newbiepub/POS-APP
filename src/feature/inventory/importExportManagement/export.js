import React from "react";
import { Image, StyleSheet } from "react-native";
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
        let { currentUser = null } = this.props.user;
        this.props.navigator.push({id: 'company_inventory_export_action', user: currentUser})
    }

    render() {
        return (
            <View style={StyleSheet.flatten([styleBase.container])}>
                <TouchableOpacity
                    onPress={this.handleClickExportToPOS}
                    style={StyleSheet.flatten([styleBase.width50, styleBase.height50,
                        styleBase.center,
                        styleBase.shadowBox, styleBase.bgE5,
                        styleBase.m_lg_vertical, styleBase.m_lg_horizontal])}>
                    <Image style={[{width: 128, height: 128}, styleBase.m_lg_vertical]}
                           source={require('../../../assets/img/deliver.png')}/>
                    <View styleName="vertical v-center h-center">
                        <Title>
                            XUẤT HÀNG CHO ĐIỂM BÁN HÀNG
                        </Title>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

ExportAction.propTypes = {};

ExportAction.defaultProps = {};

export default ExportAction;