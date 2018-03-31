import React from "react";
import {StyleSheet, InteractionManager} from "react-native";
import styleBase from "../../../../styles/base";
import {Caption, ListView, Spinner, View, TouchableOpacity, Icon, TextInput} from "@shoutem/ui";
import NoData from "../../../../component/noData/noData";
import ProductItem from "./productItem";
import { graphql, compose } from "react-apollo";
import {getProductInventory} from "../action/productManagementAction";
import {isEqual} from "lodash";
import List from "../../../../component/list/list";

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
        this.productItem = [];
        this.state = {
            employeeProductInventory: [],
            searchText: "",
            loading: true
        }

        this.handleChangeText = this.handleChangeText.bind(this);
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
                    if(!data.getUserProductInventory && !data.loading) {
                        return this.setState({employeeProductInventory: "NoData", loading: false});
                    }
                    this.productItem = data.getUserProductInventory || [];
                    return this.setState({employeeProductInventory: data.getUserProductInventory || [], loading: data.loading});
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

    handleChangeText(searchText) {
        // handle search text
        this.setState(  (prevState) => {
            if(searchText.length > 0) {
                prevState.employeeProductInventory = this.productItem.filter(item => {
                    return new RegExp(searchText, 'gi').test(item.product.name);
                });

            } else {
                prevState.employeeProductInventory = this.productItem;
            }
            return {
                searchText: searchText,
                employeeProductInventory: prevState.employeeProductInventory
            }
        });
    }

    async onRefresh() {
        try {
            this.setState({loading: true}); // Set refreshing indicator
            await this.props.data.refetch(); // Refetch New data
            return this.setState({loading: false});
        } catch(e) {
            console.warn("ERROR onRefresh() - productList.js");
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
            let productItem = this.state.employeeProductInventory || [];

            return (
                <View style={StyleSheet.flatten([styleBase.container])}>
                    <View styleName="horizontal v-center" style={StyleSheet.flatten([styleBase.p_md_right])}>
                        <View style={StyleSheet.flatten([styleBase.grow])}>
                            <TextInput
                                styleName="full-width"
                                onChangeText={this.handleChangeText}
                                value={this.state.searchText}
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
                        <View style={{flex: 0.13}}/>
                    </View>
                    <View style={StyleSheet.flatten([styleBase.container])}>
                        {
                            this.state.loading && (productItem.length === 0) &&
                            <Spinner/>
                        }
                        {
                            (productItem.length > 0 && this.state.employeeProductInventory !== "NoData") &&
                            <List
                                onRefresh={this.onRefresh.bind(this)}
                                dataSources={productItem}
                                renderItem={this.renderItem.bind(this)}
                            />
                        }
                        {
                            ((productItem === "NoData") && !this.state.loading) &&
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