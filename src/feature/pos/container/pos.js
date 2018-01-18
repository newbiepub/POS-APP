import React from "react";
import PropTypes from "prop-types";
import {View, Text, Spinner} from "@shoutem/ui";
import NoData from "../../../component/noData/noData";
import {graphql} from "react-apollo";
import {getAllPOS} from "../action/posAction";

class POS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: [],
            loading: false
        }
    }

    static propTypes = {};

    static defaultProps = {};

    componentWillReceiveProps(nextProps) {
        try {
            let {data} = nextProps;

            if ((data.getAllPOS == undefined || !data.getAllPOS.length) && !data.loading) {
                return this.setState({pos: "NoData", loading: false});
            }

            this.setState({pos: data.getAllPOS, loading: data.loading});
        }
        catch (e) {
            console.warn("error - componentWillReceiveProps - POS")
        }
    }

    render() {
        return (
            <View styleName="lg-gutter-vertical md-gutter-horizontal flexible">
                {
                    (this.state.loading && !this.state.pos.length) &&
                    <Spinner
                        style={{color: "#000", size: "large"}}
                    />
                }
                {

                }
                {
                    (!this.state.loading && this.state.pos === "NoData") &&
                    <NoData/>
                }
            </View>
        )
    }
}

export default graphql(getAllPOS, {
    options: {
        fetchPolicy: "cache-and-network"
    }
})(POS)