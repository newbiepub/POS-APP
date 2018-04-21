import React, {Component} from "react";
import {
    ActivityIndicator,

    ScrollView,

    TouchableOpacity,

    View,
} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../text';
import NoData from '../noData';

import {numberwithThousandsSeparator} from "../../reuseable/function/function";
import {VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryAxis, VictoryLabel} from "victory-native";
import {constantStyle} from "../../style/base";
import {connect} from 'react-redux';
import moment from '../moment'

class chartBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthChart: 0,
            heightChart: 0
        }
    }

    splitLabel(s) {
        let index = 0;
        for (var i = 0, len = s.length; i < len; i++) {
            if (s.charAt(i) === " ") {
                if (index > 20) {
                    s = s.substr(0, i) + '\n\n' + s.substr(i + 1);
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
            heightChart: height * 95 / 100
        })
    }

    getValueY(value) {
        if (this.props.yType === "money") {
            return numberwithThousandsSeparator(value.money) + this.props.currency.symbol || ""
        } else {
            return value.quantity
        }
    }
    handleTickY(value) {
        if (this.props.yType === "money") {
            return numberwithThousandsSeparator(value) + this.props.currency.symbol || ""
        } else {
            return value
        }
    }
    handleZoomDomainChange(domain) {
        //console.log('Domain change: ', domain.x);
        this.setState({zoomedXDomain: domain.x});
    }

    getOfsetY(value)
    {
        if (this.props.yType === "money") {
            return value.money
        } else {
            return value.quantity
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
                                <ScrollView horizontal={true}
                                            style={{flexDirection: 'row', paddingBottom: 40}}>
                                    {/*<TextNormal>{this.props.y}</TextNormal>*/}
                                    <VictoryChart
                                        animate={{
                                            duration: 500,
                                            onLoad: {duration: 500}
                                        }}
                                        theme={VictoryTheme.material}
                                        width={this.state.widthChart * (length / 3)}
                                        domainPadding={{x: [100, 100], y: [0 , 0]}}
                                        height={this.state.heightChart}

                                        // containerComponent={
                                        //     <VictoryZoomContainer
                                        //         dimension="x"
                                        //         zoomDomain={{x: [0, length]}}
                                        //         allowZoom={false}
                                        //         // allowPan={true}
                                        //     />}
                                    >
                                        <VictoryAxis
                                            tickFormat={(x) => ((`${x}`))}
                                        />
                                        <VictoryAxis dependentAxis crossAxis

                                                     // domain={[-10, 10]}
                                                     theme={VictoryTheme.material}
                                                     offsetX={100}
                                                     standalone={false}
                                                     tickFormat={(y) => ((`${this.handleTickY(y)}`))}

                                        />
                                        <VictoryBar
                                            animate={{
                                                duration: 500,
                                                onLoad: {duration: 500}
                                            }}
                                            labels={(d) => this.getValueY(d.y)}
                                            y={(data) => this.getOfsetY(data.y)}
                                            x={(data) => this.splitLabel(data.x)}
                                            style={{
                                                data: {fill: "#c43a31", width: 50}, labels: {
                                                    fill: "black",
                                                    fontSize: 16,
                                                    lineHeight: 2
                                                },
                                            }}
                                            data={this.props.data}
                                            alignment={'start'}
                                        />

                                    </VictoryChart>
                                </ScrollView>
                                {/*<TextNormal style={{textAlign: 'center'}}>{this.props.x}</TextNormal>*/}
                            </View>
                            :
                            <NoData/>
                    }
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.userReducer.currency
    }
}

export default connect(mapStateToProps, null)(chartBar);