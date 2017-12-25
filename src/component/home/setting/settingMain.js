import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import Taxes from "./tax";
import CashManagement from "./cashManagement";

class SettingMain extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    renderSetting () {
        switch (this.props.setting) {
            case "Thuế": {
                return <Taxes {...this.props}/>
            }
            case "Quản lý tiền": {
                return <CashManagement {...this.props}/>
            }
            default:
                return <View {...this.props}/>
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.renderSetting()
                }
            </View>
        )
    }
}

SettingMain.propTypes = {
    setting: React.PropTypes.string,
};

SettingMain.defaultProps = {
    setting: ""
};

export default SettingMain;