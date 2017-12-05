import React, {PureComponent} from "react";
import {View, Dimensions} from "react-native";
import styleBase from "../style/base";
import Main from './main';
import {connect} from 'react-redux';
import * as _ from "lodash";
import Menu from './menu';

import {getProduct} from '../../action/product';
import {getPayment, getTransaction} from '../../action/transaction';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.currentRoute,
        };

    }

    componentWillMount() {
        //console.warn(JSON.stringify(this.props.account));
        let {access_token} = this.props.account;
        this.props.getProduct(access_token);
        this.props.getPayment(access_token);
        //this.props.getTransaction(access_token,10,0);
    }

    async getProduct() {
        // console.warn(JSON.stringify(this.props.account.access_token));

    }

    shouldComponentUpdate(nextProps, nextState) {
        const changeRoute = this.props.currentRoute !== nextProps.currentRoute;
        return changeRoute
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
                <Menu visible={this.state.menuVisible} instant={this}/>
                <Main/>
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
    getPayment
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);