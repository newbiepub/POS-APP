import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";

class InventoryMain extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        view: React.PropTypes.string
    };

    static defaultProps = {
        view: "Nguyên Liệu"
    };

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4]}>
                
            </View>
        )
    }
}

export default InventoryMain;