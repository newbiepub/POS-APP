import React from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            fields: this.props.fields
        }

        this.handleChangeText = this.handleChangeText.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let searchText = this.state.searchText !== nextState.searchText;

        return searchText;
    }

    handleChangeText(text) {
        this.setState({searchText: text});
        this.props.onSearchText(text)
    }

    render() {
        let { fields } = this.state;

        return (
            <View style={[styleBase.container]}>
                <View style={[
                    styleBase.row,
                    styleBase.alignCenter,
                    styleBase.p_md_horizontal,
                    styleBase.p_md_vertical,
                    styleBase.row,
                ]}>
                    <View style={[styleBase.grow]}>
                        <TextInput
                            style={[styleBase.grow]}
                            onChangeText={this.handleChangeText}
                            value={this.state.searchText}
                            placeholder="TÌM KIẾM"/>
                    </View>
                    <Ionicons name="ios-search-outline" style={[styleBase.text4, {fontSize: 30}]}/>
                </View>
                <View style={[styleBase.p_md_vertical,
                    styleBase.row,
                    styleBase.p_md_horizontal, styleBase.bgE5]}>
                    {this.props.customLeftColumn()}
                    {
                        fields.map((field, index) => {
                            return (
                                <View key={index} style={[{flex: field.columnWidth}]}>
                                    <Text>
                                        {field.name.toUpperCase()}
                                    </Text>
                                </View>
                            )
                        })
                    }
                    {this.props.customRightColumn()}
                </View>
                <View style={[styleBase.container]}>
                    {this.props.renderList()}
                </View>
            </View>
        )
    }
}

Table.propTypes = {
    fields: PropTypes.array,
    customRightColumn: PropTypes.func,
    customLeftColumn: PropTypes.func,
    onSearchText: PropTypes.func,
    renderList: PropTypes.func
};

/**
 * Field {
 *      name
 *      columnWidth
 * }
 * @type {{fields: Array}}
 */
Table.defaultProps = {
    fields: [],
    customRightColumn: () => {},
    customLeftColumn: () => {},
    onSearchText: () => {},
    renderList: () => null
};

export default Table;