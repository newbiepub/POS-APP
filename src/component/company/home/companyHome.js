import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import Header from "../header/header";
import {connect} from "react-redux";
import * as _ from "lodash";
import Menu from "../menu/menu";
import Main from "./companyMain";
import {getCurrentCompany} from "../../../action/accountCompany";
import {getCurrentTax} from '../../../action/taxCompany';
import {getTransaction,countTransaction} from '../../../action/transactionCompany';

class CompanyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: this.props.currentRoute
        }
    }

    async getTransaction(){
        await this.props.countTransaction();
        while(this.props.transaction.currentNumberOfTransaction < this.props.transaction.transactionAmount)
        {
            await this.props.getTransaction(10,this.props.transaction.currentNumberOfTransaction);
        }

    }
    async componentWillMount() {
        // let {access_token} = this.props.account;
        await getCurrentCompany()
        await this.props.getCurrentTax()
        this.getTransaction()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.currentRoute !== nextProps.currentRoute;
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
        account: state.accountCompany,
        currentRoute: state.routeCompany.currentRoute,
        transaction: state.transaction
    }
};
const mapDispatchToProps = {
    getCurrentTax,
    getTransaction,
    countTransaction
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome);