import React from "react";
import {} from "react-native";
import {Modal} from "react-native";
import {View} from "react-native";
import styleBase from "../style/base";
import {connect} from "react-redux";

class Popup extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                transparent={true}
                onRequestClose={() => {}}
            >
                <View style={[styleBase.overlay]}/>
                <View style={[styleBase.container, styleBase.center]}>
                    {this.props.renderModal()}
                </View>
            </Modal>
        )
    }
}

Popup.propTypes = {
    visible: React.PropTypes.bool,
    renderModal: React.PropTypes.func,
};

Popup.defaultProps = {
    visible: false,
    renderModal: () => {}
};

const mapStateToProps = (state) => {
    return {
        visible: state.popup.visible,
        renderModal: state.popup.renderModal
    }
};

export default connect(mapStateToProps, null) (Popup);