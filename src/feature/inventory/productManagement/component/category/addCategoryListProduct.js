import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../../styles/base";
import List from "../../../../../component/list/list";
import EStyleSheet from "react-native-extended-stylesheet";
import {connect} from "react-redux";
import {categoryData} from "../../../../../selector/category";
import store from "../../../../../store/store";
import {CATEGORY_ACTION} from "../../../../../constant/actionTypes";
import {toggleArr} from "../../../../../utils/utils";

const listStyles = EStyleSheet.create({
    radioButton: {
        borderWidth: 1,
        borderColor: '#444',
    },
    radioButtonContainer: {
        $size: 20,
        height: '$size',
        width: '$size',
        borderRadius: '0.5 * $size'
    },
    radioButtonActive: {
        $size: 15,
        height: '$size',
        width: '$size',
        borderRadius: '0.5 * $size',
        backgroundColor: '#444'
    }
})

class AddCategoryListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.list = null;
        this.renderItem = this.renderItem.bind(this);
    }

    handlePressItem(item) {
        let { products = [] } = this.props;

        toggleArr(products, item.product._id);
        this.list.onUpdateList();
        store.dispatch({
            type: CATEGORY_ACTION.UPDATE_CATEGORY,
            payload: {
                products
            }
        })
    }

    renderItem(item, index) {
        return (
            <TouchableOpacity
                onPress={() => this.handlePressItem(item)}
                style={[styleBase.row, styleBase.m_md_vertical]}>
                <View style={[listStyles.radioButton, listStyles.radioButtonContainer,
                    styleBase.center, styleBase.m_md_right]}>
                    {this.props.products.includes(item.product._id) &&
                    <View style={[listStyles.radioButton, listStyles.radioButtonActive]}/>}
                </View>
                <View>
                    <Text style={[styleBase.fontRubik, styleBase.title]}>
                        {item.product.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <List
                    ref={ref => this.list = ref}
                    removeClippedSubviews={true}
                    renderItem={this.renderItem}
                    dataSources={this.props.productInventory}/>
            </View>
        )
    }
}

AddCategoryListProduct.propTypes = {};

AddCategoryListProduct.defaultProps = {};

const mapStateToProps = state => {
    return {
        productInventory: state.inventory.products,
        ...categoryData(state)
    }
}

export default connect(mapStateToProps)(AddCategoryListProduct);