import React from "react";
import PropTypes from "prop-types";
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {connect} from "react-redux";
import {closePopup} from "./actions/popupAction";
import styleBase from "../../styles/base";

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        visible: PropTypes.bool
    };

    static defaultProps = {
        children: <View/>
    };

    render() {
        return (
            <Modal
                visible={this.props.visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => closePopup()}
            >
                <TouchableWithoutFeedback onPress={() => closePopup()}>
                    <View style={styleBase.overlay}/>
                </TouchableWithoutFeedback>
                {this.props.children}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.popup.isVisible,
        children: state.popup.children
    }
};

export default connect(mapStateToProps)(Popup);