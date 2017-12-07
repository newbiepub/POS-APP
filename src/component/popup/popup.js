import React from "react";
import {Modal, View, Dimensions, TouchableWithoutFeedback} from "react-native";
import styleBase from "../style/base";
import {connect} from "react-redux";
import {closePopup} from '../../action/popup';
import * as Animate from "react-native-animatable";

class Popup extends React.PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height
        }

    }

    closePopup() {
        this.props.closePopup();
    }

    renderContent() {
        try {
            return this.props.renderModal
        } catch (e) {
            console.warn(e);
            return <View></View>
        }

    }

    measureWidth(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
        })
    }

    render() {
        return (
            <View onLayout={(event) => this.measureWidth(event)}>

                <Modal
                    visible={this.props.visible}
                    transparent={true}
                    onRequestClose={() => {
                        this.closePopup()
                    }}
                    supportedOrientations={['portrait', 'landscape']}
                >
                    <TouchableWithoutFeedback onPress={() => {
                        this.closePopup()
                    }}>
                        <View
                            style={[styleBase.overlay, {position: 'absolute'}]}/>
                    </TouchableWithoutFeedback>
                    <Animate.View animation={"bounceIn"} duration={300}
                                  style={[styleBase.container, styleBase.background4, {
                                      width: this.state.width> 800 ?  this.state.width * 85 / 100 : this.state.width,
                                      alignSelf: 'center'
                                  }]}>
                        {Object.keys(this.props.renderModal).length > 0 &&
                        this.renderContent()
                        }
                    </Animate.View>
                </Modal>
            </View>
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