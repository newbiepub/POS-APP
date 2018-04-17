import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator, SafeAreaView, TouchableOpacity, Text} from "react-native";
import styleBase from "../../../styles/base";
import {AfterInteractions} from "react-native-interactions";
import NavBar from "../../../component/navbar/navbar";
import {connect} from "react-redux";
import {allPOS} from "../../../selector/pos";
import Table from "../../../component/table/table";
import {listPOSFields} from "../../../utils/tableFields";
import List from "../../../component/list/list";
import {objectValue, pull} from "../../../utils/utils";

class ListPos extends React.PureComponent {
    constructor(props) {
        super(props);
        this.listComponent = null;

        this.state = {
            check: false,
            checkList: []
        }

        this.handlePressItem = this.handlePressItem.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    /**
     * Component life cycle
     */
    componentDidMount () {

    }

    /**
     * Handler
     */

    handlePressItem (item) {
        return () => {
            this.setState(state => {
                if(state.checkList.includes(item._id)) {
                    pull(state.checkList, item._id);
                } else {
                    state.checkList = [...state.checkList, item._id];
                }

                this.listComponent.onUpdateList();
                return {
                    ...state,
                    checkList: [...state.checkList]
                };
            });
        }
    }

    /**
     * Renderer
     * @returns {XML}
     */

    renderListItem (item, index) {
        return (
            <TouchableOpacity onPress={this.handlePressItem(item)}>
                <View style={[{height: 65},
                    styleBase.alignCenter, styleBase.row,
                    styleBase.p_md_horizontal]}>
                    {
                        listPOSFields.map((field, i) => {
                            return (
                                <View key={`FIELD${i}`} style={[{flex: field.columnWidth}]}>
                                    {field.field === "STT" ?
                                        <Text style={[styleBase.normalText]}>
                                            {+index + 1}
                                        </Text>
                                        :
                                        <Text style={[styleBase.normalText]}>
                                            {objectValue(item, field.field)}
                                        </Text>
                                    }
                                </View>
                            )
                        })
                    }
                    {
                        this.state.checkList.includes(item._id) &&
                        <View style={[{flex: 0.1}, styleBase.center]}>
                            <Text style={[styleBase.normalText]}>
                                Checked
                            </Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    renderList () {
        return (
            <List
                ref={list => this.listComponent = list}
                keyExtractor={(item, index) => item._id}
                dataSources={this.props.pos}
                extraData={this.state}
                renderItem={(item, index) => this.renderListItem(item, index)}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container ,styleBase.bgWhite]}>
                <AfterInteractions placeholder={(<ActivityIndicator size="large"/>)}>
                    <NavBar title={this.props.title} navigator={this.props.navigator}/>
                    <Table fields={listPOSFields}
                           renderList={this.renderList}
                    />
                </AfterInteractions>
            </SafeAreaView>
        )
    }
}

ListPos.propTypes = {};

ListPos.defaultProps = {};

const mapStateToProps = state => {
    return {
        pos: allPOS(state)
    }
}

export default connect(mapStateToProps) (ListPos);