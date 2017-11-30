import React from "react";
import {connect} from "react-redux";
import {ScrollView, Modal, FlatList, View, TouchableWithoutFeedback} from "react-native";

import SortableGrid from "../../../sortableGrid/sortableGrid";
import ProductItem from "./productItem";
import AddItem from '../../../popup/product/createModifyProduct';
import ViewProduct from '../../../popup/product/viewProduct';

import styleBase from "../../../style/base";
import styleProduct from "../../../style/product";
import Ionicons from "react-native-vector-icons/Ionicons";

import {openPopup, renderPopup} from '../../../../action/popup';

class ProductFlatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 8
        }
    }

    itemPress(product) {
        this.props.openPopup();
        this.props.renderPopup(
            <ViewProduct productData={product}/>
        );

    }

    shouldComponentUpdate(nextProps, nextState) {
        const differentData = this.props.data !== nextProps.data;
        const differentLimit = this.state.limit !== nextState.limit;
        return differentData || differentLimit;
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.itemPress(item)}>
            <View>
                <ProductItem data={item}/>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                <FlatList
                    data={this.props.data}
                    numColumns={4}
                    extraData={this.state}
                    initialNumToRender={5}
                    keyExtractor={(item) => item._id}
                    renderItem={this._renderItem}
                />

            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFlatList);