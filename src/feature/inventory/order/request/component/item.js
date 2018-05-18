import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import {formatDate} from "../../../../../utils/utils";
import {openPopup, renderContent} from "../../../../../component/popup/actions/popupAction";
import OrderProductContainer from "../../product/container/index";

const customStyle = EStyleSheet.create({
    font16: {
        fontSize: 16
    }
})

class RequestOrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.handlePressItem = this.handlePressItem.bind(this)
    }

    handlePressItem () {
        openPopup();
        renderContent(<OrderProductContainer
            activityId={this.props.item._id}
            employeeId={this.props.item.to._id}
            products={this.props.item.products}/>)
    }

    render() {
        let { item } = this.props;
        return (
            <TouchableOpacity
                onPress={this.handlePressItem}
                style={[styleBase.m_md_horizontal, styleBase.row, styleBase.spaceBetween,
                styleBase.m_md_vertical, styleBase.p_md_horizontal, styleBase.p_md_vertical,
                styleBase.container, styleBase.bgWhite, styleBase.shadowBox]}>
                <RequestInfoLeft item={item}/>
                <RequestInfoRight item={item}/>
            </TouchableOpacity>
        )
    }
}

const RequestInfoLeft = (props) => {
    let {item} = props;

    return (
        <View>
            <View style={[styleBase.row]}>
                <Text style={[styleBase.title]}>
                    {formatDate(item.dateRequest).toUpperCase()}
                </Text>
            </View>
            <View style={[styleBase.row, styleBase.m_md_left]}>
                <Text style={[styleBase.fontRubik,
                    customStyle.font16,
                    styleBase.m_sm_vertical]}>
                    <Text style={[styleBase.fontBold]}>
                        TÊN ĐIỂM BÁN HÀNG:{`  `}
                    </Text>
                    <Text>
                        {item.to.name}
                    </Text>
                </Text>
            </View>
            <View style={[styleBase.row, styleBase.m_md_left]}>
                <Text style={[styleBase.fontRubik, customStyle.font16,styleBase.m_sm_vertical]}>
                    <Text style={[styleBase.fontBold]}>
                        ĐỊA CHỈ:{`  `}
                    </Text>
                    <Text>
                        {item.to.address}
                    </Text>
                </Text>
            </View>
            <View style={[styleBase.row, styleBase.m_md_left]}>
                <Text style={[styleBase.fontRubik, customStyle.font16,styleBase.m_sm_vertical]}>
                    <Text style={[styleBase.fontBold]}>
                        SỐ ĐIỆN THOẠI:{`  `}
                    </Text>
                    <Text>
                        {item.to.phone}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const RequestInfoRight = (props) => {
    let {item} = props;
    return (
        <View>
            <View style={[styleBase.column, styleBase.m_sm_vertical]}>
                <Text style={[styleBase.fontRubik, customStyle.font16]}>
                    <Text style={[styleBase.fontBold]}>
                        SỐ LƯỢNG YÊU CẦU{`:  `}
                    </Text>
                    <Text>
                        {item.totalQuantity}
                    </Text>
                </Text>
            </View>
            <View style={[styleBase.column, styleBase.m_sm_vertical]}>
                <Text style={[styleBase.fontRubik, customStyle.font16]}>
                    <Text style={[styleBase.fontBold]}>
                        SỐ SẢN PHẨM YÊU CẦU{`:  `}
                    </Text>
                    <Text>
                        {`${item.products.length} SẢN PHẨM`}
                    </Text>
                </Text>
            </View>
            <View style={[styleBase.m_md_vertical]}>
                <StatusButton/>
            </View>
        </View>
    )
}

const StatusButton = (props) => {
    return (
        <View style={[styleBase.p_md_vertical,
            styleBase.bgBlack, styleBase.center,
            styleBase.p_md_horizontal]}>
            <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                ĐANG CHỜ CHUYỂN HÀNG
            </Text>
        </View>
    )
}

RequestOrderItem.propTypes = {
    item: PropTypes.object
};

RequestOrderItem.defaultProps = {
    item: {}
};

export default RequestOrderItem;