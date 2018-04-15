import React from "react";
import {View, Image, Text} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

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
                    source={require("../asset/img/open-box.png")}
                />
                <Text style={[styleBase.m_md_top,]}>KHÔNG CÓ DỮ LIỆU</Text>
            </View>
        )
    }
}


const styleBase = EStyleSheet.create({
    m_xl_top: {
        marginTop: 45
    },
    m_md_top: {
        marginTop: 15
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default NoData