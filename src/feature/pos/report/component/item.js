import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../styles/base";
import {formatDate} from "../../../../utils/utils";
import {openPopup, renderContent} from "../../../../component/popup/actions/popupAction";
import ReportDetail from "./detail";

class ReportItem extends React.Component {
    constructor(props) {
        super(props);

        this.handlePressItem = this.handlePressItem.bind(this);
    }

    handlePressItem() {
        openPopup();
        renderContent(<ReportDetail item={this.props.item}/>)
    }

    render() {
        let {item} = this.props;

        return (
            <TouchableOpacity
                onPress={this.handlePressItem}
                style={[styleBase.row, styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.center]}>
                <View style={[styleBase.row,
                    {borderBottomWidth: 1, borderColor: '#e5e5e5'},
                    styleBase.p_md_horizontal, styleBase.p_md_vertical]}>
                    <Text>
                        {formatDate(new Date(item.createdAt)).toUpperCase()}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

ReportItem.propTypes = {
    item: PropTypes.object
};

ReportItem.defaultProps = {
    item: {}
};

export default ReportItem;