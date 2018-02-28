import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Animated} from "react-native";
import {View} from "@shoutem/ui";

class ProductItemCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(0)
        }
    }

    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    showCollapse() {
        Animated.spring(this.state.height, {
            toValue: 100,
            friction: 7
        }).start();
    }

    closeCollapse() {
        Animated.spring(this.state.height, {
            toValue: 0,
            friction: 7
        }).start();
    }

    render() {
        return (
            <Animated.View style={{backgroundColor: "green", height: this.state.height}}/>
        )
    }
}

export default ProductItemCollapse