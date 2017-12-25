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


    render() {
        return (
            <ScrollView style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                <SortableGrid
                    blockTransitionDuration={400}
                    activeBlockCenteringDuration={200}
                    itemsPerRow={4}
                    dragActivationTreshold={500}
                >
                    {this.props.data.map((item) => {
                        return <ProductItem key={item._id} data={item} itemPress={() => {
                            this.itemPress(item)
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
    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);