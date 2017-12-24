import React, {Component} from "react";
import {
    ActivityIndicator,
    FlatList,
    InteractionManager,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated,
    Picker
} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';
import CreateDiscount from '../../popup/product/createDiscount';
import styleProduct from "../../style/product";
import * as Animate from "react-native-animatable";
import Swipeable from "../../swipeableList/swipeableList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {numberwithThousandsSeparator} from "../../reusable/function";
import {VictoryBar, VictoryPie, VictoryChart, VictoryGroup, VictoryTheme, VictoryAxis} from "victory-native";
import moment from '../../momentJs'

class ByDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            length: 0,
            data: [],
            widthChart: 0,
            heightChart: 0
        }
    }

    componentWillMount() {
        let transaction = this.props.transaction;
        this.getDataByDate(transaction)
    }

    async componentWillReceiveProps(nextProps) {

        if (nextProps.hasOwnProperty("transaction")) {
            let transaction = nextProps.transaction;
            this.getDataByDate(transaction)
        }
    }

    getDataByDate(transaction) {
        let data = [];

        for (itemDate of transaction) {
            var totalPrice = 0;
            for (tran of itemDate.data) {
                totalPrice = totalPrice + tran.totalPrice
            }
            data.push({
                y: totalPrice,
                x: moment(itemDate.title).format(`DD/MM/YYYY `),
            })

        }
        this.setState({
            data: data,
            length: data.length
        })

    }


    getWidthChart(event) {
        var {width, height} = event.nativeEvent.layout;
        this.setState({
            widthChart: width * 80 / 100,
            heightChart: height * 90 / 100
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding]}>

                    <TextLarge style={[styleBase.color3]}>Theo ngày</TextLarge>

                </View>
                <View onLayout={(event) => {
                    this.getWidthChart(event)
                }} style={{flex: 1, padding: 15}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <View>
                                {
                                    this.state.length < 5 ?
                                        <View style={{flexDirection: 'row'}}>

                                            <TextNormal>Tiền</TextNormal>
                                            <VictoryChart
                                                theme={VictoryTheme.material}
                                                width={this.state.widthChart}
                                                height={this.state.heightChart}
                                            >
                                                <VictoryBar
                                                    animate={{
                                                        duration: 2000,
                                                        onLoad: {duration: 1000}
                                                    }}
                                                    labels={(d) => `${d.y}đ`}
                                                    y={(data) => data.y}
                                                    x={(data) => data.x}
                                                    style={{data: {fill: "#c43a31", width: 50}}}
                                                    data={this.state.data}
                                                />

                                            </VictoryChart>

                                        </View> :
                                        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
                                            <TextNormal>Tiền</TextNormal>
                                            <VictoryChart
                                                theme={VictoryTheme.material}
                                                height={this.state.heightChart}
                                            >
                                                <VictoryBar
                                                    animate={{
                                                        duration: 2000,
                                                        onLoad: {duration: 1000}
                                                    }}
                                                    labels={(d) => `${d.y}đ`}
                                                    y={(data) => data.y}
                                                    x={(data) => data.x}
                                                    style={{data: {fill: "#c43a31", width: 50}}}
                                                    data={this.state.data}
                                                />

                                            </VictoryChart>
                                        </ScrollView>

                                }
                                <TextNormal style={{textAlign: 'right'}}>Ngày</TextNormal>
                            </View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        allProduct: state.product.allProduct,
        category: state.product.category,
        transaction: state.transaction.transaction,
        loading: state.transaction.loading

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(ByDate);