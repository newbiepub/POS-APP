import React from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
    InteractionManager
} from "react-native";
import styleBase from "../../../styles/base";
import NavBar from "../../../component/navbar/navbar";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import DropDown from "../../../component/dropDown/index";
import POSSettingContainer from "../setting/container/index";
import ReportContainer from "../report/container/index";

class POSDetail extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'KHO', route: 'inventory'},
            {title: 'THỐNG KÊ', route: 'report'},
            {title: "CÀI ĐẶT", route: 'setting'}
        ];
        this.state = {
            currentRoute: this.routes[0]
        }

        this.renderLeftComponent = this.renderLeftComponent.bind(this);
        this.renderRightContent = this.renderRightContent.bind(this);
    }

    static propTypes = {
        title: PropTypes.string
    };


    static defaultProps = {
        title: ""
    };

    /**
     * Handler
     */

    handleClickItemDropDown (route) {
        this.setState({currentRoute: route})
    }

    handleClickDropDown() {
        InteractionManager.runAfterInteractions(() => {
            openPopup();
            renderContent(<DropDown items={this.routes}
                                    onPressItem={route => this.handleClickItemDropDown(route)}
                                    label="title"/>)
        })
    }

    /**
     * Renderer
     * @returns {XML}
     */

    renderCenterComponent() {
        return (
            <View>
                <Text style={[styleBase.title, styleBase.fontRubik]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

    renderLeftComponent() {
        return (
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                <Ionicons name="ios-close" style={{fontSize: 40}}/>
            </TouchableOpacity>
        )
    }

    renderRightContent() {
        return (
            <TouchableOpacity
                onPress={() => this.handleClickDropDown()}
                style={[styleBase.row, styleBase.center]}>
                <Text style={[
                    styleBase.title, styleBase.m_sm_right,
                    styleBase.fontRubik, styleBase.text4]}>
                    {this.state.currentRoute.title}
                </Text>
                <Ionicons name={'ios-arrow-down'} style={[styleBase.title]}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container, styleBase.bgWhite]}>
                <View style={[styleBase.container]}>
                    <NavBar
                        title={this.props.title}
                        renderLeftComponent={this.renderLeftComponent}
                        renderRightComponent={this.renderRightContent}
                    />
                    {this.state.currentRoute.route === 'inventory' &&
                    <ScrollView>
                        <View style={[styleBase.m_lg_top]}>
                            <View style={[
                                styleBase.p_lg_vertical,
                                styleBase.p_lg_horizontal,
                                styleBase.bgE5,
                                styleBase.center]}>
                                <Text style={[
                                    styleBase.p_md_bottom,
                                    styleBase.title,
                                    styleBase.text4,
                                    styleBase.fontRubik,]}>
                                    QUẢN LÝ SẢN PHẨM
                                </Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigator.push({
                                        id: "pos_product_management",
                                        user: this.props.user,
                                        title: `QUẢN LÝ SẢN PHẨM - ${this.props.title}`
                                    })}
                                    style={[styleBase.center,
                                        styleBase.p_md_horizontal,
                                        styleBase.bgBlack, styleBase.p_md_vertical]}>
                                    <Text style={[styleBase.textWhite, styleBase.fontBold]}>
                                        ĐI ĐẾN
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    }
                    {
                        this.state.currentRoute.route === 'setting' &&
                            <POSSettingContainer user={this.props.user} navigator={this.props.navigator}/>
                    }
                    {
                        this.state.currentRoute.route === 'report' &&
                            <ReportContainer user={this.props.user} navigator={this.props.navigator}/>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

export default POSDetail