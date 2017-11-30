import React from "react";
import {connect} from "react-redux";
import {
    Animated,
    Dimensions,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Platform
} from "react-native";
import styleBase from "../style/base";
import styleHome from "../style/home";
import {goToRoute} from "../../action/route";
import {closeMenu} from '../../action/route';
import ModalWrapper from '../modalWrapper';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window');

        this.state = {
            currentRoute: this.props.currentRoute,
            height,
            width,
            marginLeft: new Animated.Value(-width * 30 / 100),
            visible: false
        }
    }

    onLayout(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            width,
            height,

        })


    }

    shouldComponentUpdate(nextProps, nextState) {
        const changeVisible = this.props.visible !== nextProps.visible;
        const stateVisible = this.state.visible !== nextState.visible;
        return changeVisible || stateVisible
    }

    // closeMenu() {
    //     let instant = this.props.instant;
    //
    //     Animated.timing(          // Uses easing functions
    //         this.state.marginLeft,    // The value to drive
    //         {
    //             toValue: -this.state.width * 30 / 100,
    //         },           // Configuration
    //     ).start(() => {
    //
    //     });
    //
    //
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.visible == true) {
    //         this.setState({
    //             visible: true
    //         })
    //         Animated.timing(          // Uses easing functions
    //             this.state.marginLeft,    // The value to drive
    //             {
    //                 toValue: 0,
    //             },           // Configuration
    //         ).start();
    //     }
    // }

    onChangeRoute(routeId) {
        this.props.closeMenu();
        goToRoute(routeId);

    }

    _MenuItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onChangeRoute(item.id)} style={[styleHome.menuItem]}>
            <Text
                style={[styleBase.font16, {fontWeight: "600"}, this.props.currentRoute === item.id ? styleBase.color4 : styleBase.color6]}>{item.name}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <ModalWrapper
                containerStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
                onRequestClose={() => this.props.closeMenu()}
                position="left"
                shouldAnimateOnRequestClose={true}
                supportedOrientations={['portrait', 'landscape']}
                onLayout={(event) => this.onLayout(event)}
                visible={this.props.visible}>

                <View style={styleBase.container}>
                    <View
                        style={{
                            width: 500,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
                            height: this.state.height,
                            padding: 40,
                        }}>

                        <FlatList
                            data={this.props.routeMap}

                            keyExtractor={item => item.name}
                            renderItem={this._MenuItem}
                        />

                    </View>
                </View>
            </ModalWrapper>

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
        currentRoute: state.route.currentRoute,
        visible: state.route.menuVisible
    }
};
const mapDispatchToProps = {
    closeMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);