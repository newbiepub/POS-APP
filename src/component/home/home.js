import React from "react";
import {View} from "react-native";
import styleBase from "../style/base";
import Main from './main';
import {connect} from 'react-redux';
import * as _ from "lodash";
import Menu from './menu';

import {getProduct, getDiscount} from '../../action/product';
import {getPayment, getTransaction, countTransaction, getCurrentTax} from '../../action/transaction';
import {getInventoryProduct} from '../../action/inventory';
import {ASYNC_STORAGE} from "../../constant/constant";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.currentRoute,
        };

    }


    async componentWillMount() {
        //console.warn(JSON.stringify(this.props.account));
        let {access_token} = this.props.account;
        getInventoryProduct(access_token);
        let a = await this.props.countTransaction(access_token);
        this.props.getProduct(access_token);
        this.props.getPayment(access_token);
        this.props.getDiscount(access_token);
        this.props.getTransaction(access_token, 10, 0);
        this.props.getCurrentTax()
    }


    shouldComponentUpdate(nextProps, nextState) {
        const changeRoute = this.props.currentRoute !== nextProps.currentRoute;
        const transactionChanged = this.props.transaction !== nextProps.transaction;

        return changeRoute || transactionChanged
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.currentRoute, nextProps.currentRoute)) {
            this.setState({route: nextProps.currentRoute});
        }
    }

    openMenu() {
        this.setState({
            menuVisible: true
        })
    }


    render() {

        return (
            <View style={[styleBase.container]}>
                <Menu visible={this.state.menuVisible} instant={this} navigator={this.props.navigator}/>
                <Main navigator={this.props.navigator}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        currentRoute: state.route.currentRoute,
    }
};
const mapDispatchToProps = {
    getProduct,
    getTransaction,
    getPayment,
    getDiscount,
    countTransaction,
    getCurrentTax
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);