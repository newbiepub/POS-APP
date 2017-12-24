import React from "react";
import {
    View, FlatList, ActivityIndicator, WebView, Text, Dimensions, InteractionManager,
    TouchableOpacity
} from "react-native";
import styleBase from "../../style/base";
import moment from "../../momentJs";
import ViewInvoice from "../../popup/invoice/ViewInvoice";
import * as _ from "lodash";

class InvoiceMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: this.props.invoiceData,
            isDimensionChanged: false
        }
    }

    static propTypes = {
        invoiceData: React.PropTypes.array
    };

    static defaultProps = {
        invoiceData: []
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state.invoiceData, nextState.invoiceData);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({invoiceData: nextProps.invoiceData});
    }

    onChangeDimension() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({isDimensionChanged: !this.state.isDimensionChanged})
        })
    }

    componentDidMount() {
        Dimensions.addEventListener("change", this.onChangeDimension.bind(this))
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onChangeDimension.bind(this))
    }

    formatDate(timestamp) {
        return moment(timestamp).format("h:mm:ss a")
    }

    /**
     * View Invoice in popup
     */
    onViewInvoice(item) {
        this.props.openPopup();
        this.props.renderPopup(<ViewInvoice {...this.props} invoice={item}/>)
    }

    renderItem({item, index}) {
        return (
            <View style={[{padding: 15}]}>
                <View style={[{paddingVertical: 10}, styleBase.borderBottomE5, styleBase.row, {justifyContent: "space-between"}, styleBase.centerHorizontal]}>
                    <Text style={[styleBase.bold, styleBase.font16, styleBase.text4]}>
                        {this.formatDate(item.createdAt)}
                    </Text>
                    <TouchableOpacity onPress={() => this.onViewInvoice(item)}>
                        <Text style={[styleBase.font14, styleBase.text4, styleBase.bold]}>
                            Xem Hoá Đơn
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.onViewInvoice(item)} style={[{height: 300, paddingHorizontal: 20, marginVertical: 20}]}>
                    <WebView
                        source={{html: item.invoiceContent}}
                        style={[styleBase.fillParent]}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.state.invoiceData.length === 0 &&
                        <View style={[styleBase.center]}>
                            <ActivityIndicator size="large"/>
                        </View>
                }
                {
                    this.state.invoiceData.length > 0 &&
                        <FlatList
                            data={this.state.invoiceData}
                            extraData={this.state}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderItem.bind(this)}
                        />
                }
            </View>
        )
    }
}

export default InvoiceMain;