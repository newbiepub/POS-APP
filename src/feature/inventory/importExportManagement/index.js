import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import NavBar from "../../../component/navbar/navbar";
import Management from "./manage";
import {connect} from "react-redux";
import ExportAction from "./export";
import CommingSoon from "../../../component/commingSoon/commingSoon";

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


    renderRightComponent() {
        return (
            <DropDownMenu
                options={this.routes}
                selectedOption={this.state.currentRoute}
                onOptionSelected={(route) => this.setState({currentRoute: route})}
                titleProperty="title"
                valueProperty="route"
            />
        )
    }

    render() {
        return (
            <Screen styleName='paper'>
                <NavBar title={this.props.title.toUpperCase()}
                        renderRightComponent={this.renderRightComponent}
                        navigator={this.props.navigator}/>
                {
                    this.state.currentRoute.route === "import" &&
                    <Management type="import"/>
                }
                {
                    this.state.currentRoute.route === 'export' &&
                    <Management type="export"/>
                }
                {
                    this.state.currentRoute.route === "inventory_export_action" &&
                    <CommingSoon/>
                }
            </Screen>
        )
    }
}

ImportExportManagement.propTypes = {};

ImportExportManagement.defaultProps = {};

const mapStateToProps = () => {

};

export default connect()(ImportExportManagement);