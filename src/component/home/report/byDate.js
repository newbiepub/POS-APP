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
            slectedDate: '',
            listDate: [],
            loading: this.props.instance.props.loading,
            listByDate: [],
            data: [],
            widthChart: 0,
            heightChart: 0
        }
    }

    async componentWillMount() {
        await this.getListDate(this.props.instance.props.transaction);

        this.getDataByProduct(this.props.instance.props.transaction)
    }

    async componentWillReceiveProps(nextProps) {
        if (this.state.loading !== nextProps.instance.props.loading) {
            this.setState({
                loading: nextProps.instance.props.loading
            })
        }
        if (nextProps.hasOwnProperty("transaction")) {
            let transaction = nextProps.transaction;

            this.getDataByProduct(transaction)
        }
    }

    async getListDate(transaction) {
        return new Promise((resolve, reject) => {
            let data = [];
            for (item of transaction) {
                data.push(item.title);

            }
            setTimeout(async () => {
                resolve(data)
            }, 0)
        })

    }

    getDataByProduct(transaction) {
        let data = [];

        for (itemDate of transaction) {
            var totalPrice = 0;
            for (tran of itemDate.data) {
                totalPrice = totalPrice + tran.totalPrice
            }
            data.push({
                y: totalPrice,
                x: moment(itemDate.title).format(`DD/MM/YYYY `),
                label: moment(itemDate.title).format(`DD/MM/YYYY `)
            })

        }
        return data

    }


    getWidthChart(event) {
        var {width, height} = event.nativeEvent.layout;
        this.setState({
            widthChart: width * 80 / 100,
            heightChart: height * 90 / 100
        })
    }

    render() {
        let listOption = this.state.listDate.map(item => {
            return (
                <Picker.Item key={item} label={moment(item).format(`dddd,DD [tháng] MM [năm] YYYY `)} value={item}/>
            )
        })
        return (

            <View onLayout={(event) => {
                this.getWidthChart(event)
            }} style={{flex: 1,padding:15}}>
                {
                    this.props.loading ?
                        <View style={[styleBase.center, {flex: 1}]}>
                            <ActivityIndicator size={"large"}/>
                        </View> :
                        <View>
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

                                        y={(data) => data.y}
                                        x={(data) => data.x}
                                        style={{data: {fill: "#c43a31", width: 50}}}
                                        data={this.getDataByProduct(this.props.transaction)}
                                    />

                                </VictoryChart>

                            </View>
                            <TextNormal style={{textAlign:'right'}}>Ngày</TextNormal>
                        </View>
                }

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