import React from "react";
import {connect} from "react-redux";
import {Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import {closeMenu, goToRoute} from "../../../action/route";
import ModalWrapper from '../../modalWrapper';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        const changeVisible = this.props.visible !== nextProps.visible;
        const widthChanged = this.state.width !== nextState.width;
        return changeVisible || widthChanged
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

    measureWidth(event) {
        let {width, height} = Dimensions.get('window');
        this.setState({
            width,
            height
        })
    }

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

                <View onLayout={(event) => this.measureWidth(event)} style={styleBase.container}>
                    <View
                        style={{
                            width: this.state.width * 30 / 100,
                            height: this.state.height,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
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
        routeMap: state.routeCompany.routeMap,
        currentRoute: state.routeCompany.currentRoute,
        visible: state.routeCompany.menuVisible
    }
};
const mapDispatchToProps = {
    closeMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);