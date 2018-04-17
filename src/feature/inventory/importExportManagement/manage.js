import React from "react";
import PropTypes from "prop-types";
import Table from "../../../component/table/table";
import {inventoryHistoryFields} from "../../../utils/tableFields";
import {getInentoryHistory} from "./action";
import {getCurrentUser} from "../../login/action/login";
import NoData from "../../../component/noData/noData";
import styleBase from "../../../styles/base";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import List from "../../../component/list/list";
import {openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import HistoryItem from "./item";
import {equals} from "../../../utils/utils";
import {INVENTORY} from "../action/index";
import {connect} from "react-redux";
import ErrorBoundary from "../../../component/errorBoundary/errorBoundary";

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.fields = inventoryHistoryFields.map(item => {
            item.name = item.name.replace("$type", '');
            return item;
        });
        this.state = {
            currentUser: null,
            type: '',
            inventoryHistory: [],
            loading: true
        };

        this.renderList = this.renderList.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.handleLoadInventoryHistory = this.handleLoadInventoryHistory.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(this.state, nextState)
    }

    async componentDidMount() {
        let history = await this.handleLoadInventoryHistory(this.props.type)
        this.setState({
            inventoryHistory: history,
            loading: false,
            type: this.props.type
        })
    }

    /**
     * Handle
     * @returns {Promise.<void>}
     */

    async handleLoadInventoryHistory (type) {
        try {
            return await INVENTORY.FETCH_HISTORY(type);
        } catch (e) {
            console.warn(e.message);
        }
        return [];
    }

    handleClickItem(item) {
        let name = item.type === "import" ? "NHẬP" : "XUẤT";
        openPopup();
        renderContent(
            <ErrorBoundary fallback={
                <View style={[styleBase.center, styleBase.container]}>
                    <NoData/>
                </View>
            }>
                <HistoryItem data={item.products} title={`SẢN PHẨM ${name} KHO`}/>
            </ErrorBoundary>
        )
    }

    /**
     * Renderer
     * @param item
     * @param index
     * @returns {XML}
     */

    renderItem(item, index) {
        let data = item;
        return (
            <TouchableOpacity onPress={() => this.handleClickItem(data)}>
                <View style={[{height: 65},
                          styleBase.alignCenter, styleBase.row, styleBase.spaceBetween,
                          styleBase.p_md_horizontal]}>
                    {
                        this.fields.map((item, i) => {
                            return (
                                <View key={`FIELD${i}`} style={{flex: item.columnWidth}}>
                                    {item.field === "STT" ?
                                        <Text>
                                            {+index + 1}
                                        </Text>
                                        :
                                        <Text>
                                            {item.handle(data[item.field])}
                                        </Text>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </TouchableOpacity>
        )
    }

    renderList() {
        return <List
            keyExtractor={(item, index) => item._id}
            dataSources={this.state.inventoryHistory}
            extraData={this.state}
            renderItem={this.renderItem}
        />
    }

    render() {
        let { loading, inventoryHistory } = this.state;
        let renderManagement = (
            <ActivityIndicator size="large"/>
        );

        if(!loading) {
            if(inventoryHistory.length){
                renderManagement = (
                    <Table fields={this.fields}
                           renderList={this.renderList}
                    />
                )
            } else {
                renderManagement = <NoData/>
            }
        }
        return renderManagement;
    }
}

Management.propTypes = {
    type: PropTypes.string
};

Management.defaultProps = {
    type: ""
};

export default Management;