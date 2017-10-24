import React from "react";
import {connect} from "react-redux";
import {Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import SortableGrid from "../../sortableGrid/sortableGrid";
import styleHome from "../../style/home";
import ProductItem from "./productItem";
import styleProduct from "../../style/product";
import Ionicons from "react-native-vector-icons/Ionicons";

class AddProduct extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styleProduct.addItemButton, styleBase.center]}>
                <Ionicons name='ios-add-outline'
                          style={[styleBase.font26, styleBase.textE5]}
                />
            </TouchableOpacity>
        )
    }
}

class ProductGrid extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.grow, styleProduct.productWrapper]}>
                <SortableGrid
                    blockTransitionDuration      = { 400 }
                    activeBlockCenteringDuration = { 200 }
                    itemsPerRow                  = { 4 }
                    dragActivationTreshold       = { 200 }
                >
                    {[1,2,3,4,5, "add"].map(num => {
                        if(num !== "add")
                            return <ProductItem key={num}/>
                        return <AddProduct key="addProduct"/>
                    })}
                </SortableGrid>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null) (ProductGrid);