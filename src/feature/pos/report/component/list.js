import React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import styleBase from "../../../../styles/base";
import List from "../../../../component/list/list";
import ReportItem from "./item";

class ListReport extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item, index) {
        return (
            <ReportItem item={item} index={index}/>
        )
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleBase.m_lg_vertical]}>
                    <Text style={[styleBase.fontRubik, styleBase.title]}>
                        THỐNG KÊ BÁN HÀNG
                    </Text>
                </View>
                <List dataSources={this.props.dataSources}
                      renderItem={this.renderItem}
                />
            </View>
        )
    }
}

ListReport.propTypes = {
    dataSources: PropTypes.array
};

ListReport.defaultProps = {
    dataSources: []
};

export default ListReport;