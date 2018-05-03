import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, Animated, StyleSheet, InteractionManager} from "react-native";
import styleBase from "../../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {removeToken} from "../../login/utils/loginToken";

const styles = ({
    transparent: 'transparent',
    red: '#ed5e67'
})

const TouchableOpacityAniamte = Animated.createAnimatedComponent(TouchableOpacity)

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.isLogout = false;
        this.state = {
            bgColor: new Animated.Value(0),
            borderColor: new Animated.Value(0)
        }
    }

    /**
     * handler
     * @returns {XML}
     */

    handleChangeBgandBorder(value) {
        Animated.parallel([
            Animated.timing(this.state.bgColor, {
                toValue: value,
                duration: 200
            }),
            Animated.timing(this.state.borderColor, {
                toValue: value,
                duration: 200
            })
        ]).start()
    }

    handleLogoutStatus (isLogout) {
        if(isLogout) {
            this.handleChangeBgandBorder(1)
        } else {
            this.handleChangeBgandBorder(0);
        }
    }



    async handleOnLogout () {
        if(!this.isLogout) {
            this.isLogout = true;
            this.handleLogoutStatus(true);
        } else {
            await removeToken();
        }
        setTimeout(() => {
            this.isLogout = false;
            this.handleLogoutStatus(false);
        }, 2000);
    }

    /**
     * renderer
     * @returns {XML}
     */

    render() {
        let backgroundColor = this.state.bgColor.interpolate({
            inputRange: [0, 1],
            outputRange: [styles.transparent, styles.red]
        })
        let borderColor = this.state.borderColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['#fff', 'transparent']
        })

        return (
            <React.Fragment>
                {
                    this.props.toggle
                        ?
                        <TouchableOpacityAniamte
                            onPress={() => this.handleOnLogout()}
                            style={[styleBase.center,
                                {borderWidth: 1, borderColor: borderColor, backgroundColor: backgroundColor},
                                styleBase.m_md_vertical, styleBase.m_md_horizontal,
                                styleBase.p_md_vertical, styleBase.p_md_horizontal]}>
                            <Text style={[styleBase.textWhite, styleBase.title]}>
                                Đăng Xuất
                            </Text>
                        </TouchableOpacityAniamte>
                        :
                        <TouchableOpacityAniamte
                            onPress={() => this.handleOnLogout()}
                            style={[styleBase.center, styleBase.m_md_vertical, styleBase.roundButton,
                                {alignSelf: 'center'},
                                {borderWidth: 1, borderColor: borderColor, backgroundColor: backgroundColor}]}>
                            <Ionicons name="ios-power" style={[styleBase.fontIcon, styleBase.textWhite]}/>
                        </TouchableOpacityAniamte>
                }
            </React.Fragment>
        )
    }
}

LogoutButton.propTypes = {
    toggle: PropTypes.bool
};

LogoutButton.defaultProps = {
    toggle: false
};

export default LogoutButton;