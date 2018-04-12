import React from "react";
import {StyleSheet, InteractionManager, Dimensions} from "react-native";
import {  } from 'react-native';
import PropTypes from "prop-types";
import styleBase from "../../../styles/base";
import List from "../../../component/list/list";
import {closePopup} from "../../../component/popup/actions/popupAction";

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.productList = [
            {
                label: "GIÁ NHẬP",
                field: "price",
                type: "import",
                value: (v) => {
                    return v;
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
                    let { quantity = 0, unit = ''} = v;
                    return `${quantity} ${unit.toUpperCase()}`;
                }
            }
        ];
        this.state = {
            searchText: "",
            data: this.props.data
        };

        this.renderItem = this.renderItem.bind(this);
        this.getPrice   = this.getPrice.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    getPrice (prices = [], type) {
        let {price = 0} = prices.find(item => item.name === type) || {};
        return `${price.seperateNumber()} VND`;
    }

    handleChangeText (text) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({searchText: text, data: this.props.data.filter(data => {
                return new RegExp(text, 'gi').test(data.name);
            })})
        });
    }

    renderItem (item, index) {
        return (
            <View key={item._id} style={StyleSheet.flatten([styleBase.container, styleBase.card])}>
                <View styleName="content">
                    <Title style={StyleSheet.flatten([styleBase.m_sm_vertical])}>
                        {item.name}
                    </Title>
                    {
                        this.productList.map((product, index) => {
                            return (
                                <View key={`ITEM_${index}`} styleName="horizontal v-center space-between"
                                      style={StyleSheet.flatten([styleBase.m_sm_vertical])}>
                                    <Subtitle>
                                        {product.label}
                                    </Subtitle>
                                    {
                                        product.field === "price" &&
                                        <Caption>
                                            {product.value(this.getPrice(item.price, product.type))}
                                        </Caption>
                                    }
                                    {
                                        product.field === "quantity" &&
                                        <Caption>
                                            {product.value(item)}
                                        </Caption>
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
            <View styleName="h-center v-center"
                  style={StyleSheet.flatten([styleBase.bgWhite,
                      styleBase.height80,
                      styleBase.m_xl_horizontal,
                      styleBase.m_xl_vertical])}>
                <View style={StyleSheet.flatten([styleBase.panelHeader])} styleName="horizontal space-between v-center">
                    <Title>
                        {this.props.title}
                    </Title>
                    <TouchableOpacity onPress={closePopup}>
                        <Icon name="close" style={{color: "#444"}}/>
                    </TouchableOpacity>
                </View>
                <View styleName="horizontal v-center" style={StyleSheet.flatten([styleBase.p_md_right])}>
                    <View style={StyleSheet.flatten([styleBase.grow])}>
                        <TextInput
                            styleName="full-width"
                            onChangeText={this.handleChangeText}
                            value={this.state.searchText}
                            placeholder="TÌM KIẾM"/>
                    </View>
                    <Icon name="search" style={{color: "#444"}}/>
                </View>
                <View style={StyleSheet.flatten([styleBase.m_md_vertical, styleBase.m_md_horizontal])}>
                    <List
                        styles={[styleBase.height80]}
                        dataSources={this.state.data}
                        extraData={this.state}
                        keyExtractor={(item, index) => item._id}
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