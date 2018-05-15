import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';
import moment from "../../component/moment";
import _ from "lodash";
import {normalizeTransactionSectionList} from "../../reuseable/function/normalizeData";
import {
    fetchInventoryActivityEmployeeAmount,
    fetchInventoryActivityEmployee,
    selectInventoryActivity
} from './inventoryAction';
import {getTransaction, getTransactionAmount, selectTransaction} from "../transaction/transactionAction";
import {openPopup} from "../../component/popup/popupAction";
import {connect} from 'react-redux'

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.items = [
            {id: "requestImport", name: "Yêu cầu nhập kho"},
            {id: "requestImport", name: ""},
        ];
        let {width, height} = Dimensions.get('window');
        this.state = {
            limit: 5,
            skip: 0,
        }
    }

    async componentDidMount() {
        this.loadInventoryActivity()
    }

    loadInventoryActivity() {
        this.props.fetchInventoryActivityEmployee(this.state.limit, this.state.skip)
    }

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.props.selectInventoryActivity(item)}>
            <View
                style={[style.itemWrapper, this.props.inventoryActivitySelected._id && this.props.inventoryActivitySelected._id === item._id && style.itemWrapperSelected]}>
                <TextNormal
                    style={[style.itemText, this.props.inventoryActivitySelected._id && this.props.inventoryActivitySelected._id === item._id && style.itemTextSelected]}>{moment(item.dateRequest).format(`DD/MM/YYYY: hh:mm a`)}</TextNormal>
            </View>
        </TouchableOpacity>
    );
    _renderItemProduct = ({item}) => (
            <View
                style={{padding:constantStyle.sm,borderBottomWidth:1,borderTopWidth:1, borderColor:constantStyle.colorBorder}}>
                <TextNormal
                    style={[]}>Tên mặt hàng: {this.getProductName(item._id)}</TextNormal>
                <TextNormal
                    style={[]}>Số lượng: {item.quantity}</TextNormal>

            </View>
    );
    getProductName(id){
        for(items of this.props.products)
        {
            if(id === items.product._id)
            {
                return items.product.name
            }
        }
        return ""
    }
    getStatus(status) {
        if (status === "done") {
            return "Hoàn tất"
        }
        if (status === "pending") {
            return "Đang gởi"
        }
        if (status === "processing") {
            return "Đang trong tiến trình"
        }
        if (status === "reject") {
            return "Đã huỷ"
        }
        return ""
    }

    render() {
        return (
            <View style={style.container}>
                <Header type={"normal"} titleLeft={"Kho"}/>
                <View style={style.body}>

                    <View style={style.leftView}>
                        <FlatList
                            data={this.props.inventoryActivity}
                            extraData={this.props}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={style.listItem}
                            renderItem={this._renderItem}
                        />
                    </View>
                    <View style={style.rightView}>
                        {
                            this.props.inventoryActivitySelected._id &&
                            <ScrollView style={{padding: constantStyle.xl, flex: 1}}>
                                <TextNormal style={style.spaceLine}>Ngày gởi yêu
                                    cầu: {moment(this.props.inventoryActivitySelected.dateRequest).format(`DD/MM/YYYY: hh:mm a`)}</TextNormal>
                                <TextNormal style={style.spaceLine}>Tình
                                    trạng: {this.getStatus(this.props.inventoryActivitySelected.status)}</TextNormal>
                                <TextNormal style={style.spaceLine}>Danh sách mặt hàng:</TextNormal>
                                <FlatList
                                    data={this.props.inventoryActivitySelected.products}
                                    extraData={this.props.inventoryActivity}
                                    keyExtractor={(item) => item._id}
                                    contentContainerStyle={style.listItem}
                                    renderItem={this._renderItemProduct}
                                />
                            </ScrollView>

                        }
                    </View>
                </View>

            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    spaceLine: {
        marginBottom: constantStyle.lg
    },
    leftView: {
        flex: 0.3,
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder,
    },
    rightView: {
        flex: 0.7,
        backgroundColor: constantStyle.color2
        // borderLeftWidth: 1,
        // borderColor: constantStyle.colorBorder,
    },
    itemWrapper: {
        height: constantStyle.headerHeight,
        backgroundColor: constantStyle.color2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: constantStyle.colorBorder
    },
    itemWrapperSelected: {
        backgroundColor: constantStyle.color1
    },
    itemText: {},
    itemTextSelected: {
        color: constantStyle.color2
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        inventoryActivityAmount: state.inventoryReducer.inventoryActivityAmount,
        inventoryActivity: state.inventoryReducer.inventoryActivity,
        inventoryActivitySelected: state.inventoryReducer.inventoryActivitySelected,
        products: state.productReducer.product

    }
}
const mapDispatchToProps = {
    fetchInventoryActivityEmployeeAmount,
    fetchInventoryActivityEmployee,
    selectInventoryActivity
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);