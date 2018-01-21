import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {
    View,
    DropDownMenu,
    Icon,
    NavigationBar,
    Screen,
    TouchableOpacity,
    Title,
    Divider,
    Caption,
    Row,
    Subtitle,
    Text,
    Spinner,
    ListView
} from "@shoutem/ui";
import styleBase from "../../../styles/base";
import ProductItem from "../component/productItem";
import {graphql} from "react-apollo";
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
            let {data} = nextProps;
            if (data.error) {
                throw new Error(data.error.message);
            }

            if(!data.getUserInventory && !data.loading) {
                return this.setState({employeeInventory: "NoData", loading: false});
            }

            return this.setState({employeeInventory: data.getUserInventory, loading: data.loading});
        }
        catch (e) {
            console.warn("error - componentWillReceiveProps")
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
        return <ProductItem key={index}/>
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
                        <View styleName="space-between horizontal"
                              style={StyleSheet.flatten([styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.bgE5])}>
                            <Caption>
                                TÊN SẢN PHẨM
                            </Caption>
                            <Caption>
                                SỐ LƯỢNG
                            </Caption>
                            <Caption/>
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
        }
    }
}

export default graphql(getProductInventory, {
    options: (props) => {
        return {
            variables: {
                type: "employee",
                userId: props.posItem._id
            },
            fetchPolicy: "cache-and-network",
        }
    },
})(ProductManagement);