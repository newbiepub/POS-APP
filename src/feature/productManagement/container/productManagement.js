import React from "react";
import PropTypes from "prop-types";
import {DropDownMenu, Icon, NavigationBar, Screen, Title, TouchableOpacity, View} from "@shoutem/ui";
import {isEqual} from "lodash";
import NoData from "../../../component/noData/noData";
import ProductList from "../component/productList";

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
        return !isEqual(this.state, nextState);
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

    render() {
        try {


            return (
                <Screen styleName="paper">
                    <NavigationBar
                        style={{container: {paddingHorizontal: 15}}}
                        styleName="inline"
                        centerComponent={this.renderCenterComponent()}
                        leftComponent={this.renderLeftComponent()}
                        rightComponent={this.renderRightComponent()}
                    />
                    {
                        this.state.currentRoute.route === "product" &&
                        <ProductList {...this.props}/>
                    }

                </Screen>
            )
        }
        catch(e) {
            console.log(e);
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

export default (ProductManagement);