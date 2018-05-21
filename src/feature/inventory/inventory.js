import React from "react";
import {
    ActivityIndicator,
    RefreshControl,
    FlatList,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    InteractionManager, Alert
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {SearchInput, TextInputNormal, TextInputNumber, TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator, removeVietSymbol} from '../../reuseable/function/function';
import Header from '../../component/header';
import moment from "../../component/moment";
import _ from "lodash";
import {normalizeTransactionSectionList} from "../../reuseable/function/normalizeData";
import {
    fetchInventoryActivityEmployeeAmount,
    fetchInventoryActivityEmployee,
    selectInventoryActivity,
    requestInventoryOrder,
    confirmInventory
} from './inventoryAction';
import NoData from '../../component/noData'
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
            rightSideWidth: width * 0.7,
            rightSideHeight: height - constantStyle.headerHeight,
            listProductRequest: [],
            searchText: "",
            maxQuantity: 0,
            defaultQuantity: 5,
            filter: {
                searchText: "",
                maxQuantity: 0,
            },
            refreshing: false
        }
    }

    async componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            this.loadInventoryActivity(this.state.limit, this.state.skip)
        });

    }

    loadInventoryActivity(limit, skip) {
        this.props.fetchInventoryActivityEmployee(limit, skip)
    }

    onPressItemRequest(item) {
        InteractionManager.runAfterInteractions(async () => {
            this.props.selectInventoryActivity(item)
        });


    }

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItemRequest(item)}>
            <View
                style={[style.itemWrapper, this.props.inventoryActivitySelected._id && this.props.inventoryActivitySelected._id === item._id && style.itemWrapperSelected]}>
                <TextNormal
                    style={[style.itemText, this.props.inventoryActivitySelected._id && this.props.inventoryActivitySelected._id === item._id && style.itemTextSelected]}>{moment(item.dateRequest).format(`DD/MM/YYYY: hh:mm a`)}</TextNormal>
            </View>
        </TouchableOpacity>
    );
    _renderItemProduct = ({item}) => (
        <View
            style={style.itemProduct}>
            <TextNormal
                style={[]}>Tên mặt hàng: {this.getProductName(item._id)}</TextNormal>
            <TextNormal
                style={[]}>Số lượng: {item.quantity}</TextNormal>

        </View>
    );


    _renderItemProductRequest = ({item}) => {
        return (
            <ProductRequest item={item} listProductRequest={this.state.listProductRequest} instant={this}/>
        )
    };
    _renderFooter = ({}) => (
        <View
            style={{height: constantStyle.xl * 2}}>

        </View>
    );

    getProductName(id) {
        for (items of this.props.products) {
            if (id === items.product._id) {
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


    async checkAll() {
        if (this.state.defaultQuantity > 0) {
            let listProductRequest = [];
            for (item of this.props.products) {
                await listProductRequest.push({
                    _id: item.product._id,
                    quantity: this.state.defaultQuantity
                })
            }
            await this.setState({
                listProductRequest: listProductRequest
            });
        } else {
            Alert.alert(
                'Thông báo !',
                'Bạn phải nhập số lượng mặc định lớn hơn 0 !',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'OK', onPress: async () => {
                        }
                    },
                ],
                {cancelable: false}
            )
        }

    }

    unCheckAll() {
        this.setState({
            listProductRequest: []
        });
    }

    async _onRefresh() {
        await this.setState({
            refreshing: true,
        });
        // console.warn('refreshing')
        await this.loadInventoryActivity(this.state.limit, this.state.skip);
        this.setState({
            refreshing: false
        })
    }

    filterProductRequest() {

        let {searchText, maxQuantity} = this.state.filter, result = [];

        if (searchText === "" && maxQuantity === 0) {
            return this.props.products;
        } else {
            for (item of this.props.products) {
                let searchCondition = true, quantityCondition = true;
                if (searchText !== "" &&
                    !removeVietSymbol(item.product.name).toLowerCase().includes(removeVietSymbol(searchText).toLowerCase())) {
                    searchCondition = false
                }
                if (item.quantity >= maxQuantity && maxQuantity !== 0) {
                    quantityCondition = false
                }
                if (searchCondition && quantityCondition) {
                    result.push(item)
                }
            }
        }
        return result
    }

    onPressFilter() {
        InteractionManager.runAfterInteractions(async () => {
            this.setState({
                filter: {
                    searchText: this.state.searchText,
                    maxQuantity: this.state.maxQuantity
                }
            })
        });

    }

    onConfirmInventory() {
        try {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn xác nhận đã nhận được hàng ?',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'OK', onPress: async () => {
                            console.warn(this.props.inventoryActivitySelected._id);
                            let result = await this.props.confirmInventory(this.props.inventoryActivitySelected._id);
                            if (result) {
                                // this.loadInventoryActivity(1, 0);
                                Alert.alert(
                                    'Thông báo !',
                                    'Bạn đã gởi xác nhận thành công !',
                                    [
                                        {text: 'OK', style: 'cancel'},
                                    ],
                                    {cancelable: false}
                                )
                            }
                        }
                    },
                ],
                {cancelable: false}
            )
        } catch (e) {
            Alert.alert(
                'Thông báo !',
                'Đã có lỗi xảy ra, vui lòng thử lại !',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'Thử lại', onPress: async () => {
                            this.onConfirmInventory()
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    }

    async onRequestImport() {
        try {
            if (this.state.listProductRequest.length > 0) {
                Alert.alert(
                    'Thông báo !',
                    'Bạn có muốn gởi yêu cầu này không ?',
                    [
                        {text: 'Không', style: 'cancel'},
                        {
                            text: 'OK', onPress: async () => {
                                let result = await this.props.requestInventoryOrder(this.state.listProductRequest);
                                if (result) {
                                    this.loadInventoryActivity(1, 0);
                                    Alert.alert(
                                        'Thông báo !',
                                        'Bạn đã gởi yêu cầu thành công!',
                                        [
                                            {text: 'Không', style: 'cancel'},
                                            {
                                                text: 'OK', onPress: async () => {
                                                }
                                            },
                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }
                        },
                    ],
                    {cancelable: false}
                )

            } else {
                Alert.alert(
                    'Thông báo !',
                    'Bạn chọn sản phẩm cần nhập !',
                    [
                        {text: 'Không', style: 'cancel'},
                        {
                            text: 'OK', onPress: async () => {
                            }
                        },
                    ],
                    {cancelable: false}
                )
            }
        } catch (e) {
            Alert.alert(
                'Thông báo !',
                'Đã có lỗi xảy ra, vui lòng thử lại sau!',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'OK', onPress: async () => {
                        }
                    },
                ],
                {cancelable: false}
            )
        }


    }

    async loadMore() {
        await this.setState({
            skip: this.state.skip + 5
        });
        this.loadInventoryActivity(this.state.limit, this.state.skip)
    }

    render() {
        return (
            <View style={style.container}>
                <Header type={"custom-right"} titleLeft={"Kho"}>
                    {
                        !this.props.inventoryActivitySelected._id &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextNormal style={style.textHeader}>Yêu cầu nhập kho</TextNormal>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity onPress={() => {
                                this.onRequestImport()
                            }}>
                                <TextNormal style={style.textHeader}>Gởi yêu cầu</TextNormal>
                            </TouchableOpacity>

                        </View>
                    }
                    {
                        this.props.inventoryActivitySelected._id && this.props.inventoryActivitySelected.status === "processing" &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity onPress={() => {
                                this.onConfirmInventory()
                            }}>
                                <TextNormal style={style.textHeader}>Xác nhận đã nhận hàng</TextNormal>
                            </TouchableOpacity>

                        </View>
                    }

                </Header>
                <View style={style.body}>

                    <View style={style.leftView}>
                        <FlatList
                            data={this.props.inventoryActivity}
                            extraData={this.props}
                            initialNumToRender={3}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            onEndReached={async () => {
                                await this.loadMore()
                            }}
                            onEndReachedThreshold={0.1}
                            disableVirtualization={true}
                            removeClippedSubviews={true}
                            ListEmptyComponent={() => <NoData/>}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={style.listItem}
                            renderItem={this._renderItem}
                        />
                        <TouchableOpacity onPress={() => {
                            this.onPressItemRequest([])
                        }}>
                            <View
                                style={[style.requestImport, !this.props.inventoryActivitySelected._id && {backgroundColor: constantStyle.color1}]}>
                                <TextNormal
                                    style={[style.requestImportText, !this.props.inventoryActivitySelected._id && {color: constantStyle.color2}]}>Gởi
                                    yêu cầu</TextNormal>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.rightView}>

                        {
                            this.props.inventoryActivitySelected._id ?


                                <View style={{
                                    backgroundColor: 'white',
                                    padding: constantStyle.xl,
                                    flex: 1,
                                    paddingBottom: 0
                                }}>
                                    <TextNormal style={style.spaceLine}>Ngày gởi yêu
                                        cầu: {moment(this.props.inventoryActivitySelected.dateRequest).format(`dddd, DD [tháng] MM [năm] YYYY `)}</TextNormal>
                                    <TextNormal style={style.spaceLine}>Tình
                                        trạng: {this.getStatus(this.props.inventoryActivitySelected.status)}</TextNormal>
                                    <TextNormal style={style.spaceLine}>Danh sách mặt hàng:</TextNormal>
                                    <FlatList
                                        data={this.props.inventoryActivitySelected.products}
                                        extraData={this.props.inventoryActivity}
                                        keyExtractor={(item) => item._id}
                                        disableVirtualization={true}
                                        removeClippedSubviews={true}
                                        updateCellsBatchingPeriod={10}
                                        maxToRenderPerBatch={1}
                                        windowSize={400}
                                        initialNumToRender={3}
                                        // ListFooterComponent={this._renderFooter}
                                        contentContainerStyle={style.listItem}
                                        renderItem={this._renderItemProduct}
                                    />
                                </View>
                                :
                                <View style={{
                                    // position: 'absolute',
                                    // height: this.state.rightSideHeight,
                                    // width: this.state.rightSideWidth,
                                    // zIndex: this.state.isRequest ? 7 : 3,
                                    backgroundColor: 'white',
                                    paddingHorizontal: constantStyle.xl,
                                    flex: 1,

                                }}>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: constantStyle.sm
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: "row",
                                            }}>
                                                <TextNormal>{`Số lượng ít hơn: `}</TextNormal>
                                                <TextInputNumber value={this.state.maxQuantity}
                                                                 style={{flex: 1,borderBottomWidth:1,borderColor:constantStyle.colorBorder}}
                                                                 onChangeText={(text) => this.setState({maxQuantity: text})}/>
                                                <TextNormal>Số lượng mặc định: </TextNormal>
                                                <TextInputNumber value={this.state.defaultQuantity}
                                                                 style={{flex: 1,borderBottomWidth:1,borderColor:constantStyle.colorBorder}}
                                                                 onChangeText={(text) => this.setState({defaultQuantity: text})}/>
                                            </View>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: constantStyle.sm,
                                        }}>
                                            <View style={{flex: 1, marginRight: constantStyle.sm}}>
                                                <SearchInput value={this.state.searchText}
                                                             style={{flex: 1}}
                                                             clean={() => this.setState({searchText: ''})}
                                                             onChangeText={(text) => this.setState({searchText: text})}/>
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                this.onPressFilter()
                                            }}>
                                                <View style={{
                                                    borderRadius: constantStyle.lg,
                                                    backgroundColor: constantStyle.color1,
                                                    paddingVertical: constantStyle.sm,
                                                    paddingHorizontal: constantStyle.lg,
                                                }}>
                                                    <TextNormal style={{color: constantStyle.color2}}>Lọc</TextNormal>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection: 'row',paddingVertical: constantStyle.sm}}>
                                            <TouchableOpacity style={{
                                                padding: constantStyle.sm,
                                                backgroundColor: constantStyle.color1,
                                                borderTopLeftRadius: constantStyle.lg,
                                                borderBottomLeftRadius: constantStyle.lg,
                                                borderWidth: 1,
                                                flex:1,
                                                borderColor: constantStyle.color1,
                                            }} onPress={() => {
                                                this.checkAll()
                                            }}>
                                                <View >
                                                    <TextNormal style={{color: constantStyle.color2,textAlign:'center',}}>Chọn tất
                                                        cả</TextNormal>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                borderWidth: 1,
                                                borderColor: constantStyle.colorBorder,
                                                padding: constantStyle.sm,
                                                flex:1,
                                                backgroundColor: constantStyle.color2,
                                                borderTopRightRadius: constantStyle.lg,
                                                borderBottomRightRadius: constantStyle.lg
                                            }} onPress={() => this.unCheckAll()}>
                                                <View >
                                                    <TextNormal style={{textAlign:'center',}}>Bỏ tất cả</TextNormal>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <FlatList
                                        data={this.filterProductRequest()}
                                        extraData={this.state}
                                        updateCellsBatchingPeriod={10}
                                        maxToRenderPerBatch={1}
                                        windowSize={400}
                                        disableVirtualization={true}
                                        removeClippedSubviews={true}
                                        initialNumToRender={3}
                                        // ListFooterComponent={this._renderFooter}
                                        keyExtractor={(item) => item._id}
                                        contentContainerStyle={style.listItem}
                                        renderItem={this._renderItemProductRequest}
                                    />
                                </View>
                        }


                    </View>
                </View>

            </View>
        )
    }
}


class ProductRequest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: this.checkProductIsChecked(this.props.item.product._id, this.props.listProductRequest),
            quantityRequest: 0,
        }

    }

    checkProductIsChecked(id, list) {
        for (item of list) {
            if (item._id === id) {
                this.setState({
                    quantityRequest: item.quantity
                });
                return true
            }
        }
        return false
    }

    async addProductRequest(id) {
        let {instant} = this.props;
        if (this.state.quantityRequest > 0) {
            await instant.setState({
                listProductRequest: [...instant.state.listProductRequest, ...[{
                    _id: id,
                    quantity: this.state.quantityRequest
                }]]
            });
            this.setState({
                isCheck: true
            })
        } else {
            Alert.alert(
                'Thông báo !',
                'Bạn phải nhập số lượng cần nhập lớn hơn 0 !',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'OK', onPress: async () => {
                        }
                    },
                ],
                {cancelable: false}
            )
        }


    }

    removeProductRequest(id) {
        let listProductRequest = this.props.instant.state.listProductRequest;
        for (let i = 0; i < listProductRequest.length; i++) {
            if (listProductRequest[i]._id === id) {
                listProductRequest.splice(i, 1);
            }
        }
        this.setState({
            isCheck: false
        });
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.listProductRequest != this.props.listProductRequest) {

            await this.setState({
                isCheck: this.checkProductIsChecked(this.props.item.product._id, nextProps.listProductRequest),
            });
        }
    }

    onChangeQuantity(num) {
        if (this.state.isCheck) {
            this.removeProductRequest(this.props.item.product._id)
        }
        this.setState({
            quantityRequest: num
        })
    }

    render() {
        let {item} = this.props;
        return (
            <View
                style={[style.itemProduct, {flexDirection: 'row'}]}>
                <View style={{flex: 1}}>
                    <TextNormal
                        style={[]}>Tên mặt hàng: {item.product.name}</TextNormal>

                    <View style={{flexDirection: 'row'}}>
                        <TextNormal
                            style={[{flex: 1}]}>Số lượng còn lại:</TextNormal>
                        <TextNormal
                            style={[{flex: 1}]}> {item.quantity}</TextNormal>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextNormal
                            style={[{flex: 1}]}>Số lượng cần nhập:</TextNormal>
                        <TextInputNumber style={{flex: 1, borderBottomWidth:1,borderColor:constantStyle.colorBorder}} value={this.state.quantityRequest} onChangeText={(text) => {
                            this.onChangeQuantity(text)
                        }}/>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    if (this.state.isCheck)
                        this.removeProductRequest(item.product._id);
                    else
                        this.addProductRequest(item.product._id);

                }}
                                  style={{justifyContent: "center", padding: constantStyle.sm}}>
                    <View>
                        <View style={{
                            width: constantStyle.md,
                            height: constantStyle.md,
                            borderRadius: constantStyle.sm,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'black',
                        }}>
                            {
                                this.state.isCheck &&

                                <View style={{
                                    width: constantStyle.sm,
                                    height: constantStyle.sm,
                                    borderRadius: constantStyle.xs,
                                    backgroundColor: constantStyle.color1,
                                }}>
                                </View>

                            }

                        </View>

                    </View>
                </TouchableOpacity>

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
    rightViewContainer: {
        padding: constantStyle.xl,
        paddingBottom: constantStyle.xl * 3,
        flex: 1
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
    },
    itemProduct: {
        padding: constantStyle.sm,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: constantStyle.colorBorder
    },
    requestImport: {
        height: constantStyle.headerHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constantStyle.color2,
        borderWidth: 1,
        borderColor: constantStyle.color1

    },
    requestImportText: {},
    textHeader: {
        color: constantStyle.color2,
        paddingHorizontal: constantStyle.md,
        paddingVertical: constantStyle.sm
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
    selectInventoryActivity,
    requestInventoryOrder,
    confirmInventory
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);