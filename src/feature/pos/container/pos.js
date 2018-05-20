import React from "react";
import NoData from "../../../component/noData/noData";
import {POS_MANAGEMENT} from "../action/posAction";
import POSItem from "../component/posItem";
import {Dimensions, StyleSheet, InteractionManager, View, ActivityIndicator} from "react-native";
import styleBase from "../../../styles/base";
import {connect} from "react-redux";
import List from "../../../component/list/list";

class POS extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.pos,
            loading: true,
            listViewLoading: false
        }

        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
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
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                pos: nextProps.pos,
                loading: false,
                listViewLoading: false
            })
        })
    }

    renderRow(item, index) {
        return <POSItem key={index} {...this.props} item={item} navigator={this.props.navigator}/>
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

    getNumberOfCols() {
        let screenWidth = Dimensions.get("window").width;
        if (screenWidth < 1024 && screenWidth >= 768) return 3;
        else if (screenWidth >= 1024) return 4;
        else return 1;
    }

    render() {
        try {
            return (
                <View style={[styleBase.container]}>
                    {
                        (this.state.loading && (this.state.pos == undefined || !this.state.pos.length)) &&
                        <View style={[styleBase.container, styleBase.center]}>
                            <ActivityIndicator size="large"/>
                        </View>
                    }
                    {
                        (this.state.pos.length > 0 && this.state.pos !== "NoData") &&
                        <View style={[styleBase.m_md_horizontal]}>
                            <List
                                dataSources={this.state.pos}
                                renderItem={this.renderRow}
                                onrefresh={this.onRefresh}
                                onEndReachedThreshold={400}
                                numColumns={this.getNumberOfCols()}
                            />
                        </View>
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
            return <View style={[styleBase.container, styleBase.m_lg_vertical]}>
                <NoData/>
            </View>
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