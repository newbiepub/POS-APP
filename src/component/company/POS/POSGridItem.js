import React from "react";
import styleBase from "../../style/base";
import {Text, View, Dimensions, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styleHome from "../../style/POS";

class POSGridItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: React.PropTypes.object,
        instance: React.PropTypes.object
    };

    render() {
        return (
            <TouchableOpacity style={[styleBase.backgroundSuccess, styleHome.posItem]}>
                <View style={[styleBase.row, {overflow: "hidden"}]}>
                    <FontAwesome name="desktop" style={[styleBase.textE5, {fontSize: 100}]}/>
                    <View style={{paddingHorizontal: 15}}>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Điểm bán hàng:
                            </Text>
                            <Text numberOfLines={1} style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                                {this.props.item.name}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Vốn:
                            </Text>
                            <Text style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                                {this.props.item.fund}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Doanh thu:
                            </Text>
                            <Text style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                                {this.props.item.benefit}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styleBase.row, {marginTop: 20}]}>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                            Trạng Thái:
                        </Text>
                    </View>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <Text style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                            Đang Hoạt Động
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default POSGridItem;