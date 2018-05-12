import React from "react";
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import ErrorBoundary from "../../../component/errorBoundary/errorBoundary";
import NavBar from "../../../component/navbar/navbar";
import styleBase from "../../../styles/base";
import ListLog from "./components/listLog";

class ActivityLoggerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.renderCenterComponent = this.renderCenterComponent.bind(this)
    }

    renderCenterComponent() {
        return (
           <View>
               <Text style={[styleBase.title, styleBase.fontRubik]}>
                   {this.props.title.toUpperCase()}
               </Text>
           </View>
        )
    }

    render() {
        return (
            <ErrorBoundary>
                <View style={[styleBase.container, styleBase.bgWhite]}>
                    <NavBar navigator={this.props.navigator}
                            renderCenterComponent={this.renderCenterComponent}
                    />
                    <ListLog/>
                </View>
            </ErrorBoundary>
        )
    }
}

ActivityLoggerContainer.propTypes = {
    title: PropTypes.string
};

ActivityLoggerContainer.defaultProps = {
    title: ''
};

export default ActivityLoggerContainer;