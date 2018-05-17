import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, InteractionManager} from "react-native";
import styleBase from "../../../../styles/base";
import {formatDate, objectValue, uuid} from "../../../../utils/utils";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import store from "../../../../store/store";
import {DISCOUNT_ACTION} from "../../../../constant/actionTypes";

const field = [
    {
        width: 0.2,
        value: (v) => objectValue(v, 'name')
    },
    {
        width: 0.3,
        value: (v) => objectValue(v, 'description')
    },
    {
        width: 0.25,
        value: (v) => formatDate(objectValue(v, 'appliedDate'))
    },
    {
        width: 0.25,
        value: (v) => formatDate(objectValue(v, 'dueDate'))
    }
]

class DiscountItem extends React.Component {
    constructor(props) {
        super(props);
        this.handlePressEdit   = this.handlePressEdit.bind(this);
        this.handlePressDelete = this.handlePressDelete.bind(this);
    }

    handlePressEdit() {
        InteractionManager.runAfterInteractions(() => {
            let { item = {} } = this.props;
            let payload = {
                amount: item.value,
                type: {
                    value: item.type
                },
                name: item.name || '',
                description: item.description || '',
                appliedDate: !!item.appliedDate && new Date(item.appliedDate),
                dueDate: !!item.dueDate && new Date(item.dueDate),
                employeeIds: item.employeeIds,
                products: item.products
            }

            store.dispatch({
                type: DISCOUNT_ACTION.CHANGE_AMOUNT,
                payload
            })

            this.props.navigator.push({id: 'discount_input',
                discountId: item._id,
                modifiedType: 'update'})
        });
    }

    handlePressDelete() {

    }

    render() {
        return (
            <View style={[styleBase.row,
                styleBase.p_md_horizontal,
                ,{height: 65}]}>
                <View style={[{flex: 0.1}]}>
                    <Text style={[styleBase.fontRubik]}>
                        {this.props.index + 1}
                    </Text>
                </View>
                {field.map((item) => {
                    return (
                        <View key={uuid()} style={{flex: item.width}}>
                            <Text style={[styleBase.fontRubik]}>
                                {item.value(this.props.item)}
                            </Text>
                        </View>
                    )
                })}
                <View style={[{flex: 0.1}, styleBase.row, styleBase.justifyCenter]}>
                    <View style={[styleBase.m_sm_horizontal, styleBase.alignCenter]}>
                        <EditButton onPress={this.handlePressEdit}/>
                    </View>
                    <View style={[styleBase.m_sm_horizontal, styleBase.alignCenter]}>
                        <DeleteButton onPress={this.handlePressDelete}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    '$size': 30,
    btn: {
        height: '$size',
        width: '$size',
        borderRadius: '0.5 * $size'
    },
    btnEdit: {
        backgroundColor: '#008CBA'
    },
    btnDelete: {
        backgroundColor: '#f44336'
    }
})

const EditButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.btn, styles.btnEdit,styleBase.center]}>
            <Ionicons name="ios-create-outline"
                      style={[styleBase.textWhite, styleBase.title]}/>
        </TouchableOpacity>
    )
}

const DeleteButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.btn, styles.btnDelete,styleBase.center]}>
            <Ionicons name="md-trash" style={[styleBase.textWhite, styleBase.title]}/>
        </TouchableOpacity>
    )
}

DiscountItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
};

DiscountItem.defaultProps = {
    item: {},
    index: 0
};

export default DiscountItem;