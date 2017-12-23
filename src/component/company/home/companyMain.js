import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import Setting from '../setting/setting';
import {connect} from 'react-redux';
import * as Animate from "react-native-animatable";
import {openMenu} from "../../../action/route";
import POS from "../POS/POS";
import Report from "../report/report";


class Main extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.currentRoute !== nextProps.currentRoute;
    }

    render() {
        return (
            <View style={[styleBase.container]}>

                {
                    this.props.currentRoute === "POS" &&
                    <Animate.View animtae="fadeIn" duration={750} style={{flex: 1}}>
                        <POS openMenu={() => {
                            this.props.openMenu()
                        }} title="Quản Lý Điểm Bán Hàng"
                                 navigator={this.props.navigator}/>
                    </Animate.View>
                }

                {
                    this.props.currentRoute === "setting" &&
                    <Animate.View style={{flex: 1}}>
                        <Setting openMenu={() => {
                            this.props.openMenu()
                        }} title="Cài Đặt"
                                 navigator={this.props.navigator}/>
                    </Animate.View>
                }

                {
                    this.props.currentRoute === "report" &&
                    <Animate.View style={{flex: 1}}>
                        <Report openMenu={() => {
                            this.props.openMenu()
                        }} title="Thống Kê"
                                 navigator={this.props.navigator}/>
                    </Animate.View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.accountCompany,
        currentRoute: state.routeCompany.currentRoute,

    }
};
const mapDispatchToProps = {
    openMenu
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);