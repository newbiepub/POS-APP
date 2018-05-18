import React from "react";
import PropTypes from "prop-types";
import {InteractionManager, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import SearchInput from "./search";
import List from "../../../../../component/list/list";
import {equals} from "../../../../../utils/utils";
import OrderProductItem from "./item";
import INVENTORY_ACTIVITY from "../../action/index";

const customStyles = EStyleSheet.create({
    listHeader: {
        height: 65,
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderBottomColor: '#e5e5e5'
    },
    closeBox: {
        borderRightWidth: 1,
        borderRightColor: '#e5e5e5'
    },
    spaceAround: {
        justifyContent: 'space-around'
    },
    salePriceContainer: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5'
    }
})

class OrderProductList extends React.Component {
    constructor(props) {
        super(props);
        this.list = null;
        this.state = {
            products: [],
            onSubmit: false
        }

        this.renderItem = this.renderItem.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.handleApprove = this.handleApprove.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({products: this.props.products})
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let productChanged = !equals(this.state.products, nextState.products);
        let submitChanged  = !equals(this.state.onSubmit, nextState.onSubmit);

        return productChanged || submitChanged;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({products: nextProps.products});
    }

    /**
     * Handler
     */

    handleSearchText(text) {
        if(text.length) {
            this.setState({products: this.props.products.filter(product => new RegExp(text).test(product.name))}, () => {
                this.list.onUpdateList();
            })
        }
        return this.setState({products: this.props.products}, () => this.list.onUpdateList())
    }

    handleChangeValue (field) {
        return (value, index) => {
            this.setState(state => {
                state.products[index] = {
                    ...state.products[index],
                    [field]: value
                }
                return state;
            })
        }
    }

    async handleApprove() {
        let { employeeId, products, activityId } = this.props;

        products = products.map(item => ({
            _id: item._id,
            quantity: item.quantity,
            salePrice: item.salePrice
        }))
        this.setState({onSubmit: true})
        await INVENTORY_ACTIVITY.APPROVE_ORDER(employeeId, products, activityId);
        await INVENTORY_ACTIVITY.FETCH_INVENTORY_ACTIVITY_COMPANY();
        this.setState({onSubmit: false});
        closePopup();
    }

    /**
     * renderers
     * @returns {XML}
     */

    renderItem(item, index) {
        return (
            <OrderProductItem item={item}
                              index={index}
                              onChangeQuantity={this.handleChangeValue('quantity')}
                              onChangePrice={this.handleChangeValue('salePrice')}/>
        )
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ListHeader
                    onSubmit={this.state.onSubmit}
                    onSubmitting={this.handleApprove}/>
                <SearchInput onSearchText={this.handleSearchText}/>
                <List
                    ref={ref => this.list = ref}
                    renderItem={this.renderItem}
                    dataSources={this.state.products}/>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[customStyles.listHeader]}>
            <View style={[styleBase.p_md_horizontal, styleBase.row,
                styleBase.p_md_vertical, styleBase.alignCenter]}>
                <TouchableOpacity
                    onPress={closePopup}
                    style={[styleBase.m_md_right,
                    customStyles.closeBox, styleBase.p_md_left,
                    styleBase.p_lg_right, styleBase.p_sm_vertical]}>
                    <Ionicons name="ios-close-outline" style={[styleBase.fontIcon]}/>
                </TouchableOpacity>
                <Text style={[styleBase.fontRubik, styleBase.title]}>
                    SẢN PHẨM YÊU CẦU
                </Text>
            </View>
            {
                props.onSubmit ?
                    <View
                        style={[styleBase.bgBlack, {width: 100},
                            styleBase.p_md_horizontal, styleBase.center]}>
                        <ActivityIndicator color="#fff"/>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={props.onSubmitting}
                        style={[styleBase.bgBlack,
                            styleBase.p_md_horizontal, styleBase.center]}>
                        <Text style={[styleBase.textWhite, styleBase.title]}>
                            CHUYỂN HÀNG
                        </Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

OrderProductList.propTypes = {
    employeeId: PropTypes.string,
    activityId: PropTypes.string,
    products: PropTypes.array,
};

OrderProductList.defaultProps = {
    employeeId: "",
    activityId: "",
    products: []
};

export default OrderProductList;