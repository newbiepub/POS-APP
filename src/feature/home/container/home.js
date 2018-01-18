import React from "react";
import {Easing, StyleSheet} from "react-native";
import {DropDownMenu, NavigationBar, View, Text} from "@shoutem/ui";
import {FadeIn, TimingDriver} from "@shoutem/animation";
import styleBase from "../../../styles/base";
import POS from "../../pos/container/pos";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {title: 'QUẢN LÝ POS', route: 'pos'},
                {title: 'THỐNG KÊ', route: 'report'},
                {title: 'QUẢN LÝ KHO ', route: 'inventory'},
                {title: "CÀI ĐẶT", route: 'setting'}
            ]
        };
        this.state.currentRoute = this.state.routes[0];
    }

    static propTypes = {};

    static defaultProps = {};

    renderCenterComponent() {
        return (
            <DropDownMenu
                options={this.state.routes}
                selectedOption={this.state.currentRoute}
                onOptionSelected={(route) => this.setState({currentRoute: route})}
                titleProperty="title"
                valueProperty="value"
            />
        )
    }

    render() {
        const timingDriver = new TimingDriver({
            duration: 750,
            easing: Easing.linear,
            delay: 0
        });

        timingDriver.toValue(1); // Start Animation
        return (
            <View style={StyleSheet.flatten([styleBase.container])}>
                <NavigationBar
                    styleName="inline"
                    style={{container: {paddingHorizontal: 15}}}
                    centerComponent={this.renderCenterComponent()}
                />
                {this.state.currentRoute.route === "pos" &&
                <FadeIn driver={timingDriver}>
                    <POS navigator={this.props.navigator}/>
                </FadeIn>
                }
            </View>
        )
    }
}

export default (Home)