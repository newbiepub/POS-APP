import React from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-native-modal-datetime-picker";
import { View, TouchableOpacity, Text, InteractionManager } from "react-native";
import styleBase from "../../styles/base";

class InputDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false,
            datePicked: null
        }

        this.handleConfirmDate = this.handleConfirmDate.bind(this);
    }

    /**
     * handler
     */

    handleConfirmDate(date) {
        let handle = InteractionManager.createInteractionHandle();
        this.props.onChangeDate(date);
        InteractionManager.clearInteractionHandle(handle);
        InteractionManager.runAfterInteractions(() => {
            this.setState({datePicked: date, datePickerVisible: false})
        })
    }

    /**
     * Renderer
     * @returns {XML}
     */
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.setState({datePickerVisible: true})}
                    style={[styleBase.p_md_horizontal, styleBase.p_md_vertical,
                    styleBase.m_md_vertical, ...this.props.style]}>
                    <Text style={[styleBase.text6]}>
                        {this.state.datePicked != undefined
                            ?
                            this.state.datePicked.toLocaleString()
                            :
                            this.props.placeholder.toUpperCase()
                        }
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                    titleIOS={this.props.placeholder}
                    onCancel={() => this.setState({datePickerVisible: false})}
                    onConfirm={this.handleConfirmDate}
                    confirmTextIOS={'Xác nhận'}
                    isVisible={this.state.datePickerVisible}/>
            </View>
        )
    }
}

InputDatePicker.propTypes = {
    placeholder: PropTypes.string,
    onChangeDate: PropTypes.func
};

InputDatePicker.defaultProps = {
    placeholder: '',
    onChangeDate: () => {}
};

export default InputDatePicker;