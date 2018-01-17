import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import InventoryManagement from "./InventoryManagement";
import POSSettings from "./POSSettings";

import Report from './report/report'
class POSDetailMain extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        route: React.PropTypes.string
    };

    static defaultProps = {

    };

    renderRoute () {
        switch (this.props.route) {
            case "inventory":
                return <InventoryManagement {...this.props}/>;
            case "setting":
                return <POSSettings {...this.props} item={{
                    employeeId: this.props.employee._id,
                    username: this.props.employee.username,
                    name: this.props.employee.hasOwnProperty("employeeProfile") ? (this.props.employee.employeeProfile.name || "") : "",
                    fund: this.props.employee.fund
                }}/>;
            case "report":
                return <Report employee={this.props.employee} {...this.props}/>
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.renderRoute()
                }
            </View>
        )
    }
}

export default POSDetailMain