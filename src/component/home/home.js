import React, { PureComponent } from "react";
import { View} from "react-native";
import styleBase from "../style/base";
import POS from './POS/pointOfSale';
import Item from './item/items';
import Setting from './setting/setting';
import {connect}from 'react-redux';
import * as _ from "lodash";
import Menu from './menu';
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            route : this.props.currentRoute,
            menuVisible: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.currentRoute, nextProps.currentRoute)) {
            this.setState({route: nextProps.currentRoute});
        }
    }
    openMenu(){
        this.setState({
            menuVisible: true
        })
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <Menu visible={this.state.menuVisible} instant={this}/>
                {
                    this.state.route === "POS" &&
                    <POS openMenu={()=>{this.openMenu()}}/>
                }
                {
                    this.state.route === "item" &&
                    <Item openMenu={()=>{this.openMenu()}}/>
                }
                {
                    this.state.route === "setting" &&
                    <Setting openMenu={()=>{this.openMenu()}}/>
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