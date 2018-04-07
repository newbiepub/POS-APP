import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {View, Spinner} from "@shoutem/ui";
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
        console.log(this.props);
        this.handleGetData(this.props.listProduct)
    }

    handleGetData (listProduct) {
        try {
            let { getUserProductInventory = [], loading } = listProduct;
            if(!loading) {
                this.setState({products: getUserProductInventory, loading});
            }
        } catch (e) {
            throw e;
        }
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

    }
};

export default ListExportProducts