import React from "react";
import PropTypes from "prop-types";
import {Modal, TouchableWithoutFeedback} from "react-native";
import {View, Overlay} from "@shoutem/ui";
import {connect} from "react-redux";
import {closePopup} from "./actions/popupAction";

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
                    <Overlay styleName="fill-parent"/>
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