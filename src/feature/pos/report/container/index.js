import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator} from "react-native";
import styleBase from "../../../../styles/base";
import {POS_MANAGEMENT} from "../../action/posAction";
import {reports} from "../../../../selector/reportEmployee";
import {connect} from "react-redux";
import ListReport from "../component/list";

class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            transactions: props.transactions[props.user._id] || []
        }
    }

    componentDidMount() {
        this.handleFetchTransaction();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            transactions: nextProps.transactions[nextProps.user._id] || []
        })
    }

    async handleFetchTransaction() {
        try {
            let {user} = this.props;
            await POS_MANAGEMENT.FETCH_TRANSACTION(user._id);
            this.setState({
                loading: false
            })
        }
        catch(e) {
            console.warn("error - ", e.message);
            alert('ĐÃ CÓ LỖI XẢY RA');
        }
    }

    render() {
        let {user} = this.props;
        console.warn(JSON.stringify(this.state.transactions, null, 4));
        return (
            <View style={[styleBase.container]}>
                {
                    this.state.loading &&
                    <View style={[styleBase.center]}>
                        <ActivityIndicator size="large"/>
                    </View>
                }
                {!this.state.loading && this.state.transactions.length > 0 &&
                    <ListReport dataSources={this.state.transactions}/>
                }
            </View>
        )
    }
}

ReportContainer.propTypes = {};

ReportContainer.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        transactions: reports(state)
    }
}

export default connect(mapStateToProps) (ReportContainer);