import React from "react";
import PropTypes from "prop-types";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {categoryData} from "../../../../../selector/category";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../../../styles/base";
import AddCategoryListProduct from "./addCategoryListProduct";
import store from "../../../../../store/store";
import {CATEGORY_ACTION} from "../../../../../constant/actionTypes";

const formStyles = EStyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5'
    }
})

class AddCategoryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeText (text) {
        store.dispatch({
            type: CATEGORY_ACTION.UPDATE_CATEGORY,
            payload: {
                name: text
            }
        })
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <TextInput style={[styleBase.p_md_horizontal,
                    formStyles.input,
                    styleBase.p_md_vertical]}
                           value={this.props.name}
                           onChangeText={this.handleChangeText}
                           placeholder="TÊN LOẠI HÀNG"/>
                <View style={[styleBase.p_md_vertical,
                    styleBase.container,
                    styleBase.p_md_horizontal]}>
                    <AddCategoryListProduct/>
                </View>
            </View>
        )
    }
}

AddCategoryForm.propTypes = {};

AddCategoryForm.defaultProps = {};

const mapStateToProps = state => {
    return {
        name: state.category.name
    };
}

export default connect(mapStateToProps) (AddCategoryForm);