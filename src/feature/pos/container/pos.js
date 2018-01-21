import React from "react";
import {ListView, Spinner, View, GridRow} from "@shoutem/ui";
import NoData from "../../../component/noData/noData";
import {graphql} from "react-apollo";
import {getAllPOS} from "../action/posAction";
import POSItem from "../component/posItem";
import {Dimensions, StyleSheet} from "react-native";
import styleBase from "../../../styles/base";
import * as _ from "lodash";

class POS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: [],
            loading: false,
            listViewLoading: false
        }
    }

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    componentWillReceiveProps(nextProps) {
        try {
            if(nextProps.data.error) {
                throw new Error(nextProps.data.error.message);
            }
            let data = nextProps.data || {getAllPOS: []};
            if (!data.getAllPOS.length && !data.loading) {
                return this.setState({pos: "NoData", loading: false});
            }

            return this.setState({pos: data.getAllPOS, loading: data.loading});
        }
        catch (e) {
            console.log(e);
            console.warn("error - componentWillReceiveProps - POS")
        }
    }

    renderRow(rowData, sectionId, index, numberOfRows) {

        const cellViews = rowData.map((item, i) => {
            return <POSItem key={i} {...this.props} item={item}/>
        });
        return <GridRow key={index} columns={numberOfRows}>
            {cellViews}
        </GridRow>

    }

    async onRefresh() {
        try {
            this.setState({listViewLoading: true});
            await this.props.data.refetch();
            this.setState({listViewLoading: false});
        }
        catch (e) {
            console.warn("error - onRefresh")
        }
    }

    getColumnSpan() {
        return 1;
    }

    getNumberOfCols() {
        let screenWidth = Dimensions.get("window").width;
        if (screenWidth < 1024 && screenWidth >= 768) return 3;
        else if (screenWidth >= 1024) return 4;
        else return 1;
    }

    render() {
        try {
            let getCol = 4,
                numberOfCols = this.getNumberOfCols(),
                groupData = [];

            if (this.state.pos && this.state.pos.length) {
                groupData = GridRow.groupByRows(this.state.pos, numberOfCols, this.getColumnSpan);
            }

            return (
                <View styleName="lg-gutter-vertical md-gutter-horizontal flexible">
                    {
                        (this.state.loading && (this.state.pos == undefined || !this.state.pos.length)) &&
                        <Spinner
                            style={{color: "#000", size: "large"}}
                        />
                    }
                    {
                        (this.state.pos.length > 0 && this.state.pos !== "NoData") &&
                        <ListView
                            style={{
                                listContent: StyleSheet.flatten([styleBase.bgWhite])
                            }}
                            onRefresh={this.onRefresh.bind(this)}
                            loading={this.state.listViewLoading}
                            data={groupData}
                            renderRow={(rowData, sectionId, index) => this.renderRow(rowData, sectionId, index, numberOfCols)}
                        />
                    }
                    {
                        (!this.state.loading && this.state.pos === "NoData") &&
                        <NoData/>
                    }
                </View>
            )
        }
        catch (e) {
            console.warn("error - render POS");
            return <View/>
        }
    }
}

export default graphql(getAllPOS, {
    options: {
        fetchPolicy: "cache-and-network"
    }
})(POS)