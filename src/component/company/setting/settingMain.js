import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import SettingAccount from "./settingAccount";

class SettingMain extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    renderSetting () {
        switch (this.props.setting) {
            case "account": {
                return <SettingAccount {...this.props}/>
            }
            default:
                return <View/>
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