import React from "react";
import {Text, TouchableOpacity, View, TextInput, Alert, FlatList} from "react-native";
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";
import {getTaxHistory, getCurrentTax} from '../../../action/taxCompany';
import {connect} from "react-redux";
import {createTax} from '../../../action/taxCompany';
import {TextNormal, TextLarge, TextSmall} from '../../reusable/text';
import moment from '../../momentJs';

class Taxes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tax: this.props.tax
        }
    }

    onChange(text) {
        let newText = '';
        let numbers = '0123456789';
        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                if (newText === '' && text[i] == 0) {

                } else {
                    newText = newText + text[i];

                }

            }
        }
        if (newText < 1) {
            newText = 0
        }
        if (newText > 100) {
            newText = 100
        }
        this.setState({tax: newText})
    }

    componentWillMount() {
        if (this.props.taxHistory.length === 0)
            this.props.getTaxHistory()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty("tax")) {
            this.setState({
                tax: nextProps.tax
            })
        }
    }

    async setTax() {
        if(this.state.tax != this.props.tax)
        { let a = await createTax(this.state.tax);
            if (a === true) {
                this.props.getTaxHistory();
                this.props.getCurrentTax()
                Alert.alert(
                    'Lưu thuế',
                    'thành công !',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            } else {
                Alert.alert(
                    'Lưu thuế',
                    a,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            }

        }else{
            Alert.alert(
                'Thông báo',
                "Bạn phải nhập thuế mới khác với thuế hiện tại !",
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }

    }

    _renderItem = ({item}) => (
        <View style={[{flexDirection: 'row'}, styleSetting.taxHistory]}>
            <TextNormal style={{flex: 1}}>Thuế: {item.tax}</TextNormal>
            <TextSmall>Ngày tạo: {moment(item.createAt).format(`dddd,DD [tháng] MM [năm] YYYY `)}</TextSmall>
        </View>
    );


    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleSetting.taxList, styleBase.row]}>
                    <TouchableOpacity onPress={() => this.setTax()}
                                      style={[styleBase.center, styleBase.grow, styleSetting.addTaxButton]}>
                        <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                            Lưu
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        keyboardType='decimal-pad'
                        onChangeText={(tax) => this.onChange(tax) || 0}
                        style={[styleBase.font16, styleBase.wrappedText,
                            {textAlign: "right", marginRight: 5, color: "#999"}
                        ]}
                        value={this.state.tax.toString()}
                        placeholderTextColor="#999"
                    />
                    <Text style={[styleBase.font16, {color: "#999"}]}>
                        %
                    </Text>
                </View>
                <FlatList
                    data={this.props.taxHistory}
                    extraData={this.state}
                    keyExtractor={(item) => item._id}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapDispatchToProps = {
    getTaxHistory,
    getCurrentTax
};
const mapStatetoProps = (state) => {
    return {
        accountCompany: state.accountCompany,
        tax: state.tax.tax,
        taxHistory: state.tax.taxHistory
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(Taxes);