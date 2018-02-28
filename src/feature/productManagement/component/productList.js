import React from "react";
import {StyleSheet, InteractionManager} from "react-native";
import styleBase from "../../../styles/base";
import {Caption, ListView, Spinner, View, TouchableOpacity, Icon, TextInput} from "@shoutem/ui";
import NoData from "../../../component/noData/noData";
import ProductItem from "./productItem";
import { graphql, compose } from "react-apollo";
import {getProductInventory} from "../action/productManagementAction";
import {isEqual} from "lodash";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            {
                title: "MẶT HÀNG", route: "product",
            },
            {
                title: "LOẠI HÀNG", route: "category"
            }
        ];
        this.state = {
            employeeInventory: {},
            loading: true
        }
    }

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.state, nextState);
    }

    componentWillReceiveProps(nextProps) {
        try {
            let data = nextProps.data || {};

            if(nextProps.data.error) {
                throw new Error(nextProps.data.error.message)
            }

            InteractionManager.runAfterInteractions(() => {
                try {
                    if(!data.getUserInventory && !data.loading) {
                        return this.setState({employeeInventory: "NoData", loading: false});
                    }

                    return this.setState({employeeInventory: data.getUserInventory || {}, loading: data.loading});
                }
                catch (e) {
                    console.log(e);
                    console.warn("error - componentWillReceiveProps")
                }
            })
        }
        catch(e) {
            console.log(e);
            console.warn("error - componentWillReceiveProps - productManagement")
        }
    }

    renderItem(rowData, sectionId, index, numberOfRows) {
        if(!parseInt(index)) {
            console.log(rowData);
        }
        return <ProductItem key={index} item={rowData}/>
    }

    render() {
        try {
            let productItem = this.state.employeeInventory.productItem || [];

            return (
                <View style={StyleSheet.flatten([styleBase.container])}>
                    <View styleName="horizontal v-center" style={StyleSheet.flatten([styleBase.p_md_right])}>
                        <View style={StyleSheet.flatten([styleBase.grow])}>
                            <TextInput
                                styleName="full-width"
                                placeholder="TÌM KIẾM"/>
                        </View>
                        <Icon name="search" style={{color: "#444"}}/>
                    </View>
                    {/* Search Box */}
                    <View styleName="horizontal"
                          style={StyleSheet.flatten([styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.bgE5])}>
                        <View style={{flex: 0.33}}>
                            <Caption>
                                TÊN SẢN PHẨM
                            </Caption>
                        </View>
                        <View styleName="horizontal v-center h-center" style={{flex: 0.33}}>
                            <Caption>
                                SỐ LƯỢNG
                            </Caption>
                        </View>
                        <View styleName="horizontal v-center h-center" style={{flex: 0.2}}>
                            <Caption>
                                ĐƠN VỊ
                            </Caption>
                        </View>

                        <TouchableOpacity style={StyleSheet.flatten([{flex: 0.13, alignItems: "center", justifyContent: 'flex-end'}, styleBase.row])}>
                            <Icon name="plus-button" />
                        </TouchableOpacity>
                    </View>
                    <View style={StyleSheet.flatten([styleBase.container])}>
                        {
                            this.state.loading && (this.state.employeeInventory != undefined) &&
                            <Spinner/>
                        }
                        {
                            (productItem.length > 0 && this.state.employeeInventory !== "NoData") &&
                            <ListView
                                loading={this.state.loading}
                                data={productItem}
                                renderRow={this.renderItem.bind(this)}
                            />
                        }
                        {
                            ((this.state.employeeInventory === "NoData" || productItem.length === 0) && !this.state.loading) &&
                            <View styleName="xl-gutter-top">
                                <NoData/>
                            </View>
                        }
                    </View>
                </View>
            )
        }
        catch (e) {
            console.log(e);
            console.warn("error - render ProductList");
            throw e;
        }
    }
}

export default compose(graphql(getProductInventory, {
    options: (props) => {
        return {
            variables: {
                type: props.type,
                userId: props.user._id
            },
            fetchPolicy: "cache-and-network"
        }
    },
}))(ProductList)