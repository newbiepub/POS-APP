import React from "react";
import {View, Text, TextInput, TouchableWithoutFeedback} from "react-native";
import {numberwithThousandsSeparator} from '../reuseable/function/function';
import EStyleSheet from "react-native-extended-stylesheet";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {constantStyle} from '../style/base';

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
                       style={[style.fontSizeNormal, {
                           borderWidth: 1,
                           borderRadius: 10,
                           padding: constantStyle.sm,
                           borderColor: constantStyle.colorBorder
                       }, this.props.style, this.state.onFocus && {borderColor: constantStyle.color1}]}
            />
        )
    }
}

export class SearchInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,
        }
    }

    render() {
        return (
            <View style={[style.searchInput]}>
                <EvilIcons name={"search"} style={[style.fontSizeLarge, {marginRight: constantStyle.paddingGridItem}]}/>
                <TextInput {...this.props}
                           onFocus={() => {
                               this.setState({onFocus: true})
                           }}
                           onBlur={() => {
                               this.setState({onFocus: false})
                           }}
                           style={[this.state.onFocus && {}, {flex: 1}, style.fontSizeNormal, this.props.style]}
                />
                {
                    this.props.value != undefined && this.props.value != "" &&
                    <TouchableWithoutFeedback onPress={() => this.props.clean()}>
                        <EvilIcons name={"close"}
                                   style={[style.fontSizeLarge, {marginLeft: constantStyle.paddingGridItem}]}/>
                    </TouchableWithoutFeedback>
                }

            </View>

        )
    }
}

export class TextInputUserName extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,

        }
    }

    render() {
        return (
            <View style={style.wrapperWithBorderRadius}>

                <TextInput {...this.props}
                           onFocus={() => {
                               this.setState({onFocus: true})
                           }}
                           onBlur={() => {
                               this.setState({onFocus: false})
                           }}
                           placeholder={"Tài khoản"}
                           style={[this.state.onFocus && {}, style.fontSizeNormal, this.props.style]}
                />
            </View>
        )
    }
}

export class TextInputPassword extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,

        }
    }

    render() {
        return (
            <View style={style.wrapperWithBorderRadius}>

                <TextInput {...this.props}
                           onFocus={() => {
                               this.setState({onFocus: true})
                           }}
                           onBlur={() => {
                               this.setState({onFocus: false})
                           }}
                           secureTextEntry={true}
                           placeholder={"Mật khẩu"}
                           style={[this.state.onFocus && {}, style.fontSizeNormal, this.props.style]}
                />
            </View>
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

    getNumberInput(text) {
        let newText = '';
        let numbers = '0123456789';
        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                if (newText === '' && text[i] == 0) {

                } else {
                    newText = newText + text[i];
                }
            }
        }
        if (newText < 1) {
            newText = 0
        }
        if (this.props.hasOwnProperty("maxValue")) {
            if (newText > this.props.maxValue) {
                let max = text[text.length-1];
                newText = max > this.props.maxValue ? this.props.maxValue : max
            }
        }
        if (this.props.hasOwnProperty("minValue")) {
            if (newText < this.props.minValue) {
                newText = this.props.minValue
            }
        }
        return parseInt(newText)
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
                       value={this.props.value.toString()}
                       keyboardType={'numeric'}
                       onChangeText={(num) => {
                           if (this.getNumberInput(num) !== undefined)
                               this.props.onChangeText(this.getNumberInput(num) || 0)
                       }}
                       style={[this.state.onFocus && {}, style.fontSizeNormal, this.props.style]}
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
                       style={[this.state.onFocus && {}, style.fontSizeNormal, this.props.style]}
            />
        )
    }
}

export class TextLarge extends React.PureComponent {
    render() {
        return (
            <Text {...this.props} style={[style.fontSizeLarge, style.fontColor, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

export class TextNormal extends React.PureComponent {

    render() {
        return (
            <Text {...this.props} style={[style.fontSizeNormal, style.fontColor, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

export class TextSmall extends React.PureComponent {

    render() {
        return (
            <Text {...this.props} style={[style.fontSizeSmall, style.fontColor, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}


const style = EStyleSheet.create({
    wrapperWithBorderRadius: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30
    },
    fontSizeSmall: {
        fontSize: 14
    },
    fontSizeNormal: {
        fontSize: 18
    },
    fontSizeLarge: {
        fontSize: 22
    },
    fontColor: {
        color: '#2d2d2d'
    },
    '@media (min-width: 768) and (max-width: 1024)': {
        fontSizeSmall: {
            fontSize: 16
        },
        fontSizeNormal: {
            fontSize: 20
        },
        fontSizeLarge: {
            fontSize: 24
        },
    },
    '@media (min-width: 1024)': {
        fontSizeSmall: {
            fontSize: 18
        },
        fontSizeNormal: {
            fontSize: 22
        },
        fontSizeLarge: {
            fontSize: 26
        },
    }
});
