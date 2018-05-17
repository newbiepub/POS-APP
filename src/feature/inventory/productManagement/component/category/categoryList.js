import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text, ActivityIndicator} from "react-native";
import styleBase from "../../../../../styles/base";
import Table from "../../../../../component/table/table";
import {listCategory} from "../../../../../utils/tableFields";
import {INVENTORY} from "../../../action/index";
import { connect } from "react-redux";
import List from "../../../../../component/list/list";
import CategoryListItem from "./categoryItem";
import {openPopup, renderContent} from "../../../../../component/popup/actions/popupAction";
import AddCategory from "./addCategory";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.categories = [];
        this.list = null;
        this.state = {
            loading: true,
            categories: []
        }

        this.renderListItem         = this.renderListItem.bind(this);
        this.handlePressAddCategory = this.handlePressAddCategory.bind(this);
        this.handleSearchCategories = this.handleSearchCategories.bind(this);
        this.handleOnRefresh        = this.handleOnRefresh.bind(this);
    }

    componentDidMount() {
        this.handleFetchCategories();
    }

    /**
     * handlers
     * @returns {Promise.<void>}
     */

    async handleFetchCategories () {
        let user = this.props.user;
        let categories =  await INVENTORY.FETCH_CATEOGRY(user._id);
        this.categories = categories;
        this.setState({categories, loading: false})
    }

    handlePressAddCategory() {
        openPopup();
        renderContent(<AddCategory type='create' handleModifiedCategory={() => this.handleModifiedCategory()}/>)
    }

    handleSearchCategories (searchText) {
        this.setState((state) => {
            if(searchText.length > 0) {
                state.categories = state.categories.filter(category => new RegExp(searchText).test(category.name));
            } else {
                state.categories = this.categories;
            }
            return state;
        })
    }

    async handleOnRefresh() {
        try {
            await this.handleFetchCategories();
        } catch (e) {
            alert('ĐÃ CÓ LỖI XẢY RA')
        }
    }

    async handleModifiedCategory() {
        let categories = await INVENTORY.FETCH_CATEOGRY(this.props.user._id);
        this.setState({categories}, () => {
            this.list.onUpdateList();
        });
    }

    // renderer

    renderListItem (item, index) {
        return <CategoryListItem item={item} index={index} handleModifiedCategory={() => this.handleModifiedCategory()} />
    }

    renderList() {
        return <List disableVirtualization={false}
                     ref={ref => this.list = ref}
                     initialNumToRender={10}
                     onRefresh={this.handleOnRefresh}
                     renderItem={this.renderListItem}
                     dataSources={this.state.categories}/>
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.state.loading ?
                        <View style={[styleBase.center]}>
                            <ActivityIndicator/>
                        </View>
                        :
                        <React.Fragment>
                            <View style={[styleBase.grow]}>
                                <Table fields={listCategory}
                                       renderList={() => this.renderList()}
                                       onSearchText={this.handleSearchCategories}
                                />
                            </View>
                            <AddCategoryButton onPress={this.handlePressAddCategory}/>
                        </React.Fragment>
                }
            </View>
        )
    }
}

const AddCategoryButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[
            styleBase.p_md_horizontal, styleBase.p_md_vertical,
            styleBase.row, styleBase.center, styleBase.bgBlack
        ]}>
            <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                THÊM LOẠI HÀNG
            </Text>
        </TouchableOpacity>
    )
}

CategoryList.propTypes = {};

CategoryList.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps) (CategoryList);