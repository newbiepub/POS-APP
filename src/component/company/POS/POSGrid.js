import React from "react";
import {View, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import styleBase from "../../style/base";
import POSGridItem from "./POSGridItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import styleHome from "../../style/POS";
import {connect} from "react-redux";
import {closePopup, openPopup, renderPopup} from "../../../action/popup";
import CreatePOSModal from "../../popup/company/POS/CreatePOSModal";

class POSGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.employees.data
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({pos: nextProps.employees.data})
    }

    onPressItem(item) {
        this.props.navigator.push({id: "posdetail", employee: item})
    }

    renderItem(item, index) {
        return <POSGridItem key={index} item={item} instance={this} onPressItem={this.onPressItem.bind(this)}/>
    }

    onCreatePOS() {
        this.props.openPopup();
        this.props.renderPopup(<CreatePOSModal {...this.props}/>)
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ScrollView
                    removeClippedSubviews={true}>
                    <View style={[styleBase.row, {flexWrap: "wrap"}]}>
                        {this.state.pos.map((item, index) => this.renderItem(item, index))}
                        <TouchableOpacity
                            onPress={this.onCreatePOS.bind(this)}
                            style={[styleBase.center, styleHome.posItem, {backgroundColor: "#e5e5e5"}]}>
                            <Ionicons name="ios-add-outline" style={[{fontSize: 100}, styleBase.text4, styleBase.bold]}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        employees: state.employeeCompany
    }
};

const mapDispatchToProps = {
    closePopup,
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(POSGrid);