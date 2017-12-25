import React from "react";
import {Text, TouchableOpacity, View, TextInput, Alert} from "react-native";
import{TextNormal} from '../../reusable/text';
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";
import {connect} from "react-redux";

class Taxes extends React.PureComponent {
    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleSetting.taxList, styleBase.row]}>
                    <TextNormal style={{flex:1}}>Thuế:</TextNormal>
                    <TextNormal>{this.props.tax} %</TextNormal>
                </View>
            </View>
        )
    }
}

const mapStatetoProps = (state)=>{
    return{
        tax: state.transaction.tax
    }

}
export default connect(mapStatetoProps, null)(Taxes);