import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, View, ActivityIndicator, SafeAreaView, TouchableOpacity, Text, Alert} from "react-native";
import styleBase from "../../../styles/base";
import {getProductInventory} from "../productManagement/action/productManagementAction";
import NoData from "../../../component/noData/noData";
import Table from "./listProductComponent/table";
import {exportActionFields} from "../../../utils/tableFields";
import { connect } from "react-redux";
import {INVENTORY} from "../action/index";
import NavBar from "../../../component/navbar/navbar";
import ErrorBoundary from "../../../component/errorBoundary/errorBoundary";
import LoadingOverlay from "../../../component/loadingOverlay/index";

/**
 * List Component
 */

class ListExportProducts extends React.Component {
    constructor(props) {
        super(props);
        this.loading = null;
        this.table = null;

        this.state = {
            products: [],
            loading: true
        }

    }

    /**
     * Component life cycle
     */
    componentDidMount() {
        this.handleFetchProducts();
    }

    /**
     * handler
     */

    async handleFetchProducts () {
        try {
            let { user = {} } = this.props;
            await INVENTORY.FETCH_USER_PRODUCT(user._id, 'company');
            this.setState({loading: false})
        } catch (e) {
            console.warn(e.message);
        }
    }

   async handleExportProducts(products) {
        try {
           this.loading.show();
           let { employee = {} } = this.props;
           let { _id = '' } = employee;
           let products = this.table.handleSubmitExport();
           console.warn(JSON.stringify(products[0], null, 4));
           // let response = await INVENTORY.EXPORT_PRODUCT(_id, products, false);
           //
           // Alert.alert('Thông báo', 'Xuất kho thành công',[
           //     {text: 'OK', onPress: () => this.props.navigator.pop()},
           // ],)
        } catch (e) {
            console.warn(e.message);
            alert('Đã có lỗi xảy ra')
        }
        this.loading.hide();
    }

    /**
     * renderer
     * @returns {XML}
     */

    renderRightComponent () {
        let rightComponent = null;

        if(!this.state.loading) {
            rightComponent = (
                <ErrorBoundary fallback={<View/>}>
                    <SubmitButton onPress={() => this.handleExportProducts()}/>
                </ErrorBoundary>
            )
        }
        return rightComponent;
    }

    render() {
        let { loading } = this.state;
        let { products = [] } = this.props;

        let renderListProduct = (
                <ActivityIndicator size="large"/>
        );

        if(!loading) {
            if(products.length){
                renderListProduct = (
                    <Table
                        ref={table => this.table = table}
                        products={products}/>
                )
            } else {
                renderListProduct = <NoData/>
            }
        }

        return (
            <SafeAreaView style={[styleBase.container, styleBase.bgWhite]}>
                <NavBar navigator={this.props.navigator}
                        renderRightComponent={() => this.renderRightComponent()}
                        title={this.props.title}/>
                {renderListProduct}
                <LoadingOverlay ref={loading => this.loading = loading}/>
            </SafeAreaView>
        );
    }
}

const SubmitButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styleBase.center, styleBase.row]}>
            <Text style={[styleBase.fontRubik, styleBase.title, styleBase.text4]}>
                XUẤT HÀNG
            </Text>
        </TouchableOpacity>
    )
}

ListExportProducts.propTypes = {};

ListExportProducts.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        products: state.inventory.products
    }
};

export default connect(mapStateToProps)(ListExportProducts)