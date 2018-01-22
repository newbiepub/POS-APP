import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {Screen, NavigationBar, Title, TouchableOpacity, Icon, DropDownMenu, Tile, Button, Text, View} from "@shoutem/ui";
import styleBase from "../../../styles/base";

class POSDetail extends React.Component {
    constructor(props) {
        super(props);
        this.routes =[
            {title: 'KHO', route: 'inventory'},
            {title: 'THỐNG KÊ', route: 'report'},
            {title: "CÀI ĐẶT", route: 'setting'}
        ];
        this.state = {
            currentRoute: this.routes[0]
        }
    }

    static propTypes = {
        title: PropTypes.string
    };


    static defaultProps = {
        title: ""
    };

    renderCenterComponent() {
        return (
            <Title>
                {this.props.title}
            </Title>
        )
    }

    renderLeftComponent () {
        return (
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                <Icon name="close"/>
            </TouchableOpacity>
        )
    }

    renderRightContent() {
        return (
            <DropDownMenu
                options={this.routes}
                selectedOption={this.state.currentRoute}
                onOptionSelected={(route) => this.setState({currentRoute: route})}
                titleProperty="title"
                valueProperty="route"
            />
        )
    }

    render() {
        return (
            <Screen styleName="paper">
                <NavigationBar
                    styleName="inline"
                    style={{container: {paddingHorizontal: 15}}}
                    centerComponent={this.renderCenterComponent()}
                    leftComponent={this.renderLeftComponent()}
                    rightComponent={this.renderRightContent()}
                />
                <ScrollView>
                    <View styleName="lg-gutter-top">
                        <Tile styleName="text-centric" style={{backgroundColor: "#e5e5e5"}}>
                            <Title styleName="md-gutter-bottom">QUẢN LÝ SẢN PHẨM</Title>
                            <Button
                                onPress={() => this.props.navigator.push({id: "pos_product_management",
                                    user: this.props.user,
                                    title: `QUẢN LÝ SẢN PHẨM - ${this.props.title}`})}
                                styleName="dark confirmation"><Text>ĐI ĐẾN</Text></Button>
                        </Tile>
                    </View>
                    <View styleName="lg-gutter-top">
                        <Tile styleName="text-centric" style={{backgroundColor: "#e5e5e5"}}>
                            <Title styleName="md-gutter-bottom">QUẢN LÝ NGUYÊN LIỆU</Title>
                            <Button styleName="dark confirmation"><Text>ĐI ĐẾN</Text></Button>
                        </Tile>
                    </View>
                </ScrollView>
            </Screen>
        )
    }
}

export default POSDetail