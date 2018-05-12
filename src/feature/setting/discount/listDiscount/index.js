import React from "react";
import PropTypes from "prop-types";
import {View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from "react-native";
import styleBase from "../../../../styles/base";
import DISCOUNT from "../action/index";
import { connect } from "react-redux";
import NoData from "../../../../component/noData/noData";
import DiscountHeader from "./head";
import DiscountItem from "./item";
import {uuid} from "../../../../utils/utils";

class ListDiscount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.handleFetchData();
    }

    async handleFetchData() {
        try {
            await DISCOUNT.FETCH_ALL_DISCOUNT()
        } catch (e) {}
        this.setState({loading: false})
    }

    handlePressAddDiscount() {

    }

    render() {

        return (
            <View style={[styleBase.container]}>
                {
                    this.state.loading &&
                        <View style={[styleBase.center]}>
                            <ActivityIndicator size="large"/>
                        </View>
                }
                {
                    !this.state.loading && this.props.discounts.length === 0 &&
                        <NoData/>
                }
                {
                    !this.state.loading && this.props.discounts.length > 0 &&
                    <React.Fragment>
                        <DiscountHeader/>
                        <ScrollView removeClippedSubviews={true}>
                            {this.props.discounts.map((item, index) => {
                                return <DiscountItem key={uuid()} index={index} item={item}/>
                            })}
                        </ScrollView>
                        <ButtonAddDiscount onPress={() => this.props.navigator.push({id: 'discount_input'})}/>
                    </React.Fragment>
                }
            </View>
        )
    }
}

const ButtonAddDiscount = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[
            styleBase.p_md_horizontal, styleBase.p_md_vertical,
            styleBase.center, styleBase.bgBlack]}>
            <Text style={[styleBase.textWhite]}>
                THÊM KHUYẾN MẠI
            </Text>
        </TouchableOpacity>
    )
}

ListDiscount.propTypes = {};

ListDiscount.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        discounts: state.discount.data
    }
}

export default connect(mapStateToProps)(ListDiscount);