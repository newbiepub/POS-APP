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
                    <View>
                        <View style={[styleBase.row]}>
                            <Text>
                                Điểm bán hàng:
                            </Text>
                            <Text numberOfLines={1}>
                                {this.props.item.name}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text>
                                Đã Bán:
                            </Text>
                            <Text>
                                {this.props.item.sold}
                            </Text>
                        </View>
                        <View style={[styleBase.row]}>
                            <Text>
                                Còn lại:
                            </Text>
                            <Text>
                                {this.props.item.inStock}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styleBase.row]}>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <Text>
                            Trạng Thái:
                        </Text>
                    </View>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <Text>
                            Đang Hoạt Động
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default POSGridItem;