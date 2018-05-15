import React from "react";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import AddCategoryForm from "./addCategoryForm";
import { connect } from 'react-redux';
import {categoryData} from "../../../../../selector/category";

const modalStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class AddCategory extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddCategory = this.handleAddCategory.bind(this);
    }

    handleAddCategory() {
        let { name, products } = this.props;

        // validator
        if(!name.length) alert('Tên loại bắt buộc');

    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[modalStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader
                        type={this.props.type}
                        onSubmit={this.handleAddCategory}/>
                    <AddCategoryForm/>
                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    let createStatus = props.type === 'create';

    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween, {
            height: 65, padding: 0
        }]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title, styleBase.p_md_horizontal, styleBase.p_md_vertical]}>
                    {createStatus ? `THÊM LOẠI HÀNG` : 'CẬP NHẬT LOẠI HÀNG'}
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.onSubmit}
                style={[styleBase.p_md_horizontal, styleBase.bgBlue,
                styleBase.p_md_vertical, styleBase.center, styleBase.row]}>
                <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                    {createStatus ? 'THÊM' : 'CẬP NHẬT'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


AddCategory.propTypes = {
    type: PropTypes.string
};

AddCategory.defaultProps = {
    type: 'create'
};

const mapStateToProps = (state) => {
    return categoryData(state)
}

export default connect(mapStateToProps) (AddCategory);