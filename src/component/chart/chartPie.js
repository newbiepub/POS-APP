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
import {VictoryPie, VictoryChart, VictoryGroup, VictoryTheme, VictoryLabel} from "victory-native";


class chartPie extends React.Component {
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
            heightChart: height
        })
    }

    render() {
        let length = this.props.data.length;
        return (
            <View onLayout={(event) => {
                this.getWidthChart(event)
            }} style={{flex: 1,justifyContent:'center',alignItems:"center"}}>
                {
                    length > 0 ?
                        <ScrollView horizontal={true}>
                            <VictoryPie
                                style={{
                                    labels: {
                                        fill: "black",
                                        fontSize: 20,
                                    },
                                }}
                                width={this.state.widthChart}
                                height={this.state.heightChart}
                                theme={VictoryTheme.material}
                                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                                data={this.props.data}
                                labels={(data) => `${data.x}(${numberwithThousandsSeparator(data.y)}đ)`}
                            />
                        </ScrollView>
                        :
                        <View style={[styleBase.center, {flex: 1}]}>
                            <TextNormal>Không có dữ liệu</TextNormal>
                        </View>
                }

            </View>
        )
    }
}

export default chartPie;