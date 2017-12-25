import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import InventoryManagement from "./InventoryManagement";

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
                return <InventoryManagement {...this.props}/>
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