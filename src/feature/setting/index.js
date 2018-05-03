import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text} from "react-native";
import styleBase from "../../styles/base";
import NavBar from "../../component/navbar/navbar";
import SettingSideBar from "./sidebar/index";
import Discount from "./discount/index";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            {
                name: "Khuyễn Mãi",
                value: 'discount',
                image: require('../../assets/img/discount.png'),
                onPressItem: this.handleChangeRoute.bind(this)
            }
        ]
        this.state = {
            currentRoute: this.routes[0]
        }
    }

    /**
     * Handler
     */

    handleChangeRoute(route) {
        this.setState({currentRoute: route});
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite, styleBase.row]}>
                <SettingSideBar ref="sidebar"
                                routes={this.routes}
                                handleChangeRoute={(route) => this.handleChangeRoute(route)}
                                currentRoute={this.state.currentRoute}
                                width={300}/>
                <Discount/>
            </View>
        )
    }
}

Setting.propTypes = {};

Setting.defaultProps = {};

export default Setting;