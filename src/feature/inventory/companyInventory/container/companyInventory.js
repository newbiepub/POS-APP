import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView } from "react-native";
import { View, Screen, Title, Button, Text } from "@shoutem/ui";
import styleBase from "../../../../styles/base";
import {getCurrentUser} from "../../../login/action/login";
import {graphql} from "react-apollo";

class CompanyInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.listButton = [
            { title: 'QUẢN LÝ SẢN PHẨM', onPress: () => this.navigateManagement("product", "QUẢN LÝ SẢN PHẨM") },
            { title: 'QUẢN LÝ NGUYÊN LIỆU' , onPress: () => this.navigateManagement('ingredient', 'quản lý nguyên liệu') },
            { title: 'QUẢN LÝ XUẤT/NHẬP KHO', onPress: () => this.navigateManagement('inventory_activity', 'quản lý nhập xuất/kho') }
        ]
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    navigateManagement(route, title) {
        try {
            let data = this.props.data || {},
                currentUser = data.currentUser || {};

            // Go to company_product|ingredient_management
            this.props.navigator.push({id: `company_${route}_management`, title: title, user: currentUser});
        }
        catch(e) {
            console.warn("error - navigateProductManagement");
            alert("Đã có lỗi xảy ra. Xin hãy kiểm tra lại kết nối mạng");
        }
    }

    render() {
        try {
            return (
                <ScrollView style={StyleSheet.flatten([styleBase.container])}>
                    {
                        this.listButton.map((item, index) => {
                            return (
                                <View key={index} styleName="vertical v-center h-center xl-gutter-vertical"
                                      style={StyleSheet.flatten([styleBase.bgE5, styleBase.m_md_vertical])}>
                                    <Title styleName="md-gutter-bottom">
                                        {item.title}
                                    </Title>
                                    <Button
                                        onPress={item.onPress}
                                        style={StyleSheet.flatten([styleBase.bgBlack])}>
                                        <Text style={StyleSheet.flatten([styleBase.textWhite])}>
                                            ĐI ĐẾN
                                        </Text>
                                    </Button>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            )
        }
        catch(e) {
            console.warn(e.message);
            console.warn("error - render - companyInventory");
            return <View/>
        }
    }
}

export default CompanyInventory