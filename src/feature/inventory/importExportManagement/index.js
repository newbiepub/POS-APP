import React from "react";
import {View, SafeAreaView, Text, InteractionManager, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import NavBar from "../../../component/navbar/navbar";
import Management from "./manage";
import {connect} from "react-redux";
import ExportAction from "./export";
import CommingSoon from "../../../component/commingSoon/commingSoon";
import styleBase from "../../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import DropDown from "../../../component/dropDown/index";
import ErrorBoundary from "../../../component/errorBoundary/errorBoundary";

class ImportExportManagement extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            {
                title: "QL NHẬP KHO", route: "import",
            },
            {
                title: "QL XUẤT KHO", route: "export"
            },
            {
                title: "XUẤT KHO", route: "inventory_export_action",
            },
            {
                title: "YÊU CẦU NHẬP KHO", route: "inventory_import_request"
            }
        ];
        this.state = {
            currentRoute: this.routes[0]
        }

        this.renderRightComponent = this.renderRightComponent.bind(this);
    }


    /**
     * Handler
     */

    handleClickItemDropDown(route) {
        this.setState({currentRoute: route});
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

    renderRightComponent() {
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
        )
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container]}>
                <NavBar title={this.props.title.toUpperCase()}
                        renderRightComponent={this.renderRightComponent}
                        navigator={this.props.navigator}/>
                {
                    this.state.currentRoute.route === "import" &&
                    <ErrorBoundary>
                        <Management type="import"/>
                    </ErrorBoundary>
                }
                {
                    this.state.currentRoute.route === 'export' &&
                    <ErrorBoundary>
                        <Management type="export"/>
                    </ErrorBoundary>
                }
                {
                    this.state.currentRoute.route === "inventory_export_action" &&
                    <CommingSoon/>
                }
            </SafeAreaView>
        )
    }
}

ImportExportManagement.propTypes = {};

ImportExportManagement.defaultProps = {};

const mapStateToProps = () => {

};

export default connect()(ImportExportManagement);