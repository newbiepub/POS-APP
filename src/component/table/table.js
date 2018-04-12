import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../styles/base";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            fields: this.props.fields
        }
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
            <View style={StyleSheet.flatten([styleBase.container])}>
                <View styleName="horizontal v-center" style={StyleSheet.flatten([styleBase.p_md_right])}>
                    <View style={StyleSheet.flatten([styleBase.grow])}>
                        <TextInput
                            styleName="full-width"
                            onChangeText={this.handleChangeText}
                            value={this.state.searchText}
                            placeholder="TÌM KIẾM"/>
                    </View>
                    <Icon name="search" style={{color: "#444"}}/>
                </View>
                <View styleName="horizontal"
                      style={StyleSheet.flatten([styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.bgE5])}>
                    {
                        fields.map((field, index) => {
                            return (
                                <View key={index} style={{flex: field.columnWidth}}>
                                    <Caption>
                                        {field.name.toUpperCase()}
                                    </Caption>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={StyleSheet.flatten([styleBase.container])}>
                    {this.props.renderList()}
                </View>
            </View>
        )
    }
}

Table.propTypes = {
    fields: PropTypes.array,
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
    onSearchText: () => {},
    renderList: () => null
};

export default Table;