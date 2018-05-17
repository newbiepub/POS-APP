import React from "react";
import PropTypes from "prop-types";
import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
    ActivityIndicator,
    InteractionManager
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import AddCategoryForm from "./addCategoryForm";
import { connect } from 'react-redux';
import {categoryData} from "../../../../../selector/category";
import {INVENTORY} from "../../../action/index";

const modalStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmitting: false
        }
        this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
    }

    async handleSubmitCategory() {
        let { name, products, categoryId = '', user } = this.props;

        // validator
        if(!name.length) alert('Tên loại bắt buộc');

        try {
            this.setState({onSubmitting: true})
            if(this.props.type === 'create') {
                await this.handleCreateCategory(name, '', products);
            } else {
                await this.handleUpdateCategory(categoryId, name, products);
            }
            // Update list
            this.props.handleModifiedCategory();
            await INVENTORY.FETCH_USER_PRODUCT(user._id, 'company')
            InteractionManager.runAfterInteractions(closePopup)
        } catch (e) {
            console.warn('error = ', e.message);
            alert('ĐÃ CÓ LỖI XẢY RA');
            this.setState({onSubmitting: false})
        }
    }

    async handleCreateCategory (name, description, products) {
        try {
            await INVENTORY.CREATE_CATEGORY(name, description, products);
        } catch (e) {
            throw e;
        }
    }

    async handleUpdateCategory (categoryId, name, products) {
        try {
            await INVENTORY.UPDATE_CATEGORY(categoryId, name, products);
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[modalStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader
                        type={this.props.type}
                        onSubmitting={this.state.onSubmitting}
                        onSubmit={this.handleSubmitCategory}/>
                    <AddCategoryForm/>
                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    let createStatus = props.type === 'create';

    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween, {
            height: 65, padding: 0
        }]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title, styleBase.p_md_horizontal, styleBase.p_md_vertical]}>
                    {createStatus ? `THÊM LOẠI HÀNG` : 'CẬP NHẬT LOẠI HÀNG'}
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.onSubmit}
                style={[styleBase.p_md_horizontal, styleBase.bgBlue,
                styleBase.p_md_vertical, styleBase.center, styleBase.row]}>
                { props.onSubmitting
                    ?
                    <View style={[styleBase.center]}>
                        <ActivityIndicator color="#fff"/>
                    </View>
                    :
                    <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                        {createStatus ? 'THÊM' : 'CẬP NHẬT'}
                    </Text>
                }
            </TouchableOpacity>
        </View>
    )
}


AddCategory.propTypes = {
    type: PropTypes.string,
    categoryId: PropTypes.string,
    handleModifiedCategory: PropTypes.func
};

AddCategory.defaultProps = {
    type: 'create',
    categoryId: '',
    handleModifiedCategory: () => {}
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        ...categoryData(state)
    }
}

export default connect(mapStateToProps) (AddCategory);