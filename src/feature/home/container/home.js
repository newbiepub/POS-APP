import React from "react";
import {View, TouchableOpacity, Text, SafeAreaView, InteractionManager} from "react-native";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import POSCreator from "../../pos/component/posCreator";
import CompanyInventory from "../../inventory/companyInventory/container/companyInventory";
import CommingSoon from "../../../component/commingSoon/commingSoon";
import POS from "../../pos/container/pos";
import {AUTH} from "../../login/action/login";
import styleBase from "../../../styles/base";
import NavBar from "../../../component/navbar/navbar";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDown from "../../../component/dropDown/index";
import ErrorBoundary from "../../../component/errorBoundary/errorBoundary";

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

        this.renderLeftComponent     = this.renderLeftComponent.bind(this);
        this.renderCenterComponent   = this.renderCenterComponent.bind(this);
        this.handleOpenDropDown      = this.handleOpenDropDown.bind(this);
        this.handleClickItemDropDown = this.handleClickItemDropDown.bind(this);
    }

    static propTypes = {};

    static defaultProps = {};

    /**
     * Component Life cycle
     * @returns {Promise.<void>}
     */

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

    /**
     * Handler
     */

    handleClickItemDropDown (route) {
        this.setState({currentRoute: route});
    }

    handleOpenDropDown () {
        InteractionManager.runAfterInteractions(() => {
            openPopup();
            renderContent(<DropDown items={this.state.routes}
                                    onPressItem={this.handleClickItemDropDown}
                                    label="title"/>)
        })
    }

    /**
     * Render
     */

    renderCenterComponent() {
        return (
            <TouchableOpacity
                onPress={this.handleOpenDropDown}
                style={[styleBase.center, styleBase.row]}>
                <Text style={[styleBase.fontRubik, styleBase.title, styleBase.m_sm_right]}>
                    {this.state.currentRoute.title}

                </Text>
                <Ionicons name={'ios-arrow-down'} style={[styleBase.title]}/>
            </TouchableOpacity>
        )
    }

    renderLeftComponent () {
        return <View/>
    }

    // renderRightComponent() {
    //     if (this.state.currentRoute.route === "pos") {
    //
    //         // Render Button Add POS
    //         return (
    //             <TouchableOpacity onPress={() => {
    //                 openPopup();
    //                 renderContent(<POSCreator/>)
    //             }}>
    //                 <Icon name="plus-button"/>
    //             </TouchableOpacity>
    //         )
    //     }
    //     return null;
    // }

    render() {
        try {
            return (
                <SafeAreaView style={[styleBase.container]}>
                    <View style={[styleBase.container]}>
                        <NavBar navigator={this.props.navigator}
                                renderCenterComponent={this.renderCenterComponent}
                                renderLeftComponent={this.renderLeftComponent}/>
                        {this.state.currentRoute.route === "pos" &&
                            <POS {...this.props}/>
                        }
                        {
                            this.state.currentRoute.route === "inventory" &&
                            <ErrorBoundary>
                                <CompanyInventory {...this.props}/>
                            </ErrorBoundary>

                        }
                        {
                            (this.state.currentRoute.route === "setting" || this.state.currentRoute.route === "report") &&
                            <CommingSoon/>
                        }
                    </View>
                </SafeAreaView>
            )
        }
        catch (e) {
            console.warn("error - render Home");
            return <View/>
        }
    }
}

export default Home