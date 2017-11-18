import React from "react";
import {View, Text, TextInput,} from "react-native";

import styleBase from "../style/base";
import styleHome from '../style/home';
import styleModalItems from '../style/modalItem';
import styleProduct from "../style/product";
import {numberwithThousandsSeparator} from '../Reusable/Function';

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

export class TextInputNumber extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,

        }
    }

    getNumberInput(num) {
        let newNum = num.replace(/\./g, '').replace(/^0+/, '');
        if (isNaN(newNum) !== true) {
            this.setState({localValue: newNum});
            return newNum;
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
                       keyboardType={'numeric'}
                       onChangeText={(num) => {
                           if (this.getNumberInput(num) !== undefined)
                               this.props.onChangeText(this.getNumberInput(num) || 0)
                       }}
                       style={[this.state.onFocus && styleModalItems.modalTextInputFocus, styleBase.font16, this.props.style]}
            />
        )
    }
}

export class TextInputPriceMask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,
            localValue: ''

        }
    }

    getNumberInput(num) {
        let newNum = num.replace(/\./g, '').replace(/^0+/, '');
        if (isNaN(newNum) !== true) {
            this.setState({localValue: newNum});
            return newNum;
        }
    }

    addCurrency() {
        if (this.state.onFocus === false) {
            return "đ"
        }
        return ""
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
                       keyboardType={'numeric'}
                       value={numberwithThousandsSeparator(this.props.value) + this.addCurrency()}
                       onChangeText={(num) => {
                           this.getNumberInput(num) !== undefined &&
                           this.props.onChangeText(this.getNumberInput(num) || 0)
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
            <Text {...this.props} style={[styleBase.font16, styleBase.color3, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

export class TextSmall extends React.PureComponent {

    render() {
        return (
            <Text {...this.props} style={[styleBase.font14, styleBase.color3, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}