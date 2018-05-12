import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator} from "react-native";
import {connect} from 'react-redux';
import styleBase from "../../../../styles/base";
import ACTIVITY_LOGGER from "../action/index";
import NoData from "../../../../component/noData/noData";

class ListLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
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

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>
                {this.state.loading &&
                <View style={[styleBase.center]}>

                    <ActivityIndicator size="large"/>

                </View>
                }
                {
                    !this.state.loading && !this.props.activity.length &&
                        <NoData/>
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