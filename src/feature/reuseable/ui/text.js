import React from "react";
import {View, Text, TextInput,} from "react-native";
import {numberwithThousandsSeparator} from '../function/function';
import EStyleSheet from "react-native-extended-stylesheet";

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
                       style={[this.state.onFocus && {}, style.fontSizeNormal, this.props.style]}
            />
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
                newText = this.props.maxValue
            }
        }
        return newText
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
        borderColor: 'gray',
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical:10
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
            fontSize: 18
        },
        fontSizeNormal: {
            fontSize: 24
        },
        fontSizeLarge: {
            fontSize: 28
        },
    },
    '@media (min-width: 1024)': {
        fontSizeSmall: {
            fontSize: 18
        },
        fontSizeNormal: {
            fontSize: 28
        },
        fontSizeLarge: {
            fontSize: 32
        },
    }
});
