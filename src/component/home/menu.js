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
import {size} from '../style/home';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRoute: this.props.currentRoute,

        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        const changeVisible = this.props.visible !== nextProps.visible;
        return changeVisible
    }


    onChangeRoute(routeId) {


        setTimeout(function () {
            this.props.closeMenu();
        }.bind(this), 150);
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
                onRequestClose={() => {
                    this.props.closeMenu();
                }}
                position="left"
                shouldAnimateOnRequestClose={true}
                supportedOrientations={['portrait', 'landscape']}
                visible={this.props.visible}>

                <View style={styleBase.container}>
                    <View
                        style={{
                            width: size.menuSize,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
                            height: size.window.height,
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
        routeMap: state.route.routeMap,
        currentRoute: state.route.currentRoute,
        visible: state.route.menuVisible
    }
};
const mapDispatchToProps = {
    closeMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);