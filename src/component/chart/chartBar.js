import React, {Component} from "react";
import {
    ActivityIndicator,

    ScrollView,

    TouchableOpacity,

    View,
} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../reusable/text';
import styleBase from "../../style/base";

import {numberwithThousandsSeparator} from "../reusable/function";
import {VictoryBar, VictoryChart, VictoryTheme} from "victory-native";


class chartBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthChart: 0,
            heightChart: 0
        }
    }

    splitLabel(s) {
        let index = 0
        for (var i = 0, len = s.length; i < len; i++) {
            if (s.charAt(i) === " ") {
                if (index > 7) {
                    s = s.substr(0, i) + '\n' + s.substr(i + 1);
                    i++;
                    index = 0
                }
            }
            index++;
        }
        return s
    }

    getWidthChart(event) {
        var {width, height} = event.nativeEvent.layout;
        this.setState({
            widthChart: width,
            heightChart: height * 90 / 100
        })
    }

    getValueY(value) {
        if(this.props.yType === "money")
        {
            return numberwithThousandsSeparator(value)+ "đ"
        }else{
            return value
        }
    }

    render() {
        let length = this.props.data.length;
        return (
            <View onLayout={(event) => {
                this.getWidthChart(event)
            }} style={{flex: 1}}>
                <View>
                    {
                        length > 0 ?
                            <View>

                                <ScrollView horizontal={true} style={{flexDirection: 'row', padding: 10}}>
                                    <TextNormal>{this.props.y}</TextNormal>
                                    <VictoryChart
                                        theme={VictoryTheme.material}
                                        width={this.state.widthChart * (length / 4)}
                                        domainPadding={{x: [25, 25]}}
                                        height={this.state.heightChart}
                                    >
                                        <VictoryBar
                                            animate={{
                                                duration: 2000,
                                                onLoad: {duration: 1000}
                                            }}
                                            labels={(d) => this.getValueY(d.y)}
                                            y={(data) => data.y}
                                            x={(data) => this.splitLabel(data.x)}
                                            style={{
                                                data: {fill: "#c43a31", width: 50}, labels: {
                                                    fill: "black",
                                                    fontSize: 16,
                                                    lineHeight: 2
                                                },
                                            }}
                                            data={this.props.data}
                                        />

                                    </VictoryChart>
                                </ScrollView>
                                <TextNormal style={{textAlign: 'center'}}>{this.props.x}</TextNormal>
                            </View>
                            :
                            <View style={[styleBase.center, {flex: 1}]}>
                                <TextNormal>Không có dữ liệu</TextNormal>
                            </View>
                    }
                </View>

            </View>
        )
    }
}

export default chartBar;