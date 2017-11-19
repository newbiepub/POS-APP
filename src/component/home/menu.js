import React from "react";
import * as _ from "lodash";
import {connect} from "react-redux";
import {
    Modal, View, Text, Dimensions, TouchableOpacity,
    TouchableWithoutFeedback, Animated, FlatList
} from "react-native";
import styleBase from "../style/base";
import styleHome from "../style/home";
import Entypo from 'react-native-vector-icons/Entypo';
import {goToRoute} from "../../action/route";

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window');

        this.state = {
            currentRoute: this.props.currentRoute,
            height,
            width,
            marginLeft: new Animated.Value(-width * 30 / 100)
        }
    }

    onLayout(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            width,
            height
        })


    }

    closeMenu() {
        let instant = this.props.instant;

        Animated.timing(          // Uses easing functions
            this.state.marginLeft,    // The value to drive
            {
                toValue: -this.state.width * 30 / 100,

            },           // Configuration
        ).start(() => {
            instant.setState({
                menuVisible: false
            })
        });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible == true) {
            Animated.timing(          // Uses easing functions
                this.state.marginLeft,    // The value to drive
                {
                    toValue: 0,

                },           // Configuration
            ).start();
        }
    }

    onChangeRoute(routeId) {
        goToRoute(routeId);
        this.closeMenu();
    }

    _MenuItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onChangeRoute(item.id)} style={[styleHome.menuItem]}>
            <Text
                style={[styleBase.font16, {fontWeight: "600"}, this.state.currentRoute === item.id ? styleBase.color4 : styleBase.color6]}>{item.name}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <Modal
                // animationType="none"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.closeMenu();
                }}
                supportedOrientations={['portrait', 'landscape']}
            >
                <View style={styleBase.container} onLayout={(event) => this.onLayout(event)}>
                    <TouchableWithoutFeedback onPress={() => this.closeMenu()}>
                        <View style={{flex: 1, backgroundColor: "rgba(60, 60, 61,0.7)"}}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            width: this.state.width * 30 / 100,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
                            height: this.state.height,
                            padding: 40,
                            marginLeft: this.state.marginLeft
                        }}>

                        <FlatList
                            data={this.props.routeMap}

                            keyExtractor={item => item.name}
                            renderItem={this._MenuItem}
                        />

                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

Menu.propTypes = {
    routeMap: React.PropTypes.array,
    currentRoute: React.PropTypes.string
};

Menu.defaultProps = {
    routeMap: [],
    currentRoute: ""
};

const mapStateToProps = (state) => {
    return {
        account: state.account,
        route: state.route,
        routeMap: state.route.routeMap,
        currentRoute: state.route.currentRoute
    }
};

export default connect(mapStateToProps, null)(Menu);