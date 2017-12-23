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
    Animated
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

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: 'byProduct', name: 'Theo mặt hàng'}, {id: 'byCategory', name: 'Theo loại hàng'}, {
                id: 'byDate',
                name: 'Theo ngày'
            }],
            searchText: '',
            selected: {id: 'byProduct', name: 'Theo mặt hàng'},
            loading: true,
        }
    }

    onSelection(id) {
        this.setState({
            selected: id
        })
    }

    previewCategory(category) {
        this.setState({
            selected: {
                id: 'previewCategory',
                name: category.name,
                data: category
            }
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        const productChanged = this.props.allProduct !== nextProps.allProduct;
        const viewChanged = this.state.selected !== nextState.selected;
        const loadingChanged = this.props.loading !== nextProps.loading;
        const searchText = this.state.searchText !== nextState.searchText;
        const discountChanged = this.props.discount !== nextProps.discount;
        return productChanged || viewChanged || loadingChanged || searchText|| discountChanged;
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        try {
            var list = this.state.list.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.id} onPress={() => {
                        this.onSelection(data)
                    }}>
                        <View
                            style={[styleHome.boxPadding, this.state.selected.id === data.id && styleBase.background3, styleBase.centerVertical]}>
                            <TextNormal
                                style={[this.state.selected.id === data.id && styleBase.color4]}>{data.name}</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                )
            });
        }
        catch (e) {
            console.warn(e);
            return <View></View>
        }

        return (
            <View style={[styleBase.container, styleBase.background4, {flexDirection: 'row'}]}>

                {/*----------------leftSide--------------------*/}
                <View style={[styleHome.borderRight, {flex: 3}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextLarge style={[styleBase.color3]}>Thống kê</TextLarge>
                    </View>
                    {/*content*/}
                    <View>
                        {list}
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>

                        {
                            this.state.selected.id === 'previewCategory' &&
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({
                                    selected: {id: 'category', name: 'Loại hàng'},
                                })
                            }}>
                                <EvilIcons name="arrow-left"
                                           style={[styleHome.titleBarIconBack]}/>
                            </TouchableWithoutFeedback>
                        }
                        <TextLarge style={[styleBase.color3]}>{this.state.selected.name}</TextLarge>
                    </View>

                    <View style={{flex: 1}}>
                    </View>
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
        loading: state.product.loading,
        discount: state.product.discount

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);