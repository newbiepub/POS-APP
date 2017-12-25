import React from "react";
import {TouchableOpacity, View, ActivityIndicator, FlatList, Text, DatePickerAndroid, DatePickerIOS, Platform} from "react-native";
import {connect} from "react-redux";
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import Entypo from "react-native-vector-icons/Entypo";
import {TextLarge} from "../../reusable/text";
import {getInvoice} from "../../../action/invoice";
import * as _ from "lodash";
import styleSetting from "../../style/setting";
import InvoiceMain from "./invoiceMain";
import {closePopup, openPopup, renderPopup} from "../../../action/popup";
import Ionicons from "react-native-vector-icons/Ionicons";

class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: [],
            currentItem: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }

    async componentWillMount() {
        await getInvoice();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(_.isEmpty(this.state.currentItem)) {
            this.setState({currentItem: nextProps.invoice.data[0]})
        } else {
            let { currentItem } = this.state;
            if(typeof currentItem !== 'string') {
                let currentItemIndex = _.indexOf(nextProps.invoice.data, _.find(nextProps.invoice.data, (item) => {
                    return (currentItem._id.date === item._id.date && currentItem._id.month === item._id.month && currentItem._id.year === item._id.year);
                }));
                this.setState({currentItem: nextProps.invoice.data[(currentItemIndex === -1 ? 0 : currentItemIndex)]});
            }
        }
        this.setState({invoiceData: nextProps.invoice.data});
    }

    currentItemTitle() {
        let currentItem = this.state.currentItem;
        if(typeof currentItem !== "string" && !_.isEmpty(currentItem) && this.state.invoiceData !== "No Data") {
            return `${currentItem._id.date}/${currentItem._id.month}/${currentItem._id.year}`;
        }
        return "";
    }

    onPressItem(item) {
       this.setState({currentItem: item})
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.row]}>
                <View style={{flex: 0.3}}>
                    <View
                        style={[styleHome.header, styleBase.background6,
                            styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                        <TouchableOpacity onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={[styleBase.center, styleBase.wrappedText]}>
                            <TextLarge style={[styleBase.color3]}>{this.props.title}</TextLarge>
                        </View>
                    </View>
                    <View>
                        {
                            this.state.invoiceData.length === 0 &&
                            <View style={[styleBase.center]}>
                                <ActivityIndicator size="large"/>
                            </View>
                        }
                        {
                            (this.state.invoiceData.length > 0 && this.state.invoiceData !== "No Data") &&
                            <InvoiceMenu menuList={this.state.invoiceData} onPressItem={this.onPressItem.bind(this)} currentItem={this.state.currentItem}/>
                        }
                        {
                            this.state.invoiceData === "No Data" &&
                            <View style={[styleBase.center]}>
                                <TextLarge>Không Có Dữ Liệu</TextLarge>
                            </View>
                        }
                    </View>
                </View>
                <View style={{flex: 0.7}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>{this.currentItemTitle()}</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                        {
                            this.state.invoiceData.length === 0 &&
                            <View style={[styleBase.center]}>
                                <ActivityIndicator size="large"/>
                            </View>
                        }
                        {
                            (this.state.invoiceData.length > 0 && this.state.invoiceData !== "No Data") &&
                            <InvoiceMain invoiceData={this.state.currentItem.invoice} {...this.props}/>
                        }
                        {
                            this.state.invoiceData === "No Data" &&
                            <View style={[styleBase.center]}>
                                <TextLarge>Không Có Dữ Liệu</TextLarge>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

class InvoiceMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props.menuList, nextProps.menuList) || !_.isEqual(this.props.currentItem, nextProps.currentItem);
    }

    static propTypes = {
        menuList: React.PropTypes.array,
        currentItem: React.PropTypes.object,
        onPressItem: React.PropTypes.func
    };

    static defaultProps = {
        menuList: [],
        currentItem: {},
        onPressItem: () => {}
    };

    onPressItem(item) {
        this.props.onPressItem(item);
    }

    renderListHeader() {
        return (
            <View style={[styleBase.borderBottomE5, {paddingBottom: 15}]}>
                <Text style={[styleBase.text4, styleBase.font16]}>
                    Ngày
                </Text>
            </View>
        )
    }

    checkActive(item) {
        try {
            let {currentItem} = this.props;
            if(typeof currentItem !== "string") {
                return (currentItem._id.date === item._id.date && currentItem._id.month === item._id.month && currentItem._id.year === item._id.year);
            }
            return false;
        } catch(e) {
            console.warn(JSON.stringify(e));
        }
    }

    renderItem({item, index}) {
        let isActive = this.checkActive(item),
            activeButton = isActive ? styleSetting.activeSection : null,
            activeText = isActive ? styleSetting.activeText : null;
        return (
            <TouchableOpacity key={index} onPress={this.onPressItem.bind(this, item)} style={[{paddingHorizontal: 15, paddingVertical: 10}, activeButton]}>
                <Text style={[styleBase.font18, styleBase.text4, styleBase.bold, activeText]}>
                    {`${item._id.date}/${item._id.month}/${item._id.year}`}
                </Text>
            </TouchableOpacity>
        )
    }

   async searchDate() {
        try {

        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.searchDate.bind(this)}
                    style={[{paddingBottom: 15, paddingHorizontal: 20, marginBottom: 15}, styleBase.borderBottomE5, styleBase.centerHorizontal, styleBase.row, {justifyContent: "space-between"}]}>
                    <Text style={[styleBase.font14, styleBase.textE5]}>
                        Tìm theo ngày...
                    </Text>
                    <Ionicons name="ios-calendar-outline" style={[styleBase.font26, styleBase.textE5]}/>
                </TouchableOpacity>
                <View style={[{paddingHorizontal: 15}]}>
                    <FlatList
                        ListHeaderComponent={this.renderListHeader.bind(this)}
                        data={this.props.menuList}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
            </View>
        )
    }
}

Invoice.propTypes = {
    openMenu: React.PropTypes.func,
    title: React.PropTypes.string
};

Invoice.defaultProps = {
    openMenu: () => {
    },
    title: "Hoá Đơn"
};

const mapStateToProps = (state) => {
    return {
        account: state.account,
        invoice: state.invoice
    }
};

const mapDispatchToProps = {
    openPopup,
    renderPopup,
    closePopup
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);