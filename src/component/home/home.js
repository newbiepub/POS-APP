import React, { PureComponent } from "react";
import { View} from "react-native";
import styleBase from "../style/base";
import POS from './POS/pointOfSale';
import Setting from './setting/setting';
import {connect}from 'react-redux';
import * as _ from "lodash";
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            route : this.props.currentRoute
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.currentRoute, nextProps.currentRoute)) {
            this.setState({route: nextProps.currentRoute});
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.state.route === "POS" &&
                    <POS/>
                }
                {
                    this.state.route === "setting" &&
                    <Setting/>
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        currentRoute: state.route.currentRoute,

    }
};
export default connect(mapStateToProps,null)(Home);