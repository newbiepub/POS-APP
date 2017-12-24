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

class ByProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slectedDate: '',
            listDate: [],
            loading: this.props.instance.props.loading,
            listByDate: [],
            byProduct:[]
        }
    }

    async  componentWillMount()
    {
        await this.getListDate(this.props.instance.props.transaction);

        this.getDataByProduct(this.props.instance.props.transaction)
    }
    async componentWillReceiveProps(nextProps) {
        if (this.state.loading !== nextProps.instance.props.loading) {
            this.setState({
                loading: nextProps.instance.props.loading
            })
        }
        if (nextProps.instance.props.hasOwnProperty("transaction")) {
            let transaction = nextProps.instance.props.transaction;
            let listDate = await this.getListDate(transaction);
            await this.setState({
                listDate: listDate,
                selected: listDate[0]
            })
            console.warn(JSON.stringify(this.state.slectedDate));
            this.getDataByProduct(transaction)
        }
    }

    async getListDate(transaction) {
        return new Promise((resolve,reject)=>{
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
            console.warn( this.state.slectedDate)
            if (itemDate.title === this.state.slectedDate) {
                console.warn(JSON.stringify(itemDate.data))
                for (product of itemDate.data) {
                    for (item of product.productItems) {
                        if (data.length > 0) {
                            for (item of data) {
                                if (item._id === product._id) {
                                    item.totalPrice =
                                        item.totalPrice + product.totalPrice;
                                    item.quantity =
                                        item.quantity + product.quantity;

                                } else {
                                    data.push({
                                        _id: product._id,
                                        name: product.name,
                                        totalPrice: product.totalPrice,
                                        quantity: product.quantity
                                    })
                                }
                            }
                        } else {
                            data.push({
                                _id: product._id,
                                name: product.name,
                                totalPrice: product.totalPrice,
                                quantity: product.quantity
                            })
                        }
                    }


                }
            }

        }
        let result = []
        for (item of data) {
            result.push({
                label: item.name,
                y: item.quantity
            })
        }
        setTimeout(() => {
            console.warn(JSON.stringify(result))
            this.setState({
                byProduct: result
            })
        }, 100)

    }

    render() {
        let listOption = this.state.listDate.map(item => {
            return (
                <Picker.Item key={item} label={moment(item).format(`dddd,DD [tháng] MM [năm] YYYY `)} value={item}/>
            )
        })
        return (

            <View style={{flex: 1, padding: 50}}>
                {
                    this.props.instance.props.loading ?
                        <View style={[styleBase.center, {flex: 1}]}>
                            <ActivityIndicator size={"large"}/>
                        </View> :
                        <View>
                            <Picker
                                selectedValue={this.state.slectedDate}
                                onValueChange={(itemValue, itemIndex) => this.setState({slectedDate: itemValue})}>
                                {listOption}

                            </Picker>
                            <ScrollView horizontal={true}>
                                <VictoryChart
                                    domainPadding={{x: 40}}
                                >
                                    <VictoryBar
                                        data={this.state.byProduct}
                                    />
                                    <VictoryAxis
                                        label="Mặt hàng"
                                        style={{
                                            axisLabel: {padding: 30}
                                        }}
                                    />
                                    <VictoryAxis dependentAxis
                                                 style={{
                                                     axisLabel: {padding: 40, fontSize: 20,},
                                                 }}
                                    />
                                </VictoryChart>
                            </ScrollView>

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
export default connect(mapStateToProps, mapDispatchToProps)(ByProduct);