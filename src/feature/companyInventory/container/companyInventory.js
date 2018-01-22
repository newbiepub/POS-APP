import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, Screen, Title, Button, Text } from "@shoutem/ui";
import styleBase from "../../../styles/base";
import {getCurrentUser} from "../../login/action/login";
import {graphql} from "react-apollo";

class CompanyInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    navigateManagement(route) {
        try {
            let data = this.props.data || {},
                currentUser = data.currentUser || {};

            this.props.navigator.push({id: `company_${route}_management`, title: "QUẢN LÝ SẢN PHẨM", user: currentUser});
        }
        catch(e) {
            console.warn("error - navigateProductManagement");
            alert("Đã có lỗi xảy ra. Xin hãy kiểm tra lại kết nối mạng");
        }
    }

    render() {
        try {
            return (
                <View style={StyleSheet.flatten([styleBase.container])}>
                    <View styleName="vertical v-center h-center xl-gutter-vertical" style={StyleSheet.flatten([styleBase.bgE5, styleBase.m_md_vertical])}>
                        <Title styleName="md-gutter-bottom">
                            QUẢN LÝ SẢN PHẨM
                        </Title>
                        <Button
                            onPress={() => this.navigateManagement("product")}
                            style={StyleSheet.flatten([styleBase.bgBlack])}>
                            <Text style={StyleSheet.flatten([styleBase.textWhite])}>
                                ĐI ĐẾN
                            </Text>
                        </Button>
                    </View>
                    <View styleName="vertical v-center h-center xl-gutter-vertical" style={StyleSheet.flatten([styleBase.bgE5, styleBase.m_md_vertical])}>
                        <Title styleName="md-gutter-bottom">
                            QUẢN LÝ NGUYÊN LIỆU
                        </Title>
                        <Button style={StyleSheet.flatten([styleBase.bgBlack])}>
                            <Text style={StyleSheet.flatten([styleBase.textWhite])}>
                                ĐI ĐẾN
                            </Text>
                        </Button>
                    </View>
                </View>
            )
        }
        catch(e) {
            console.warn("error - render - companyInventory");
            return <View/>
        }
    }
}

export default CompanyInventory