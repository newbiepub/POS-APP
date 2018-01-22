import React from "react";
import PropTypes from "prop-types";
import {InteractionManager, StyleSheet} from "react-native";
import {
    Caption,
    DropDownMenu,
    Icon,
    ListView,
    NavigationBar,
    Screen,
    Spinner,
    Title,
    TouchableOpacity,
    View
} from "@shoutem/ui";
import styleBase from "../../../styles/base";
import ProductItem from "../component/productItem";
import {graphql, compose} from "react-apollo";
import {getProductInventory} from "../action/productManagementAction";
import NoData from "../../../component/noData/noData";

class ProductManagement extends React.Component {
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
            currentRoute: this.routes[0],
            employeeInventory: {},
            loading: true
        }
    }

    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: ""
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
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

                    return this.setState({employeeInventory: data.getUserInventory, loading: data.loading});
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

    renderCenterComponent() {
        return (
            <Title>
                {this.props.title}
            </Title>
        )
    }

    renderLeftComponent() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigator.pop()}
            >
                <Icon name="back"/>
            </TouchableOpacity>
        )
    }

    renderRightComponent() {
        return (
            <DropDownMenu
                options={this.routes}
                selectedOption={this.state.currentRoute}
                onOptionSelected={(route) => this.setState({currentRoute: route})}
                titleProperty="title"
                valueProperty="route"
            />
        )
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
                <Screen styleName="paper">
                    <NavigationBar
                        style={{container: {paddingHorizontal: 15}}}
                        styleName="inline"
                        centerComponent={this.renderCenterComponent()}
                        leftComponent={this.renderLeftComponent()}
                        rightComponent={this.renderRightComponent()}
                    />
                    <View styleName="md-gutter-bottom">
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
                </Screen>
            )
        }
        catch(e) {
            console.warn("error - render productManagement");
            return (
                <Screen styleName="paper">
                    <NavigationBar
                        style={{container: {paddingHorizontal: 15}}}
                        styleName="inline"
                        centerComponent={this.renderCenterComponent()}
                        leftComponent={this.renderLeftComponent()}
                        rightComponent={this.renderRightComponent()}
                    />
                    <View styleName="xl-gutter-top">
                        <NoData/>
                    </View>
                </Screen>
            )
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
}))(ProductManagement);