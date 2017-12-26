import React from "react";
import {
    FlatList,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
    ActivityIndicator
} from "react-native";
import {TextInputNormal, TextInputPriceMask, TextLarge, TextSmall, TextNormal} from '../../../reusable/text';
import styleBase from "../../../style/base";
import styleHome from '../../../style/home';
import styleModalItems from '../../../style/modalItem';
import {connect} from "react-redux";
import {closePopup} from '../../../../action/popup';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {createDiscount, upsertDiscount, getDiscount} from '../../../../action/product';


class EmployeeSelection extends React.PureComponent {

    addEmployee(id) {
        let {employeeId} = this.props.instant.state.discountData;
        for (item of employeeId) {
            if (id === item._id) {
                employeeId.splice(employeeId.indexOf(item), 1)
                return true
            }

        }
        employeeId.push({_id: id});

    }
    _renderItem = ({item}) => (
        <Employee item={item} employeeDiscount={this.props.instant.state.discountData.employeeId}
                  addEmployee={(id) => this.addEmployee(id)}/>
    );

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={[styleHome.paddingModal]}>
                    <TextNormal>
                       Điểm bán hàng:
                    </TextNormal>
                    <View style={[styleHome.modalItem]}>
                        <FlatList
                            data={this.props.employee}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this._renderItem}
                        />
                    </View>

                </View>
            </ScrollView>
        )
    }
}


class Employee extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPicked: this.checkIfExistInDiscountProduct(this.props.item._id)
        }
    }

    checkIfExistInDiscountProduct(id) {
        for (item of this.props.employeeDiscount) {
            if (id === item._id)
                return true
        }
        return false
    }

    render() {
        let item = this.props.item;
        return (
            <TouchableOpacity onPress={() => {
                this.props.addEmployee(item._id);
                this.setState({
                    isPicked: !this.state.isPicked
                })
            }}
                              style={[styleHome.borderBottom, styleHome.itemBar, {
                                  flexDirection: 'row',
                                  flex: 1
                              }]}>
                <View style={[styleHome.itemIcon, {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <FontAwesome name="desktop" style={[styleBase.textE5,styleBase.vector26]}/>

                </View>
                <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
                    <TextSmall style={{flex: 1}}>{item.username}</TextSmall>
                    <View style={[styleBase.center, styleHome.borderRadioButton]}>
                        {
                            this.state.isPicked &&
                            <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapDispatchToProps = {
    closePopup,
    createDiscount,
    upsertDiscount,
    getDiscount
};
const mapStateToProps = (state) => {
    return {
       employee: state.employeeCompany.data
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSelection);