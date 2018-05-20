import React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import {formatTimes} from "../../../../utils/utils";

const customStyles = EStyleSheet.create({
    box: {
        borderColor: '#e5e5e5',
        borderWidth: 1
    }
})

class ListLogItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {item} = this.props;

        return (
            <View style={[styleBase.row, styleBase.m_md_vertical, styleBase.m_md_horizontal,
                styleBase.spaceBetween,
                styleBase.p_md_horizontal, styleBase.p_md_vertical, customStyles.box, styleBase.shadowBox
            ]}>
                <Text style={[styleBase.fontRubik, styleBase.title]}>
                    {item.message
                        .replace('IMPORTED_', 'BẠN ĐÃ NHẬP ')
                        .replace('_PRODUCT', " SẢN PHẨM VÀO KHO")
                        .replace('UPDATE_PRODUCT_', 'BẠN ĐÃ CẬP NHẬT SẢN PHẨM - ').toUpperCase()}
                </Text>
                <Text style={[styleBase.fontRubik, styleBase.title]}>
                    {formatTimes(item.created_at).toUpperCase()}
                </Text>
            </View>
        )
    }
}

ListLogItem.propTypes = {
    item: PropTypes.object,
};

ListLogItem.defaultProps = {
    item: {},
};

export default ListLogItem;