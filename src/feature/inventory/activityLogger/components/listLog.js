import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator} from "react-native";
import {connect} from 'react-redux';
import styleBase from "../../../../styles/base";
import ACTIVITY_LOGGER from "../action/index";
import NoData from "../../../../component/noData/noData";
import List from "../../../../component/list/list";
import ListLogItem from "./item";

class ListLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.handleFetchData();
    }

    async handleFetchData() {
        try {
            await ACTIVITY_LOGGER.FETCH_LOG();
        } catch (e) {}
        this.setState({loading:false})
    }

    renderItem(item, index) {
        return <ListLogItem item={item} index={index}/>
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>
                {this.state.loading && !this.props.activity.length &&
                <View style={[styleBase.center]}>
                    <ActivityIndicator size="large"/>
                </View>
                }
                {
                    !this.state.loading && !this.props.activity.length &&
                        <NoData/>
                }
                {
                    this.props.activity.length > 0 &&
                        <List
                            renderItem={this.renderItem}
                            dataSources={this.props.activity}/>
                }
            </View>
        )
    }
}

ListLog.propTypes = {};

ListLog.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        activity: state.inventory.activity
    }
}

export default connect(mapStateToProps)(ListLog);