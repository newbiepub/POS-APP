import React from "react";
import styleBase from "../../style/base";
import {Text, View, Dimensions, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styleHome from "../../style/POS";
import {numberwithThousandsSeparator} from '../../reusable/function';
class POSGridItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: React.PropTypes.object,
        instance: React.PropTypes.object,
        onPressItem: React.PropTypes.func
    };

    static defaultProps = {
        onPressItem: () => {}
    };

    getRevenue()
    {

    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPressItem(this.props.item)}
                style={[styleBase.backgroundSuccess, styleHome.posItem]}>
                <View style={[styleBase.row, {overflow: "hidden"}]}>
                    <FontAwesome name="desktop" style={[styleBase.textE5, {fontSize: 80}]}/>
                    <View style={{paddingHorizontal: 15}}>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Điểm bán hàng:
                            </Text>
                            <Text numberOfLines={1} style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                                {this.props.item.hasOwnProperty("employeeProfile") ? (this.props.item.employeeProfile.name || "") : ''}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Vốn:
                            </Text>
                            <Text style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]} numberOfLines={2}>
                                {numberwithThousandsSeparator(this.props.item.fund) +"đ"}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text style={[{fontSize: 14}, styleBase.text4, styleBase.bold]}>
                                Tài khoản:
                            </Text>
                            <Text style={[styleBase.text4, {marginLeft: 5, fontSize: 14}]}>
                                {this.props.item.username}
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
                            {this.props.item.isActivate ? "Đang hoạt động" : "Đã tắt"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default POSGridItem;