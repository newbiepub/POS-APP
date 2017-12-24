import React from "react";
import {FlatList, View, TouchableWithoutFeedback, TextInput, ScrollView} from "react-native";
import {TextLarge, TextSmall, TextNormal} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import style from '../../style/POS';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewProduct from '../../popup/product/viewProduct';
import {connect} from "react-redux";
import {openPopup, renderPopup} from '../../../action/popup';
import {numberwithThousandsSeparator} from '../../reusable/function';

class Library extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listLibrary: [{id: 'list', name: 'Danh sách'}, {id: 'product', name: 'Mặt hàng'}, {
                id: 'category', name: 'Loại hàng'
            }, {id: 'discount', name: 'Khuyến mãi'}, {id: 'previewCategory', name: ''}, {
                id: 'previewDiscount',
                name: ''
            }],
            currentViewLibrary: {id: 'list', name: 'Danh sách'},
            searchText: '',
        }
    }

    getDataSearch() {
        try {
            let data = [];
            if (this.state.searchText !== '') {
                if (this.state.currentViewLibrary.id === 'list' || this.state.currentViewLibrary.id === this.state.listLibrary[1].id) {
                    for (item of this.props.product) {
                        if (item.hasOwnProperty("name") && item.name.includes(this.state.searchText)) {
                            data.push(item)
                        }
                    }
                }

                if (this.state.currentViewLibrary.id === this.state.listLibrary[3].id) {
                    for (item of this.props.discount) {
                        if (item.hasOwnProperty("name") && item.name.includes(this.state.searchText)) {
                            data.push(item)
                        }
                    }
                }
                if (this.state.currentViewLibrary.id === this.state.listLibrary[2].id) {
                    for (item of this.props.category) {
                        if (item.hasOwnProperty("name") && item.name.includes(this.state.searchText)) {
                            data.push(item)
                        }
                    }
                }
            }
            return data;
        } catch (e) {
            return [];
            console.warn(e)
        }


    }

    getProductWithCategory() {
        let data = [];
        for (item of this.props.product) {
            if (this.state.currentViewLibrary.hasOwnProperty("data") && item.categoryId === this.state.currentViewLibrary.data) {
                data.push(item)
            }
        }
        return data
    }

    getProductWithDiscount() {
        let data = [];
        for (item of this.state.currentViewLibrary.data) {
            for (product of this.props.product) {
                if (item._id === product._id) {
                    data.push(product);
                    break;
                }
            }
        }
        return data
    }

    componentWillMount() {
        this.getDataSearch();
    }

    render() {
        return (
            <View style={[styleBase.background4, styleHome.container, styleHome.box]}>
                {/*------Title------------*/}
                <TouchableWithoutFeedback onPress={() => {
                    if (this.state.currentViewLibrary.id === this.state.listLibrary[4].id) {
                        this.setState({currentViewLibrary: this.state.listLibrary[2]})
                    } else if (this.state.currentViewLibrary.id === this.state.listLibrary[5].id) {
                        this.setState({currentViewLibrary: this.state.listLibrary[3]})
                    } else {
                        this.setState({currentViewLibrary: this.state.listLibrary[0]})
                    }

                }}>
                    <View style={styleHome.titleBar}>

                        {
                            this.state.currentViewLibrary.id !== this.state.listLibrary[0].id &&
                            <EvilIcons name="arrow-left"
                                       style={[styleHome.titleBarIconBack]}/>
                        }

                        <TextLarge>
                            {this.state.currentViewLibrary.name}
                        </TextLarge>


                    </View>
                </TouchableWithoutFeedback>
                <View style={{flex: 1}}>
                    {/*------Search------------*/}

                    <View style={styleHome.itemBar}>
                        <View style={[styleHome.itemBarIcon, styleBase.background4]}>
                            <EvilIcons name="search" style={[styleBase.vector26]}/>
                        </View>
                        <View style={[styleHome.itemBarTitle]}>
                            <TextInput value={this.state.searchText} placeholder={"Tìm kiếm ..."}
                                       onChangeText={(text) => {
                                           this.setState({searchText: text})
                                       }} style={[styleBase.font14, {flex: 1}]}/>
                            {
                                this.state.searchText !== '' &&
                                <TouchableWithoutFeedback onPress={() => this.setState({searchText: ''})}>
                                    <EvilIcons name="close" style={[styleBase.vector26]}/>
                                </TouchableWithoutFeedback>
                            }
                        </View>
                    </View>

                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[0].id &&
                        (
                            <LibraryHome instant={this} data={this.getDataSearch()}
                                         openPopup={() => this.props.openPopup()}
                                         renderPopup={(item) => this.props.renderPopup(item)}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[1].id &&
                        (
                            <LibraryItems instant={this}
                                          openPopup={() => this.props.openPopup()}
                                          renderPopup={(item) => this.props.renderPopup(item)}
                                          data={this.state.searchText === '' ? this.props.product : this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[2].id &&
                        (
                            <LibraryCategory instant={this}
                                             data={this.state.searchText === '' ? this.props.category : this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[4].id &&
                        (
                            <LibraryItems instant={this}
                                          openPopup={() => this.props.openPopup()}
                                          renderPopup={(item) => this.props.renderPopup(item)}
                                          data={this.state.searchText === '' ? this.getProductWithCategory() : this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[5].id &&
                        (
                            <LibraryItems instant={this}
                                          openPopup={() => this.props.openPopup()}
                                          renderPopup={(item) => this.props.renderPopup(item)}
                                          data={this.state.searchText === '' ? this.getProductWithDiscount() : this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary.id === this.state.listLibrary[3].id &&
                        (
                            <LibraryDiscount instant={this}
                                             data={this.state.searchText === '' ? this.props.discount : this.getDataSearch()}/>
                        )
                    }
                </View>
            </View>
        )
    }
}

class LibraryHome extends React.PureComponent {

    changeView(view) {
        let instant = this.props.instant;
        instant.setState({
            currentViewLibrary: view
        })

    }


    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.props.instant.state.searchText === "" ?
                        <View>
                            {/*------Items------------*/}
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView(this.props.instant.state.listLibrary[1])
                            }}>
                                <View style={styleHome.itemBar}>
                                    <View style={styleHome.itemBarIcon}>
                                        <EvilIcons name="archive" style={[styleBase.vector26]}/>
                                    </View>
                                    <View style={styleHome.itemBarTitle}>
                                        <TextSmall style={{flex: 1}}>
                                            Mặt hàng
                                        </TextSmall>
                                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*------category------------*/}
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView(this.props.instant.state.listLibrary[2])
                            }}>
                                <View style={styleHome.itemBar}>
                                    <View style={styleHome.itemBarIcon}>
                                        <EvilIcons name="credit-card"
                                                   style={styleBase.vector26}/>
                                    </View>
                                    <View style={[styleHome.itemBarTitle]}>
                                        <TextSmall style={[{flex: 1}]}>
                                            Loại hàng
                                        </TextSmall>
                                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*------discount------------*/}
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView(this.props.instant.state.listLibrary[3])
                            }}>
                                <View style={styleHome.itemBar}>
                                    <View style={styleHome.itemBarIcon}>
                                        <EvilIcons name="tag"
                                                   style={styleBase.vector26}/>
                                    </View>
                                    <View style={[styleHome.itemBarTitle]}>
                                        <TextSmall style={[{flex: 1}]}>
                                            Khuyến mãi
                                        </TextSmall>
                                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> :
                        <LibraryItems data={this.props.data} openPopup={() => this.props.openPopup()}
                                      renderPopup={(item) => this.props.renderPopup(item)}/>
                }

            </View>
        )
    }
}


class LibraryItems extends React.PureComponent {

    onPressItem(product) {
        this.props.renderPopup(
            <ViewProduct productData={product}/>
        );
        this.props.openPopup();
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.onPressItem(item)}>
            <View style={[styleHome.itemBar]}>
                <View style={[styleHome.itemBarIcon]}>
                    <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
                </View>
                <View style={[styleHome.itemBarTitle]}>
                    <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                    <TextSmall> {item.price.length > 1 ? item.price.length + " giá" : numberwithThousandsSeparator(item.price[0].price) + "đ"}</TextSmall>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {


        return (
            <View style={{flex: 1}}>
                {/*------Items------------*/}
                {
                    this.props.data.length > 0 && this.props.data !== undefined ?
                        <FlatList
                            data={this.props.data}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this._renderItem}
                        /> :
                        <NotFound/>
                }


            </View>
        )
    }
}


class LibraryCategory extends React.PureComponent {
    onPress(item) {

        this.props.instant.setState({
            currentViewLibrary: {
                id: this.props.instant.state.listLibrary[4].id,
                name: item.name,
                data: item._id
            }
        })
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
            <View style={[styleHome.categoryBar]}>
                <TextNormal style={{flex: 1}}>{item.name}</TextNormal>
                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {


        return (
            <View style={{flex: 1}}>
                {/*------discount------------*/}
                {
                    this.props.data.length > 0 && this.props.data !== undefined ?
                        <FlatList
                            data={this.props.data}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this._renderItem}
                        /> :
                        <NotFound/>
                }


            </View>
        )
    }
}
;

class LibraryDiscount extends React.PureComponent {

    onPressItem(item) {
        this.props.instant.setState({
            currentViewLibrary: {
                id: this.props.instant.state.listLibrary[5].id,
                name: item.name,
                data: item.productItems
            }
        })
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.onPressItem(item)}>
            <View style={[styleHome.itemBar]}>
                <View style={[styleHome.itemBarIcon]}>
                    <Ionicons name={"ios-pricetags-outline"} style={styleBase.vector18}/>
                </View>
                <View style={[styleHome.itemBarTitle]}>
                    <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                    <TextSmall> {numberwithThousandsSeparator(item.value)}{item.type === 'percent' ? "%" : "đ"}</TextSmall>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {


        return (
            <View style={{flex: 1}}>
                {/*------discount------------*/}
                {
                    this.props.data.length > 0 && this.props.data !== undefined ?
                        <FlatList
                            data={this.props.data}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this._renderItem}
                        /> :
                        <NotFound/>
                }


            </View>
        )
    }
}


class NotFound extends React.PureComponent {

    render() {

        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <EvilIcons name="search"
                           style={[styleBase.vector100,]}/>
                <TextLarge>Không tìm thấy kết quả</TextLarge>
            </View>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        category: state.product.category,
        discount: state.product.discount,
        product: state.product.allProduct
    }
}
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStatetoProps, mapDispatchToProps)(Library);