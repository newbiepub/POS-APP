import React from "react";
import {View, Image, Text} from "react-native";
import styleBase from "../../styles/base";

class NoData extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <View style={[styleBase.m_xl_top, styleBase.center]}>
                <Image
                    style={{width: 142, height: 142}}
                    source={require("../../assets/img/open-box.png")}
                />
                <Text style={[styleBase.m_md_top, styleBase.fontRubik]}>KHÔNG CÓ DỮ LIỆU</Text>
            </View>
        )
    }
}

export default NoData