import React from "react";
import {StyleSheet} from "react-native";
import { View } from "@shoutem/ui";
import PropTypes from "prop-types";
import styleBase from "../../../styles/base";
import NavBar from "../../../component/navbar/navbar";
import ListExportProducts from "./listProduct";

class ConfirmExport extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("CONFIRM EXPORT - ",this.props);
    }

    render() {
        return (
            <View style={StyleSheet.flatten([
                styleBase.container
            ])}>
                <NavBar navigator={this.props.navigator} title={this.props.title}/>
                <ListExportProducts user={this.props.user} type={this.props.type}/>
            </View>
        )
    }
}

ConfirmExport.propTypes = {};

ConfirmExport.defaultProps = {};

export default ConfirmExport;