import React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import styleBase from "../../../../styles/base";

const fields = [
    {
        name: "STT",
        field: "STT",
        columnWidth: 0.1
    },
    {
        name: "TÊN KHUYẾN MẠI",
        columnWidth: 0.2
    },
    {
        name: "MÔ TẢ",
        columnWidth: 0.3
    },
    {
        name: 'NGÀY ÁP DỤNG',
        columnWidth: 0.25
    },
    {
        name: 'NGÀY KẾT THÚC',
        columnWidth: 0.25
    },
    {
        name: '',
        field: '',
        columnWidth: 0.1
    }
]

class DiscountHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{height: 65}]}>
                <View style={[styleBase.p_md_vertical,
                    styleBase.row,
                    styleBase.p_md_horizontal, styleBase.bgE5]}>
                    {
                        fields.map((field, index) => {
                            return (
                                <View key={index} style={[{flex: field.columnWidth}]}>
                                    <Text>
                                        {field.name.toUpperCase()}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

DiscountHeader.propTypes = {};

DiscountHeader.defaultProps = {};

export default DiscountHeader;