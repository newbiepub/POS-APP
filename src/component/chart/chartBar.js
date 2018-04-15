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
import {VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryAxis,VictoryLabel} from "victory-native";
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
                    s = s.substr(0, i) + '\n \n' + s.substr(i + 1);
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
                                {/*<ScrollView horizontal={true} style={{flexDirection: 'row', padding: 10}}>*/}
                                {/*<TextNormal>{this.props.y}</TextNormal>*/}
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    width={this.state.widthChart * (length / 4)}
                                    domainPadding={{x: [250, 250], y: [20, 20]}}
                                    height={this.state.heightChart}

                                    containerComponent={
                                        <VictoryZoomContainer
                                            dimension="x"
                                            zoomDomain={{x: [0, length]}}
                                            allowZoom={false}
                                            // allowPan={true}
                                        />}
                                    // scale={{x: "time", y: "linear"}}
                                >
                                    {/*<VictoryAxis*/}

                                        {/*tickFormat={(x) => ((`$${x}`))}*/}
                                    {/*/>*/}
                                    {/*<VictoryAxis dependentAxis crossAxis*/}
                                                 {/*axisLabelComponent={<VictoryLabel dy={20}/>}*/}
                                                 {/*tickFormat={(y) => (`$${y}`)}*/}
                                    {/*/>*/}
                                    <VictoryBar
                                        animate={{
                                            duration: 2000,
                                            onLoad: {duration: 1000}
                                        }}
                                        labels={(d) => this.getValueY(d.y)}
                                        y={(data) => data.y}
                                        x={(data) => this.splitLabel(data.x.value)}
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
                                {/*</ScrollView>*/}
                                <TextNormal style={{textAlign: 'center'}}>{this.props.x.value}</TextNormal>
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