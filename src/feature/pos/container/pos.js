import React from "react";
import {ListView, Spinner, View, GridRow} from "@shoutem/ui";
import NoData from "../../../component/noData/noData";
import {POS_MANAGEMENT} from "../action/posAction";
import POSItem from "../component/posItem";
import {Dimensions, StyleSheet, InteractionManager} from "react-native";
import styleBase from "../../../styles/base";
import {connect} from "react-redux";

class POS extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.pos,
            loading: false,
            listViewLoading: false
        }
    }

    static propTypes = {};

    static defaultProps = {};

    async componentDidMount () {
       try {
           await POS_MANAGEMENT.FETCH_ALL_POS();
       } catch (e) {
           console.warn(e.message);
       }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pos: nextProps.pos,
            loading: false,
            listViewLoading: false
        })
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
            await POS_MANAGEMENT.FETCH_ALL_POS();
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
            return <NoData/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        pos: state.pos.all
    }
}

export default connect(mapStateToProps)(POS)