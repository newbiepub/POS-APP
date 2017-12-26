import React, {Component} from "react";
import {

    TouchableWithoutFeedback,
    View,
    Animated,
    Picker
} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../../reusable/text';
import styleHome from "../../../style/home";
import styleBase from "../../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import {openPopup, renderPopup} from '../../../../action/popup';

import ByDate from './byDate';
import ByProduct from './byProduct';
import ByCategory from './byCategory'

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: 'byProduct', name: 'Theo mặt hàng'}, {
                id: 'byCategory',
                name: 'Theo loại hàng'
            }, {
                id: 'byDate',
                name: 'Theo ngày'
            }],
            searchText: '',
            selected:{id: 'main', name: 'Thống kê'},
            loading: true,
            byProduct: []
        }
    }

    onSelection(id) {
        this.setState({
            selected: id
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


                {/*----------------rightSide--------------------*/}


                <View style={{flex: 1}}>
                    {/*----------------leftSide--------------------*/}
                    {
                        this.state.selected.id === "main" &&
                        <View>
                            <View
                                style={[styleHome.header, styleHome.boxPadding]}>

                                <TextLarge style={[styleBase.color3]}>Thống kê</TextLarge>

                            </View>
                            {/*content*/}
                            <View>
                                {list}
                            </View>
                        </View>


                    }
                    {
                        this.state.selected.id === this.state.list[0].id &&
                        <ByProduct instance={this} employee={this.props.employee}/>
                    }
                    {
                        this.state.selected.id === this.state.list[1].id &&
                        <ByCategory instance={this} employee={this.props.employee}/>
                    }
                    {
                        this.state.selected.id === this.state.list[2].id &&
                        <ByDate instance={this} employee={this.props.employee}/>
                    }
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