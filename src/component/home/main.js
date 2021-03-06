import React from "react";
import {View} from "react-native";
import styleBase from "../style/base";
import POS from './POS/pointOfSale';
import Transaction from './transaction/transaction';
import Report from './report/report';
import Setting from './setting/setting';
import Inventory from "./inventory/inventory";
import Invoice from "./invoice/invoice";
import {connect} from 'react-redux';
import * as Animate from "react-native-animatable";
import {openMenu} from '../../action/route';
import {getProduct} from '../../action/product';


class Main extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const routeChanged = this.props.currentRoute !== nextProps.currentRoute;
        return routeChanged
    }

    render() {
        return (
            <View style={[styleBase.container]}>

                {
                    this.props.currentRoute === "POS" &&
                    <Animate.View style={{flex: 1}}>
                        <POS openMenu={() => {
                            this.props.openMenu()
                        }}/>
                    </Animate.View>

                }
                {
                    this.props.currentRoute === "transaction" &&
                    <Animate.View animation={"fadeIn"} duration={750} style={{flex: 1}}>
                        <Transaction openMenu={() => {
                            this.props.openMenu()
                        }}/>
                    </Animate.View>

                }
                {
                    this.props.currentRoute === "report" &&
                    <Animate.View animation={"fadeIn"} duration={750} style={{flex: 1}}>
                        <Report openMenu={() => {
                            this.props.openMenu()
                        }}/>
                    </Animate.View>

                }
                {
                    this.props.currentRoute === "setting" &&
                    <Animate.View style={{flex: 1}}>
                        <Setting openMenu={() => {
                            this.props.openMenu()
                        }} title="Cài Đặt"
                                 navigator={this.props.navigator}/>
                    </Animate.View>
                }
                {
                    this.props.currentRoute === "inventory" &&
                    <Animate.View style={{flex: 1}}>
                        <Inventory
                            openMenu={this.props.openMenu.bind(this)}
                            navigator={this.props.navigator}/>
                    </Animate.View>
                }
                {
                    this.props.currentRoute === "invoice" &&
                    <Animate.View style={{flex: 1}}>
                        <Invoice
                            openMenu={this.props.openMenu.bind(this)}
                            navigator={this.props.navigator}/>
                    </Animate.View>
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
    getProduct,
    openMenu
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);