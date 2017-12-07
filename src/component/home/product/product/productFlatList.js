import React from "react";
import {connect} from "react-redux";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import ViewProduct from '../../../popup/product/viewProduct';

import styleBase from "../../../style/base";
import styleProduct from "../../../style/product";
import {size} from '../../../style/home';
import {openPopup, renderPopup} from '../../../../action/popup';

class ProductFlatList extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            gridViewWidth: width * 60 / 100,
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
        const changedLoading = this.props.loading !== nextProps.loading;
        const onRotate = this.state.gridViewWidth !== nextState.gridItemWidth;
        return differentData || changedLoading || onRotate;
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.itemPress(item)}>
            <View style={[styleProduct.productItem, {
                width: (this.state.gridViewWidth - 30) / 4 - 20,
                height: (this.state.gridViewWidth - 30) / 4 - 20
            }]}>
                <View style={[styleBase.center, {flex: 3}]}>
                    <Text style={[styleBase.font26, styleBase.textE5]}>
                        {item.name.substr(0, 2)}
                    </Text>
                </View>
                <View style={[styleProduct.productName, styleBase.background4, styleBase.center, {
                    flex: 1,
                    paddingHorizontal: 3
                }]}>
                    <Text style={[styleBase.font14, styleBase.color3, {backgroundColor: 'transparent'}]}
                          numberOfLines={1}>{item.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    onRotate(event) {
        let {width, height} = Dimensions.get('window');
        this.setState({
            gridViewWidth: width * 60 / 100,
        })
    }


    render() {

        return (
            <View onLayout={(event) => this.onRotate(event)}
                  style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                {
                    this.props.loading ?
                        <View style={[styleBase.center, {flex: 1}]}>
                            <ActivityIndicator size={"large"}/>
                        </View> :

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
        loading: state.product.loading
    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFlatList);