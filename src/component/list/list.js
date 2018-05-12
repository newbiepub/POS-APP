import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Platform, FlatList, View, InteractionManager} from "react-native";
import styleBase from "../../styles/base";
import {uuid} from "../../utils/utils";

class List extends React.PureComponent {
    constructor(props) {
        super(props);
        this._scrollRef = null;
        this._backTopTop = null;
        this.currentOffset = 0;
        this.isReached = true;
        this.state = {
            refreshing: false,
            isUpdateList: false
        };

        this.onEndReach = this.onEndReach.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onScroll  = this.onScroll.bind(this);
    }

    async onScroll () {

    }

    onUpdateList() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({isUpdateList: !this.state.isUpdateList});
        })
    }

    async onEndReach() {
        try {
            if(this.isReached) {
                this.isReached = false;
                await this.props.onEndReach();
                this.isReached = true
            }
        } catch (e) {
            console.warn("ERROR - ", e.message)
        }
    }

    async onRefresh () {
        try {
            this.setState({refreshing: true});
            await this.props.onRefresh();
            this.setState({refreshing: false});
        } catch (e) {
            console.warn("ERROR - ", e.message)
        }
    }

    render() {
        return (
            <FlatList
                ref={(ref) => {
                    if (this._scrollRef == undefined) {
                        this._scrollRef = ref;
                    }
                }}
                style={StyleSheet.flatten([...this.props.styles])}
                data={this.props.dataSources}
                extraData={this.state}
                onEndReached={this.onEndReach}
                initialNumToRender={this.props.initialNumToRender}
                getItemLayout={this.props.getItemLayout}
                removeClippedSubviews={this.props.removeClippedSubviews}
                keyExtractor={this.props.keyExtractor}
                disableVirtualization={this.props.disableVirtualization}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                onEndReachedThreshold={this.props.onEndReachedThreshold}
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
    styles: PropTypes.array,
    initialNumToRender: PropTypes.number,
    getItemLayout: PropTypes.func,
    removeClippedSubviews: PropTypes.bool,
    onEndReachedThreshold: PropTypes.number
};

List.defaultProps = {
    dataSources: [],
    disableVirtualization: true,
    removeClippedSubviews: true,
    onEndReachedThreshold: 0.01,
    extraData: [],
    initialNumToRender: 10,
    styles: [],
    numColumns: 1,
    onRefresh: () => {},
    renderItem: () => {},
    onEndReach: () => {},
    renderHeader: () => null,
    keyExtractor: (item, index) => {
        return `LIST_${uuid()}`;
    },
    getItemLayout: (data, index) => (
        {length: 100, offset: 100 * index, index}
    )
};

export default List;