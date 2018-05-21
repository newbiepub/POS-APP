import React from "react";
import PropTypes from "prop-types";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import {View, TouchableOpacity, Text, TouchableWithoutFeedback} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {closePopup} from "../../../../component/popup/actions/popupAction";
import {formatDate} from "../../../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import List from "../../../../component/list/list";

const customStyles = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class ReportDetail extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item, index) {
        return <ProductItem item={item} index={index}/>
    }

    render() {
        let item = this.props.item;

        return (
            <View style={[styleBase.container, styleBase.center]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[customStyles.listContainer]}>
                    <ListHeader item={item}/>
                    <View style={[styleBase.m_md_vertical]}>
                        <KeyboardAwareScrollView>
                            <View style={[styleBase.p_md_horizontal, styleBase.row, {justifyContent: 'space-around'}]}>
                                <View>
                                    <Text style={[styleBase.fontRubik, styleBase.fontIcon]}>
                                        {`${item.totalPrice.seperateNumber()}đ`}
                                    </Text>
                                    <Text style={{color: "#666"}}>
                                        TỔNG GIÁ BÁN
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[styleBase.fontRubik, styleBase.fontIcon]}>
                                        {item.productItems.length.seperateNumber()}
                                    </Text>
                                    <Text style={{color: "#666"}}>
                                        SỐ LƯỢNG SẢN PHẨM
                                    </Text>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                        <View style={[styleBase.m_md_vertical]}>
                            <View style={[styleBase.row, styleBase.p_md_horizontal,
                                styleBase.spaceBetween,
                                {
                                   backgroundColor: '#e5e5e5'
                                },
                                styleBase.p_md_vertical]}>
                                <Text style={[styleBase.fontRubik]}>
                                    TÊN SẢN PHẨM
                                </Text>
                                <Text style={[styleBase.fontRubik]}>
                                    GIÁ BÁN
                                </Text>
                            </View>
                            <List
                                renderItem={this.renderItem}
                                dataSources={item.productItems}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.item;

        return (
            <View style={[styleBase.row, styleBase.p_md_horizontal,
                styleBase.spaceBetween,
                {
                    borderBottomWidth: 1, borderColor: '#e5e5e5'
                },
                styleBase.p_md_vertical]}>
                <Text style={[styleBase.fontRubik]}>
                    {item.productName}
                </Text>
                <Text style={[styleBase.fontRubik]}>
                    {`${item.totalPrice.seperateNumber()}đ`}
                </Text>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[{height: 65, borderBottomWidth: 1, borderBottomColor: '#e5e5e5'}, styleBase.p_md_horizontal, styleBase.p_md_vertical, styleBase.alignCenter, styleBase.row]}>
            <View style={[styleBase.grow]}>
                <Text style={[styleBase.fontRubik, styleBase.title]}>
                    {formatDate(props.createdAt).toUpperCase()}
                </Text>
            </View>
            <TouchableWithoutFeedback onPress={closePopup}>
                <View style={[styleBase.p_md_horizontal]}>
                    <Ionicons name={'ios-close'} style={[styleBase.fontIcon]}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

ReportDetail.propTypes = {
    item: PropTypes.object
};

ReportDetail.defaultProps = {
    item: {}
};

export default ReportDetail;