import React from "react";
import {Modal, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal} from '../../text';
import {constantStyle} from '../../../style/base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {closePopup} from '../popupAction';
import {connect} from 'react-redux';

class PopupHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={() => this.props.closePopup()}>
                    <View style={style.closeButton}>
                        <EvilIcons name="close" style={{fontSize: constantStyle.sizeLarge,}}/>
                    </View>
                </TouchableWithoutFeedback>
                <TextNormal style={{flex: 1}}>{this.props.title}</TextNormal>
                <TouchableWithoutFeedback onPress={()=>{this.props.submitFunction()}}>
                    <View style={style.buttonWrapper}>

                        <TextLarge style={style.buttonText}>
                            {this.props.buttonText}
                        </TextLarge>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        height: constantStyle.headerHeight,
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: constantStyle.borderColor
    },
    closeButton: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        backgroundColor: constantStyle.color1,
        paddingHorizontal: constantStyle.paddingHorizontal,
        height: constantStyle.headerHeight,
        justifyContent: 'center'
    },
    buttonText: {
        color: constantStyle.color2
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    closePopup
}

export default connect(null, mapDispatchToProps)(PopupHeader);