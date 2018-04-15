import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, View, ActivityIndicator} from "react-native";
import styleBase from "../../../styles/base";
import {getProductInventory} from "../productManagement/action/productManagementAction";
import NoData from "../../../component/noData/noData";
import Table from "../../../component/table/table";
import {exportActionFields} from "../../../utils/tableFields";
import { connect } from "react-redux";

/**
 * List Component Item
 */

class ListExportComponent extends React.PureComponent {
    
}

/**
 * List Component
 */

class ListExportProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        }
    }

    componentDidMount() {

    }

    render() {
        let { loading, products } = this.state;
        let renderListProduct = (
            <Spinner/>
        );

        if(!loading) {
            if(products.length){
                renderListProduct = (
                    <Table fields={exportActionFields}/>
                )
            } else {
                renderListProduct = <NoData/>
            }
        }
        return renderListProduct;
    }
}

ListExportProducts.propTypes = {};

ListExportProducts.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        history: state.inventory.history
    }
};

export default connect(mapStateToProps)(ListExportProducts)