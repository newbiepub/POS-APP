import React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import styleBase from "../../styles/base";
import CommingSoon from "../commingSoon/commingSoon";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.hasError !== nextProps.hasError;
    }

    componentDidCatch(err, info) {
        this.setState({hasError: true});
        console.warn("ERROR - ", info);
    }

    render() {
        if(this.state.hasError) {
            return this.props.fallback ? this.props.fallback : <CommingSoon/>
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    fallback: PropTypes.node
};

ErrorBoundary.defaultProps = {
    fallback: null
};

export default ErrorBoundary;