import React, {PureComponent} from "react";
import {View} from "react-native";
import styleBase from "../style/base";
import POS from './POS/pointOfSale';
import Transaction from './transaction/transaction';
import Product from './product/product';
import Setting from './setting/setting';
import {connect} from 'react-redux';
import * as _ from "lodash";
import Menu from './menu';

import {getProduct} from '../../action/product';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: this.props.currentRoute,
            menuVisible: false,
        }
    }

    componentWillMount() {
        //console.warn(JSON.stringify(this.props.account));
        let {access_token} = this.props.account;
        this.props.getProduct(access_token)

    }

    async getProduct() {
        // console.warn(JSON.stringify(this.props.account.access_token));

    }
    shouldComponentUpdate(nextProps,nextState) {
        const changeRoute = this.props.currentRoute !== nextProps.currentRoute;
        const changeMenu = this.state.menuVisible !== nextState.menuVisible;
        return changeRoute || changeMenu
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
                {
                    this.state.route === "POS" &&
                    <POS openMenu={() => {
                        this.openMenu()
                    }}/>
                }
                {
                    this.state.route === "transaction" &&
                    <Transaction openMenu={() => {
                        this.openMenu()
                    }}/>
                }
                {
                    this.state.route === "item" &&
                    <Product openMenu={() => {
                        this.openMenu()
                    }}/>
                }
                {
                    this.state.route === "setting" &&
                    <Setting openMenu={() => {
                        this.openMenu()
                    }} title="Cài Đặt"
                             navigator={this.props.navigator}/>
                }
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
    getProduct
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);