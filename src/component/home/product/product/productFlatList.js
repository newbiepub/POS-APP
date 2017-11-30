import React from "react";
import {connect} from "react-redux";
import {ScrollView, Text, FlatList, View, TouchableWithoutFeedback} from "react-native";

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
            limit: 8,
            width: 0,
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
        const changeWidth= this.state.width !== nextState.width;
        return differentData || changeWidth;
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.itemPress(item)}>
            <View style={[styleProduct.productItem, {width: this.state.width, height: this.state.width}]}>
                <View style={[styleBase.center, {flex: 3}]}>
                    <Text style={[styleBase.font26, styleBase.textE5]}>
                        {item.name.substr(0, 2)}
                    </Text>
                </View>
                <View style={[styleProduct.productName, styleBase.background4, styleBase.center, {flex: 1,paddingHorizontal:3}]}>
                    <Text style={[styleBase.font14, styleBase.color3,{backgroundColor:'transparent'}]} numberOfLines={1}>{item.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    getSize(evt) {
        var {width} = evt.nativeEvent.layout;
        this.setState({
            width: (width -30)/ 4- 20
        })
    }

    render() {
        return (
            <View onLayout={(event) => this.getSize(event)}
                  style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                {
                    this.state.width >0 &&
                    <FlatList
                        data={this.props.data}
                        numColumns={4}
                        extraData={this.state}
                        initialNumToRender={5}
                        keyExtractor={(item) => item._id}
                        renderItem={this._renderItem}
                    />
                }


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