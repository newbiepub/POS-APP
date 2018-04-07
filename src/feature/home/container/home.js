import React from "react";
import {DropDownMenu, Icon, NavigationBar, Screen, TouchableOpacity} from "@shoutem/ui";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import POSCreator from "../../pos/component/posCreator";
import CompanyInventory from "../../inventory/companyInventory/container/companyInventory";
import CommingSoon from "../../../component/commingSoon/commingSoon";
import POS from "../../pos/container/pos";
import {AUTH} from "../../login/action/login";

class Home extends React.PureComponent {
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

    async componentDidMount() {
        try {
            await AUTH.CURRENT_USER();
        } catch (e) {
            console.warn("ERROR = ", e.message);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            let data = nextProps.data || {};
            if (data.error) {
                throw new Error(data.error.message);
            }
        } catch (e) {
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
                    <POS {...this.props}/>
                    }
                    {
                        this.state.currentRoute.route === "inventory" &&
                        <CompanyInventory {...this.props}/>
                    }
                    {
                        (this.state.currentRoute.route === "setting" || this.state.currentRoute.route === "report") &&
                        <CommingSoon/>
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

export default Home