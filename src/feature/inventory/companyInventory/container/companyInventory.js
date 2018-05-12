import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import styleBase from "../../../../styles/base";
import { connect } from "react-redux";
import ErrorBoundary from "../../../../component/errorBoundary/errorBoundary";

class CompanyInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.listButton = [
            { title: 'QUẢN LÝ SẢN PHẨM', onPress: () => this.navigateManagement("product", "QUẢN LÝ SẢN PHẨM") },
            // { title: 'QUẢN LÝ NGUYÊN LIỆU' , onPress: () => this.navigateManagement('ingredient', 'quản lý nguyên liệu') },
            { title: 'QUẢN LÝ XUẤT/NHẬP KHO', onPress: () => this.navigateManagement('inventory_activity', 'quản lý nhập xuất/kho') },
            { title: 'NHẬT KÝ KHO', onPress: () => this.navigateManagement('inventory_activity_logger', 'nhật ký kho') }
        ]
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    navigateManagement(route, title) {
        try {
            let { user } = this.props;

            // Go to company_product|ingredient_management
            this.props.navigator.push({id: `company_${route}_management`, title: title, user});
        }
        catch(e) {
            console.warn(e.message);
            console.warn("error - navigateProductManagement");
            alert("Đã có lỗi xảy ra. Xin hãy kiểm tra lại kết nối mạng");
        }
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container]}>
                <ScrollView style={[styleBase.container]}>
                    {
                        this.listButton.map((item, index) => {
                            return (
                                <View key={index}
                                      style={[
                                          styleBase.p_lg_vertical,
                                          styleBase.p_lg_horizontal,
                                          styleBase.bgE5,
                                          styleBase.center,
                                          styleBase.m_lg_top]}>
                                    <Text style={[
                                        styleBase.title,
                                        styleBase.m_md_bottom,
                                        styleBase.fontRubik
                                    ]}>
                                        {item.title}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={item.onPress}
                                        style={[
                                            styleBase.p_md_horizontal,
                                            styleBase.p_md_vertical,
                                            styleBase.bgBlack
                                        ]}>
                                        <Text style={[
                                            styleBase.fontRubik,
                                            styleBase.normalText,
                                            styleBase.textWhite
                                        ]}>
                                            ĐI ĐẾN
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps) (CompanyInventory)