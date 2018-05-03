import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import List from '../../../../component/list/list';
import { connect } from "react-redux";
import {allPOS} from "../../../../selector/pos";
import {closePopup} from "../../../../component/popup/actions/popupAction";
import Table from "../../../../component/table/table";
import {listPOSFields} from "../../../../utils/tableFields";
import {objectValue} from "../../../../utils/utils";

const listStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    }
});

class ListPosApply extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem      = this.renderItem.bind(this);
        this.renderList      = this.renderList.bind(this);
        this.handlePressItem = this.handlePressItem.bind(this);
    }

    /**
     * Handler
     */

    handlePressItem(item) {

    }

    /**
     * Renderer
     * @returns {XML}
     */

    renderItem (item, index) {
        return <TouchableOpacity onPress={this.handlePressItem(item)}>
            <View style={[{height: 65},
                styleBase.alignCenter, styleBase.row,
                styleBase.p_md_horizontal]}>
                {
                    listPOSFields.map((field, i) => {
                        return (
                            <View key={`FIELD${i}`} style={[{flex: field.columnWidth}]}>
                                {field.field === "STT" ?
                                    <Text style={[styleBase.normalText, styleBase.fontRubik]}>
                                        {+index + 1}
                                    </Text>
                                    :
                                    <Text style={[styleBase.normalText, styleBase.fontRubik]}>
                                        {objectValue(item, field.field)}
                                    </Text>
                                }
                            </View>
                        )
                    })
                }
            </View>
        </TouchableOpacity>;
    }

    renderList() {
        return <List
            disableVirtualization={false}
            renderItem={this.renderItem.bind(this)}
            dataSources={this.props.pos}
            initialNumToRender={5}/>
    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <View style={[listStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader/>
                    <Table
                        fields={listPOSFields}
                        renderList={this.renderList}/>
                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title]}>
                    ÁP DỤNG CHO CÁC ĐIỂM BÁN HÀNG
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => closePopup()}>
                <Ionicons name="ios-close" style={[
                    styleBase.p_md_horizontal, styleBase.p_md_vertical,
                    styleBase.fontIcon, styleBase.text4]}/>
            </TouchableOpacity>
        </View>
    )
}

ListPosApply.propTypes = {
    pos: PropTypes.array,
};

ListPosApply.defaultProps = {
    pos: []
};

const mapStateToProps = (state) => {
    return {
        pos: allPOS(state)
    }
}

export default connect(mapStateToProps)(ListPosApply);