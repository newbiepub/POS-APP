import React from "react";
import PropTypes from "prop-types";
import {View, Text, InteractionManager, TouchableOpacity, SafeAreaView} from "react-native";
import NoData from "../../../../component/noData/noData";
import ProductList from "../component/productList";
import CommingSoon from "../../../../component/commingSoon/commingSoon";
import {equals} from "../../../../utils/utils";
import styleBase from "../../../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../../../../component/navbar/navbar";

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
            <TouchableOpacity style={[styleBase.center, styleBase.row]}>
                <Text style={[styleBase.title, styleBase.fontRubik]}>
                    {this.state.currentRoute.title}
                </Text>
                <Ionicons name={'ios-arrow-down'} style={[styleBase.title]}/>
            </TouchableOpacity>
        )
    }

    render() {
        try {
            return (
                <SafeAreaView style={[styleBase.container]}>
                    <NavBar
                        navigator={this.props.navigator}
                        renderCenterComponent={this.renderCenterComponent}/>
                    {
                        this.state.currentRoute.route === "product" &&
                        <CommingSoon/>
                    }
                    {
                        this.state.currentRoute.route === "category" &&
                        <CommingSoon/>
                    }

                </SafeAreaView>
            )
        }
        catch (e) {
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