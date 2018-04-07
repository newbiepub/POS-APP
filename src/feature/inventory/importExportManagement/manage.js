import React from "react";
import PropTypes from "prop-types";
import {View, Spinner, Text, TouchableOpacity} from "@shoutem/ui";
import Table from "../../../component/table/table";
import {inventoryHistoryFields} from "../../../utils/tableFields";
import {getInentoryHistory} from "./action";
import {getCurrentUser} from "../../login/action/login";
import NoData from "../../../component/noData/noData";
import styleBase from "../../../styles/base";
import {StyleSheet} from "react-native";
import List from "../../../component/list/list";
import {closePopup, openPopup, renderContent} from "../../../component/popup/actions/popupAction";
import HistoryItem from "./item";

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.fields = inventoryHistoryFields.map(item => {
            item.name = item.name.replace("$type", '');
            return item;
        });
        this.state = {
            currentUser: null,
            inventoryHistory: [],
            loading: true
        };

        this.renderList = this.renderList.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.handleLoadInventoryHistory = this.handleLoadInventoryHistory.bind(this);
    }

    componentDidMount() {
        this.handleLoadInventoryHistory(this.props.inventoryHistory)
    }

    componentWillReceiveProps (nextProps) {
        this.handleLoadInventoryHistory(nextProps.inventoryHistory)
    }

    handleLoadInventoryHistory (inventoryHistory) {
        let { getUserInventoryHistory = [], loading } = inventoryHistory;
        if(!loading) {
            this.setState({inventoryHistory: getUserInventoryHistory, loading: false})
        }
    }

    handleClickItem(item) {
        let name = item.type === "import" ? "NHẬP" : "XUẤT";
        return () => {
            openPopup();
            renderContent(<HistoryItem data={item.products} title={`SẢN PHẨM ${name} KHO`}/>)
        }
    }

    renderItem(item, index) {
        let data = item;
        return (
            <TouchableOpacity styleName="vertical" onPress={this.handleClickItem(item)}>
                <View styleName="horizontal space-between v-center"
                      style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
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
            <Spinner/>
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