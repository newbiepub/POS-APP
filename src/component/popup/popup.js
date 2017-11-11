import React from "react";
import {Modal, View, Dimensions, TouchableWithoutFeedback} from "react-native";
import styleBase from "../style/base";
import {connect} from "react-redux";
import {closePopup} from '../../action/popup';

class Popup extends React.PureComponent {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            width
        }

    }

    closePopup() {
        this.props.closePopup();
    }

    renderContent(){
        try{
            return this.props.renderModal
        }catch(e)
        {
            console.warn(e);
            return <View></View>
        }

    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                transparent={true}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    this.closePopup()
                }}>
                    <View style={[styleBase.overlay, {position: 'absolute'}]}/>
                </TouchableWithoutFeedback>
                <View style={[styleBase.container, styleBase.background4, {
                    width: this.state.width * 85 / 100,
                    alignSelf: 'center'
                }]}>
                    {Object.keys(this.props.renderModal).length >0 &&
                        this.renderContent()
                    }
                </View>
            </Modal>
        )
    }
}

Popup.propTypes = {
    visible: React.PropTypes.bool,
    renderModal: React.PropTypes.object,
};

Popup.defaultProps = {
    visible: false,
    renderModal: null
};

const mapStateToProps = (state) => {
    return {
        visible: state.popup.visible,
        renderModal: state.popup.renderModal
    }
};
const mapDispatchToProps = {
    closePopup
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);