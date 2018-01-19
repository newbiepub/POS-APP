import React from "react";
import {DropDownMenu, NavigationBar, Screen, View, Icon, TouchableOpacity} from "@shoutem/ui";
import POS from "../../pos/container/pos";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import POSCreator from "../../pos/component/posCreator";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {title: 'QUẢN LÝ POS', route: 'pos'},
                {title: 'THỐNG KÊ', route: 'report'},
                {title: 'QUẢN LÝ KHO ', route: 'inventory'},
                {title: "CÀI ĐẶT", route: 'setting'}
            ],
            isChangeDimension: false
        };
        this.state.currentRoute = this.state.routes[0];
    }

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

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

    renderRightComponent() {
        if(this.state.currentRoute.route === "pos") {

            // Render Button Add POS
            return (
                <TouchableOpacity onPress={() => {
                    openPopup();
                    renderContent(<POSCreator/>)
                }}>
                    <Icon name="plus-button"/>
                </TouchableOpacity>
            )
        }
        return <View/>
    }

    render() {
        try {
            return (
                <Screen styleName="paper">
                    <NavigationBar
                        styleName="inline"
                        style={{container: {paddingHorizontal: 15}}}
                        centerComponent={this.renderCenterComponent()}
                        rightComponent={this.renderRightComponent()}
                    />
                    {this.state.currentRoute.route === "pos" &&
                    <POS navigator={this.props.navigator}/>
                    }
                </Screen>
            )
        }
        catch(e) {
            console.warn("error - render Home");
            return <Screen/>
        }
    }
}

export default (Home)