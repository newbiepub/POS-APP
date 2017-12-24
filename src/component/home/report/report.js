import React, {Component} from "react";
import {

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

import {openPopup, renderPopup} from '../../../action/popup';

import ByDate from './byDate';
import ByProduct from './byProduct';
import ByCategory from './byCategory'

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
            byProduct: []
        }
    }
    // //
    // shouldComponentUpdate(nextProps) {
    //     const transactionChanged = this.props.transaction !== nextProps.transaction;
    //     const loadingChanged = this.props.loading !== nextProps.loading;
    //     const selectedChanged = this.props.selected !== nextProps.selected;
    //     return transactionChanged || loadingChanged || selectedChanged
    // }
    //

    onSelection(id) {
        this.setState({
            selected: id
        })
    }

    render() {
        // console.warn(JSON.stringify(this.state.byProduct))
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



                    <View style={{flex: 1}}>
                        {
                            this.state.selected.id === this.state.list[0].id &&
                            <ByProduct instance={this}/>
                        }
                        {
                            this.state.selected.id === this.state.list[1].id &&
                            <ByCategory instance={this}/>
                        }
                        {
                            this.state.selected.id === this.state.list[2].id &&
                            <ByDate instance={this}/>
                        }
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
        transaction: state.transaction.transaction,
        loading: state.transaction.loading

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);