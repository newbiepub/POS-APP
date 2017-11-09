import React from "react";
import {Text, View, TouchableWithoutFeedback,} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import style from '../../style/POS';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CustomAmount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'ghi chú',
            customAmount: 0
        }
    }

    changeCustomAmount(number) {
        if (number === 11) {
            this.setState({
                customAmount: Math.floor(this.state.customAmount / 10)
            })
        }

        if (number === 100) {
            this.setState({
                customAmount: this.state.customAmount * 100
            })
        }
        if (number >= 0 && number <= 9) {
            this.setState({
                customAmount: this.state.customAmount * 10 + number
            })
        }

    }
    addToCategories()
    {
        this.props.addToList(this.state.title,this.state.customAmount);
        this.setState(
            {
                customAmount:0
            }
        )
    }

    numberwithThousandsSeparator(x) {
        let parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }

    render() {
        return (
            <View style={styleHome.container}>
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }, styleHome.borderButtonCustomAmount, style.paddingContent]}>
                    <View style={{flex: 4, paddingHorizontal: 10}}>
                        <Text style={styleBase.font14}>{this.state.title}</Text>
                    </View>
                    <View style={[{
                        flex: 6,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }, style.paddingContent]}>

                        <Text numberOfLines={1}
                              style={[styleBase.font32, this.state.customAmount === 0 && style.colorWhenNull]}>{this.numberwithThousandsSeparator(this.state.customAmount)}</Text>
                        <Text style={[styleBase.font32, this.state.customAmount === 0 && style.colorWhenNull]}>đ</Text>
                    </View>
                </View>

                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <View style={[{flex: 1, flexDirection: 'row'}]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(1)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>1</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(2)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>2</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(3)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>3</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[{flex: 1, flexDirection: 'row'},]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(4)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>4</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(5)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>5</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(6)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>6</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        this.state.customAmount > 0 && this.changeCustomAmount(11)
                    }}>
                        <View style={[{flex: 1}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                            <Ionicons name={"md-arrow-back"}
                                      style={[styleBase.font32, this.state.customAmount == 0 && style.colorWhenNull]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <View style={[{flex: 1, flexDirection: 'row'}]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(7)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>7</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(8)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>8</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(9)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>9</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[{flex: 1, flexDirection: 'row'},]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(100)}>
                                <View
                                    style={[{flex: 2,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>00</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(0)}>
                                <View
                                    style={[{flex: 1,}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                                    <Text style={styleBase.font32}>0</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=> this.state.customAmount !== 0 && this.addToCategories()}>
                        <View style={[{flex: 1}, styleHome.borderButtonCustomAmount, styleHome.textCenterOfTheBox]}>
                            <Text style={[styleBase.font32, styleBase.color2]}> + </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}


export default CustomAmount;