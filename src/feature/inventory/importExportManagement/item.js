import React from "react";
import {
    StyleSheet,
    InteractionManager,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../../styles/base";
import List from "../../../component/list/list";
import {closePopup} from "../../../component/popup/actions/popupAction";
import Ionicons from "react-native-vector-icons/Ionicons";
import {uuid} from "../../../utils/utils";

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.productList = [
            {
                label: "GIÁ NHẬP",
                field: 'importPrice',
                value: (v) => {
                    console.log(v);
                    return v.importPrice.seperateNumber();
                }
            },
            {
                label: "GIÁ BÁN",
                field: "price",
                type: "default",
                value: (v) => {
                    return v;
                }
            },
            {
                label: "SỐ LƯỢNG",
                field: "quantity",
                value: (v) => {
                    let {quantity = 0, unit = ''} = v;
                    return `${quantity} ${unit.toUpperCase()}`;
                }
            }
        ];
        this.list = null;

        this.state = {
            searchText: "",
            data: this.props.data
        };

        this.renderItem = this.renderItem.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    getPrice(prices = [], type) {
        let {price = 0} = prices.find(item => item.name === type) || {};
        return `${price.seperateNumber()} VND`;
    }

    handleChangeText(text) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                searchText: text, data: this.props.data.filter(data => {
                    return new RegExp(text, 'gi').test(data.name);
                })
            })
        });
    }

    renderItem(item, index) {
        return (
            <View key={uuid()} style={[styleBase.container, styleBase.card]}>
                <View style={[styleBase.container]}>
                    <Text style={[styleBase.m_sm_vertical]}>
                        {item.name}
                    </Text>
                    {
                        this.productList.map((product, index) => {
                            return (
                                <View key={uuid()}
                                      style={[styleBase.m_sm_vertical,
                                          styleBase.row, styleBase.center, styleBase.spaceBetween
                                      ]}>
                                    <View>
                                        <Text>
                                            {product.label}
                                        </Text>
                                    </View>
                                    {
                                        product.field === 'importPrice' &&
                                        <View>
                                            <Text>
                                                {`${product.value(item)} VND`}
                                            </Text>
                                        </View>
                                    }
                                    {
                                        product.field === "price" &&
                                        <View>
                                            <Text>
                                                {product.value(this.getPrice(item.prices, product.type))}
                                            </Text>
                                        </View>
                                    }
                                    {
                                        product.field === "quantity" &&
                                        <View>
                                            <Text>
                                                {product.value(item)}
                                            </Text>
                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={[
                styleBase.shadowBox,
                styleBase.bgWhite,
                styleBase.height80,
                styleBase.m_xl_horizontal,
                styleBase.m_xl_vertical]}>
                <View style={[styleBase.panelHeader, styleBase.row, styleBase.spaceBetween, styleBase.alignCenter]}>
                    <Text style={[styleBase.fontRubik, styleBase.title]}>
                        {this.props.title}
                    </Text>
                    <TouchableOpacity onPress={closePopup}>
                        <Ionicons name="ios-close-outline" style={[styleBase.text4,
                            {fontSize: 40},
                            styleBase.fontRubik]}/>
                    </TouchableOpacity>
                </View>
                <View style={[
                    styleBase.row,
                    styleBase.alignCenter,
                    styleBase.p_md_horizontal,
                    styleBase.p_md_vertical,
                    styleBase.row,
                ]}>
                    <View style={[styleBase.grow]}>
                        <TextInput
                            style={[styleBase.grow]}
                            onChangeText={this.handleChangeText}
                            value={this.state.searchText}
                            placeholder="TÌM KIẾM"/>
                    </View>
                    <Ionicons name="ios-search-outline" style={[styleBase.text4, {fontSize: 30}]}/>
                </View>
                <View style={[styleBase.m_md_vertical, styleBase.m_md_horizontal]}>
                    <List
                        ref={list => this.list = list}
                        styles={[styleBase.height70]}
                        dataSources={this.state.data}
                        extraData={this.state}
                        keyExtractor={(item, index) => uuid()}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}

HistoryItem.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};

HistoryItem.defaultProps = {
    title: "",
    data: []
};

export default HistoryItem;