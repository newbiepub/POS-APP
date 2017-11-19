import React from "react";
import {connect} from "react-redux";
import {Text, TouchableOpacity, View} from "react-native";

import SortableGrid from "../../sortableGrid/sortableGrid";
import ProductItem from "./productItem";
import AddItem from '../../popup/Item/createItem';
import ViewItem from '../../popup/Item/viewItem';

import styleBase from "../../style/base";
import styleProduct from "../../style/product";

import Ionicons from "react-native-vector-icons/Ionicons";

import {openPopup,renderPopup} from '../../../action/popup';

class AddProduct extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleProduct.addItemButton, styleBase.center]}>
                <Ionicons name='ios-add-outline'
                          style={[styleBase.vector32, styleBase.textE5]}
                />
            </View>
        )
    }
}

export {AddProduct};

class ProductGrid extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    itemPress(item) {

        this.props.renderPopup(
            <ViewItem itemData={item}/>
        );
        this.props.openPopup();
    }

    addItemPress() {
       this.props.renderPopup(
           <AddItem/>
       );
        this.props.openPopup();
    }

    render() {
        let arr = this.props.data;
        arr.push({});
        return (
            <View style={[styleBase.grow, styleProduct.productWrapper, styleBase.background5]}>
                <SortableGrid
                    blockTransitionDuration={400}
                    activeBlockCenteringDuration={200}
                    itemsPerRow={4}
                    dragActivationTreshold={500}
                >
                    {this.props.data.map(item => {
                        if (item.hasOwnProperty("name"))
                            return <ProductItem key={item.name} data={item} itemPress={() => {
                                this.itemPress(item)
                            }}/>
                        return <AddProduct key={"//add//"} itemPress={() => {
                            this.addItemPress()
                        }}/>

                    })}

                </SortableGrid>
            </View>
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