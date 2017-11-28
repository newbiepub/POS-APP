import React from "react";
import {connect} from "react-redux";
import {ScrollView, Modal, View, TouchableWithoutFeedback} from "react-native";

import SortableGrid from "../../../sortableGrid/sortableGrid";
import ProductItem from "./productItem";
import AddItem from '../../../popup/product/createModifyProduct';
import ViewProduct from '../../../popup/product/viewProduct';

import styleBase from "../../../style/base";
import styleProduct from "../../../style/product";
import Ionicons from "react-native-vector-icons/Ionicons";

import {openPopup, renderPopup} from '../../../../action/popup';

class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    itemPress(product, allVariant) {
        this.props.openPopup();
        this.props.renderPopup(
            <ViewProduct productData={this.getVariantProduct(product, allVariant)}/>
        );

    }
    shouldComponentUpdate(nextProps,nextState) {
        const differentData = this.props.data !== nextProps.data;
        return differentData ;
    }

    getVariantProduct(product, allVariant) {
        product = [product];
        allVariant.forEach(async (item) => {
            if (product[0]._id === item.productVariantParent) {
                await product.push(item);
            }
        });
        return product;
    }


    render() {
        return (
            <ScrollView style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                <SortableGrid
                    blockTransitionDuration={400}
                    activeBlockCenteringDuration={200}
                    itemsPerRow={4}
                    dragActivationTreshold={500}
                >
                    {this.props.data.map(item => {
                        if (item.hasOwnProperty("name"))
                            return <ProductItem key={item.name} data={item} itemPress={() => {
                                this.itemPress(item, this.props.variant)
                            }}/>

                    })}

                </SortableGrid>

            </ScrollView>
        )
    }
}

ProductGrid.propTypes = {
    data: React.PropTypes.array
};

ProductGrid.defaultProps = {
    data: []
};

const mapStateToProps = (state) => {
    return {
        account: state.account,
        variant: state.product.variantProduct
    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);