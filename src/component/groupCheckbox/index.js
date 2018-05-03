import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../styles/base";
import CheckBoxItem from "./checkbox/index";

class GroupCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: props.options[0]
        }
    }

    /**
     * Handler
     */

    handlePickOption (option) {
        this.setState({currentItem: option})
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        return (
            <React.Fragment>
                {this.props.options.map((item, index) => {
                    return <CheckBoxItem
                        option={item}
                        handlePickOption={(option) => this.handlePickOption(option)}
                        isActive={this.state.currentItem.value === item.value}
                        key={`CHECKBOX_${index}`}/>
                })}
            </React.Fragment>
        )
    }
}

GroupCheckbox.propTypes = {
    options: PropTypes.array
};

GroupCheckbox.defaultProps = {
    options: []
};

export default GroupCheckbox;