import React from "react";
import PropTypes from "prop-types";
import {View, Text, InteractionManager, TouchableOpacity, SafeAreaView, ActivityIndicator} from "react-native";
import NoData from "../../../../component/noData/noData";
import ProductList from "../component/product/productList";
import CommingSoon from "../../../../component/commingSoon/commingSoon";
import {equals} from "../../../../utils/utils";
import styleBase from "../../../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../../../../component/navbar/navbar";
import ErrorBoundary from "../../../../component/errorBoundary/errorBoundary";
import {AfterInteractions} from "react-native-interactions";
import {openPopup, renderContent} from "../../../../component/popup/actions/popupAction";
import DropDown from "../../../../component/dropDown/index";
import CategoryList from "../component/category/categoryList";

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

        this.renderCenterComponent = this.renderCenterComponent.bind(this);
        this.renderRightComponent  = this.renderRightComponent.bind(this);
    }

    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: ""
    };

    /**
     * Component Life Cycle
     */

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(this.state, nextState);
    }

    /**
     * Hander
     */

    handleClickDropDown () {
        openPopup();
        renderContent(
            <DropDown label="title" onPressItem={(route) => {
                this.setState({currentRoute: route})
            }} items={this.routes}/>
        )
    }

    /**
     * Renderer
     * @returns {XML}
     */

    renderCenterComponent() {
        return (
            <View style={[styleBase.center]}>
                <Text style={[styleBase.title, styleBase.fontRubik]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

    renderRightComponent() {
        return (
            <TouchableOpacity
                onPress={() => this.handleClickDropDown()}
                style={[styleBase.center, styleBase.row]}>
                <Text style={[styleBase.title, styleBase.fontRubik]}>
                    {this.state.currentRoute.title}
                </Text>
                <Ionicons name={'ios-arrow-down'} style={[styleBase.title]}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ErrorBoundary>
                <SafeAreaView style={[styleBase.container]}>
                    <NavBar
                        navigator={this.props.navigator}
                        renderRightComponent={this.props.editable ? this.renderRightComponent: () => null}
                        renderCenterComponent={this.renderCenterComponent}/>
                    {
                        this.state.currentRoute.route === "product" &&
                            <ErrorBoundary>
                                <AfterInteractions>
                                    <ProductList {...this.props}/>
                                </AfterInteractions>
                            </ErrorBoundary>
                    }
                    {
                        this.state.currentRoute.route === "category" &&
                        <CategoryList/>
                    }

                </SafeAreaView>
            </ErrorBoundary>

        )
    }
}

ProductManagement.propTypes = {
    editable: PropTypes.bool
};

ProductManagement.defaultProps = {
    editable: true
};

export default (ProductManagement);