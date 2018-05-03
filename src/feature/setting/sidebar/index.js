import React from "react";
import {View, Animated, InteractionManager, Image,
    ScrollView, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../../styles/base";
import SidebarHeader from "./header";
import LogoutButton from "../logoutButton/index";

class SettingSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(props.collapseWidth),
            toggle: false
        }
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    /**
     * Handler
     */

    handleClickRoute (route) {
        this.props.handleChangeRoute(route);
    }

    async handleToggleSidebar() {
        let handle = InteractionManager.createInteractionHandle();
        await this.state.toggle ? this.handleCollapseSidebar() : this.handleShowSidebar();
        InteractionManager.clearInteractionHandle(handle);
        this.setState({toggle: !this.state.toggle})
    }

    handleShowSidebar() {
        return new Promise((resolve, reject) => {
            Animated.spring(this.state.width, {
                toValue: this.props.width,
                duration: 500
            }).start(resolve);
        })
    }

    handleCollapseSidebar() {
        return new Promise((resolve, reject) => {
            Animated.timing(this.state.width, {
                toValue: this.props.collapseWidth,
                duration: 500
            }).start(resolve);
        })
    }

    /**
     * Renderer
     */

    render() {
        return (
            <Animated.View style={[
                styleBase.column,
               {width: this.state.width, backgroundColor: "#666"}]}>
                <SidebarHeader
                    title={this.props.currentRoute.name}
                    toggle={this.state.toggle}
                    handleToggleSidebar={this.handleToggleSidebar}/>
                <ScrollView>
                    {this.props.routes.map((item, index) => {
                        return <OptionItem toggle={this.state.toggle} key={`ROUTE_KEYS_${index}`} {...item}/>
                    })}
                    <LogoutButton toggle={this.state.toggle}/>
                </ScrollView>
            </Animated.View>
        )
    }
}


const OptionItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPressItem(props)} style={[
            styleBase.m_md_vertical,
            styleBase.center]}>
            {
                props.toggle ?
                    <Text style={[styleBase.textWhite, styleBase.title]}>
                        {props.name}
                    </Text>
                    :
                    <Image
                        style={{width: 60, height: 60}}
                        source={props.image}/>
            }
        </TouchableOpacity>
    )
}

SettingSideBar.propTypes = {
    width: PropTypes.number,
    collapseWidth: PropTypes.number,
    handleChangeRoute: PropTypes.func
};

SettingSideBar.defaultProps = {
    width: 300,
    collapseWidth: 80,
    handleChangeRoute: () => {}
};

export default SettingSideBar;