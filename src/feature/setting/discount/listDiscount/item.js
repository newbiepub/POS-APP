import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../styles/base";
import {formatDate, objectValue, uuid} from "../../../../utils/utils";
import EStyleSheet from "react-native-extended-stylesheet";
import Ionicons from "react-native-vector-icons/Ionicons";

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
                        <EditButton/>
                    </View>
                    <View style={[styleBase.m_sm_horizontal, styleBase.alignCenter]}>
                        <DeleteButton/>
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

const EditButton = () => {
    return (
        <TouchableOpacity style={[styles.btn, styles.btnEdit,styleBase.center]}>
            <Ionicons name="ios-create-outline"
                      style={[styleBase.textWhite, styleBase.title]}/>
        </TouchableOpacity>
    )
}

const DeleteButton = () => {
    return (
        <TouchableOpacity style={[styles.btn, styles.btnDelete,styleBase.center]}>
            <Ionicons name="ios-close" style={[styleBase.textWhite, styleBase.title]}/>
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