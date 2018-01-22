import React from "react";
import {DropDownMenu, NavigationBar, Screen, View, Icon, TouchableOpacity} from "@shoutem/ui";
import POS from "../../pos/container/pos";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import POSCreator from "../../pos/component/posCreator";
import CompanyInventory from "../../companyInventory/container/companyInventory";
import {graphql} from "react-apollo";
import {getCurrentUser} from "../../login/action/login";

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

    componentWillReceiveProps (nextProps) {
        try {
            let data = nextProps.data || {};
            if(data.error) {
                throw new Error(data.error.message);
            }
        } catch(e) {
            console.log(e);
            console.warn("error - componentWillReceiveProps - Home");
        }
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
        if (this.state.currentRoute.route === "pos") {

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
        return null;
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
                    {
                        this.state.currentRoute.route === "inventory" &&
                        <CompanyInventory {...this.props}/>
                    }
                </Screen>
            )
        }
        catch (e) {
            console.warn("error - render Home");
            return <Screen/>
        }
    }
}

export default graphql(getCurrentUser, {
    options: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
    }
})(Home)