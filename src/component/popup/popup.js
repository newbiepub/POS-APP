import React from "react";
import {Modal, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {connect} from 'react-redux';
import {closePopup} from './popupAction';
import LoadingOverlay from '../loadingOverlay';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height
        }

    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        })
    }

    render() {
        return (
            <Modal
                visible={this.props.popup.isVisible}
                transparent={true}
                animationType={'none'}
                onRequestClose={() => {
                    this.props.closePopup()
                }}
            >
                <View style={style.container}>
                    <TouchableWithoutFeedback onPress={() => this.props.closePopup()}>
                        <View style={{position: 'absolute',backgroundColor:"rgba(0,0,0,0.2)", width: this.state.width, height: this.state.height}}/>
                    </TouchableWithoutFeedback>
                    <View style={{
                        width: this.state.width > this.state.height ? this.state.width * 80 / 100 : this.state.width,
                        height: this.state.height,
                        backgroundColor: constantStyle.color2
                    }}>
                        {this.props.popup.children}

                        <LoadingOverlay loading={this.props.popup.children == null}/>
                    </View>
                </View>
            </Modal>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        popup: state.popupReducer
    }
};
const mapDispatchToProps = {
    closePopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);