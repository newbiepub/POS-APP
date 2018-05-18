import React from "react";
import PropTypes from "prop-types";
import {View, Alert, InteractionManager, ActivityIndicator} from "react-native";
import INVENTORY_ACTIVITY from "../../action/index";
import {connect} from "react-redux";
import {orders} from "../../../../../selector/inventory";
import List from "../../../../../component/list/list";
import {equals} from "../../../../../utils/utils";
import RequestOrderItem from "./item";
import {INVENTORY} from "../../../action/index";
import styleBase from "../../../../../styles/base";
import NoData from "../../../../../component/noData/noData";

class RequestOrderList extends React.Component {
    constructor(props) {
        super(props);
        this.list = null;
        this.state = {
            orders: [],
            loading: true
        }

        this.renderItem = this.renderItem.bind(this);
        this.handleOnReFresh = this.handleOnReFresh.bind(this)
    }

    /**
     * Component life cycle
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */

    componentDidMount () {
        InteractionManager.runAfterInteractions(() => {
            this.handleFetchOrder(this.props);
        })
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            orders: nextProps.orders,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let ordersChanged  = !equals(this.state.orders, nextState.orders);
        let loadingChanged = !equals(this.state.loading, nextState.loading);

        return ordersChanged || loadingChanged;
    }

    /**
     * Handler
     * @returns {Promise.<void>}
     */

    async handleOnReFresh() {
        await this.handleFetchOrder(this.props);
    }

    async handleFetchOrder(props)  {
        try {
            let {user} = props;

            await Promise.all([
                INVENTORY.FETCH_USER_PRODUCT(user._id, 'company'),
                INVENTORY_ACTIVITY.FETCH_INVENTORY_ACTIVITY_COMPANY(),
            ])
        } catch (e) {
            console.warn(e.message)
            Alert.alert('ĐÃ CÓ LỖI XẢY RA');
        }
        this.setState({loading: false})
    }

    renderItem(item, index) {
        return (
            <RequestOrderItem item={item} index={index} navigator={this.props.navigator}/>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading &&
                    <View style={[styleBase.center]}>
                        <ActivityIndicator size="large"/>
                    </View>
                }
                {
                    !this.state.loading && this.state.orders.length === 0 &&
                        <NoData/>
                }
                {
                    !this.state.loading && this.state.orders.length > 0 &&
                    <List
                        ref={ref => this.list = ref}
                        onRefresh={this.handleOnReFresh}
                        renderItem={this.renderItem} dataSources={this.state.orders}/>
                }
            </React.Fragment>
        )
    }
}

RequestOrderList.propTypes = {};

RequestOrderList.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        ...orders(state)
    }
}

export default connect(mapStateToProps) (RequestOrderList);