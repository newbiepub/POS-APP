import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Platform} from "react-native";
import { View } from "@shoutem/ui";
import {OptimizedFlatList} from "react-native-optimized-flatlist";
import styleBase from "../../styles/base";

class List extends React.Component {
    constructor(props) {
        super(props);
        this._scrollRef = null;
        this._backTopTop = null;
        this.currentOffset = 0;
        this.isReached = true;
        this.state = {
            refreshing: false
        };

        this.onRefresh = this.onEndReach.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onScroll  = this.onScroll.bind(this);
    }

    async onScroll () {
        try {
            if(this.isReached) {
                this.isReached = false;
            }
        } catch (e) {
            throw e;
        }
    }

    async onEndReach() {
        try {
            if(this.isReached) {
                this.isReached = false;
                await this.props.onEndReach();
                this.isReached = true
            }
        } catch (e) {
            throw e;
        }
    }

    async onRefresh () {
        try {
            this.setState({refreshing: true});
            await this.props.onRefresh();
            this.setState({refreshing: false});
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <OptimizedFlatList
                ref={(ref) => {
                    if (this._scrollRef == undefined) {
                        this._scrollRef = ref;
                    }
                }}
                style={StyleSheet.flatten([...this.props.styles])}
                data={[...this.props.dataSources]}
                extraData={this.props.extraData}
                onEndReached={this.onEndReach}
                removeClippedSubviews={Platform.OS === "android"}
                keyExtractor={this.props.keyExtractor}
                disableVirtualization={this.props.disableVirtualization}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                onScroll={this.onScroll}
                renderItem={({item, index}) => this.props.renderItem(item, index)}
                numColumns={this.props.numColumns}
                ListHeaderComponent={this.props.renderHeader}
            />
        )
    }
}

List.propTypes = {
    dataSources: PropTypes.array,
    extraData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    onEndReach: PropTypes.func,
    disableVirtualization: PropTypes.bool,
    onRefresh: PropTypes.func,
    renderItem: PropTypes.func,
    numColumns: PropTypes.number,
    renderHeader: PropTypes.func,
    keyExtractor: PropTypes.func,
    styles: PropTypes.array
};

List.defaultProps = {
    dataSources: [],
    disableVirtualization: false,
    onRefresh: () => {},
    extraData: [],
    renderItem: () => {},
    onEndReach: () => {},
    renderHeader: () => null,
    keyExtractor: (item, index) => {
        return index;
    },
    styles: [],
    numColumns: 1
};

export default List;