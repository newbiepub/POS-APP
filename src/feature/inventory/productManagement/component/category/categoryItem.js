import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../../../styles/base";
import {connect} from "react-redux";
import {productData} from "../../../../../selector/product";
import store from "../../../../../store/store";
import {CATEGORY_ACTION} from "../../../../../constant/actionTypes";
import {openPopup, renderContent} from "../../../../../component/popup/actions/popupAction";
import AddCategory from "./addCategory";

const itemStyle = EStyleSheet.create({
    itemHeight: {
        height: 65
    }
})

class CategoryListItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnPressUpdate = this.handleOnPressUpdate.bind(this);
    }

    handleOnPressUpdate() {
        let { productInventory = [], item } = this.props;

        let products = productInventory.filter(data => {
            return !!data.product && !!data.product.category && data.product.category._id === item._id
        });
        products = products.map(data => data.product._id);
        store.dispatch({
            type: CATEGORY_ACTION.UPDATE_CATEGORY,
            payload: {
                name: item.name,
                products
            }
        })
        openPopup();
        renderContent(<AddCategory type='update'/>)
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handleOnPressUpdate}
                style={[itemStyle.itemHeight, styleBase.row, styleBase.p_md_vertical, styleBase.p_md_horizontal]}>
                <View style={{flex: 0.5}}>
                    <Text>
                        {this.props.index}
                    </Text>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>
                        {this.props.item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

CategoryListItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
};

CategoryListItem.defaultProps = {
    item: null,
    index: 0
};

const mapStateToProps = (state) => {
    return {
        ...productData(state)
    }
}

export default connect(mapStateToProps) (CategoryListItem);