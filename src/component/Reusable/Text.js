import React from "react";
import {View, Text, TextInput,} from "react-native";

import styleBase from "../style/base";
import styleHome from '../style/home';
import styleModalItems from '../style/modalItem';
import styleProduct from "../style/product";

export class TextInputNormal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,

        }
    }

    render() {
        return (
            <TextInput {...this.props}
                       onFocus={() => {
                           this.setState({onFocus: true})
                       }}
                       onBlur={() => {
                           this.setState({onFocus: false})
                       }}
                       style={[this.state.onFocus && styleModalItems.modalTextInputFocus, styleBase.font16, this.props.style]}
            />
        )
    }
}

export class TextLarge extends React.PureComponent {
    render() {
        return (
            <Text {...this.props} style={[styleBase.font18, styleBase.color3, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

export class TextNormal extends React.PureComponent {

    render() {
        return (
                <Text {...this.props} style={[styleBase.font16, styleBase.color3, this.props.style]} >
                    {this.props.children}
                </Text>
        )
    }
}

export class TextSmall extends React.PureComponent {

    render() {
        return (
            <Text {...this.props} style={[styleBase.font14, styleBase.color3,this.props.style]} >
                {this.props.children}
            </Text>
        )
    }
}