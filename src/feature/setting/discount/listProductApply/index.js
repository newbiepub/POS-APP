import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {closePopup} from "../../../../component/popup/actions/popupAction";
import {connect} from "react-redux";
import {equals} from "../../../../utils/utils";
import List from "../../../../component/list/list";
import {INVENTORY} from "../../../inventory/action/index";
import store from "../../../../store/store";
import {DISCOUNT_ACTION} from "../../../../constant/actionTypes";

const listStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
    checkBoxContainer: {
        $size: 20,
        height: '$size',
        width: '$size',
        borderColor: '#444',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: '0.5 * $size'
    },
    checkBoxActive:{
        $size: 15,
        height: '$size',
        width: '$size',
        borderRadius: '$size * 0.5',
        backgroundColor: '#444'
    }
});


class ListProductApply extends React.Component {
    constructor(props) {
        super(props);
        this.list = null;
        this.state = {
            products: props.products
        }

        this.renderItem = this.renderItem.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(this.state, nextState) || !equals(this.props.productInventory, nextProps.productInventory)
    }

    async componentDidMount() {
        try {
            // Fetch Company Inventory
            await INVENTORY.FETCH_USER_PRODUCT(this.props.user._id, 'company');
        } catch (e) {
            console.warn('error - ', e.message);
        }
    }

    /**
     * Handler
     */

    handleToggle(collection, item) {
        var idx = collection.indexOf(item);
        if(idx !== -1) {
            collection.splice(idx, 1);
        } else {
            collection.push(item);
        }
    }

    handlePressItem(item) {
        this.list.onUpdateList();
        this.setState((state) => {
            let products = [...state.products];

            this.handleToggle(products, item.product._id);
            store.dispatch({
                type: DISCOUNT_ACTION.PICK_POS,
                payload: {
                    products
                }
            })
            return {
                ...state,
                products
            };
        })
    }

    /**
     * Renderer
     * @returns {XML}
     */

    renderItem (item, index) {
        return <TouchableOpacity
            style={[styleBase.row, styleBase.m_md_vertical,
                styleBase.alignCenter,
                styleBase.p_md_vertical, styleBase.p_md_horizontal]}
            onPress={() => this.handlePressItem(item)}>
            <View style={[listStyle.checkBoxContainer, styleBase.m_md_right]}>
                {this.state.products.includes(item.product._id) && <View style={[listStyle.checkBoxActive]}/>}
            </View>
            <Text style={[styleBase.fontRubik, styleBase.title]}>
                { item.product.name }
            </Text>
        </TouchableOpacity>;
    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <View style={[listStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader/>
                    <View style={[styleBase.container]}>
                        <List
                            ref={ref => this.list = ref}
                            disableVirtualization={false}
                            renderItem={this.renderItem.bind(this)}
                            dataSources={this.props.productInventory}
                            initialNumToRender={5}/>
                    </View>
                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween, {height: 65}]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title]}>
                    ÁP DỤNG CHO CÁC SẢN PHẨM
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => closePopup()}>
                <Ionicons name="ios-close" style={[
                    styleBase.p_md_horizontal, styleBase.p_md_vertical,
                    styleBase.fontIcon, styleBase.text4]}/>
            </TouchableOpacity>
        </View>
    )
}

ListProductApply.propTypes = {};

ListProductApply.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        products: state.discount.products,
        productInventory: state.inventory.products,
        user: state.auth.user
    }
}

export default connect(mapStateToProps) (ListProductApply);