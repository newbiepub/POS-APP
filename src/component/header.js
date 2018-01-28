import React, {PureComponent} from "react";
import {
    Platform,
    StatusBar,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../style/base';
import EStyleSheet from "react-native-extended-stylesheet";
import {connect} from 'react-redux'
import {switchMenu} from './menu/menuAction';
import {TextLarge} from "./text";

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.type = [
            "tabView",
            "normal"
        ]

    }

    goBackFunction() {
        try {
            this.props.goBackFunction()
        } catch (e) {
            console.warn("you have to use props goBackFunction")
        }

    }

    render() {
        return (
            <View style={[style.container]}>
                <View style={[this.props.type === this.type[1] && style.typeNormalLeft]}>
                    <TouchableWithoutFeedback onPress={() => this.props.switchMenu()}>
                        <View style={style.menuButton}>
                            <Entypo name="menu" style={style.menuIcon}/>
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        this.props.type === this.type[1] &&
                        <View style={{flex: 1}}>
                            <TextLarge style={style.typeNormalTitleLeft}>{this.props.titleLeft || ""}</TextLarge>
                        </View>
                    }
                </View>
                {
                    this.props.type === this.type[0] &&
                    <View style={{flex: 1}}>
                        {this.props.children}
                    </View>
                }
                {
                    this.props.type === this.type[1] &&
                    <View style={style.typeNormalRight}>
                        {
                            this.props.goBack &&
                            <TouchableOpacity onPress={() => this.goBackFunction()}>
                                <Entypo name="chevron-with-circle-left" style={[style.menuIcon, {marginRight: 10}]}/>
                            </TouchableOpacity>
                        }

                        <TextLarge style={style.typeNormalTitleRight}>{this.props.titleRight || ""}</TextLarge>
                    </View>
                }

            </View>

        )
    }
}


const style = EStyleSheet.create({
    container: {
        height: constantStyle.headerHeight,
        backgroundColor: constantStyle.color1,
        flexDirection: 'row',
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
    },
    menuButton: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: constantStyle.sizeNormal,
        color: constantStyle.color2
    },
    typeNormalLeft: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: 'center',
        paddingRight: constantStyle.paddingHorizontal,
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder
    },
    typeNormalTitleLeft: {
        textAlign: 'right',
        color: constantStyle.color2
    },
    typeNormalRight: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal
    },
    typeNormalTitleRight: {
        color: constantStyle.color2
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    switchMenu
}

export default connect(null, mapDispatchToProps)(Header);