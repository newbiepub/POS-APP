import React, {Component} from "react";
import {
    ActivityIndicator,
    FlatList,
    InteractionManager,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated
} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';
import CreateDiscount from '../../popup/product/createDiscount';
import styleProduct from "../../style/product";
import * as Animate from "react-native-animatable";
import Swipeable from "../../swipeableList/swipeableList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {numberwithThousandsSeparator} from "../../reusable/function";

const TouchableOpacityAnimate = Animate.createAnimatableComponent(TouchableOpacity);

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{id: 'allProduct', name: 'Mặt hàng'}, {id: 'category', name: 'Loại hàng'}, {
                id: 'discount',
                name: 'Khuyến mãi'
            }],
            searchText: '',
            selected: {id: 'allProduct', name: 'Mặt hàng'},
            loading: true,
        }
    }

    onSelection(id) {
        this.setState({
            selected: id
        })
    }

    previewCategory(category) {
        this.setState({
            selected: {
                id: 'previewCategory',
                name: category.name,
                data: category
            }
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        const productChanged = this.props.allProduct !== nextProps.allProduct;
        const viewChanged = this.state.selected !== nextState.selected;
        const loadingChanged = this.props.loading !== nextProps.loading;
        const searchText = this.state.searchText !== nextState.searchText;
        const discountChanged = this.props.discount !== nextProps.discount;
        return productChanged || viewChanged || loadingChanged || searchText|| discountChanged;
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        try {
            var list = this.state.list.map(data => {
                return (
                    <TouchableWithoutFeedback key={data.id} onPress={() => {
                        this.onSelection(data)
                    }}>
                        <View
                            style={[styleHome.boxPadding, this.state.selected.id === data.id && styleBase.background3, styleBase.centerVertical]}>
                            <TextNormal
                                style={[this.state.selected.id === data.id && styleBase.color4]}>{data.name}</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                )
            });
        }
        catch (e) {
            console.warn(e);
            return <View></View>
        }

        return (
            <View style={[styleBase.container, styleBase.background4, {flexDirection: 'row'}]}>

                {/*----------------leftSide--------------------*/}
                <View style={[styleHome.borderRight, {flex: 3}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextLarge style={[styleBase.color3]}>Mặt hàng</TextLarge>
                    </View>
                    {/*content*/}
                    <View>
                        {list}
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>

                        {
                            this.state.selected.id === 'previewCategory' &&
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({
                                    selected: {id: 'category', name: 'Loại hàng'},
                                })
                            }}>
                                <EvilIcons name="arrow-left"
                                           style={[styleHome.titleBarIconBack]}/>
                            </TouchableWithoutFeedback>
                        }
                        <TextLarge style={[styleBase.color3]}>{this.state.selected.name}</TextLarge>
                    </View>

                    <View style={{flex: 1}}>
                        {/*------Search------------*/}

                        <View style={styleHome.itemBar}>
                            <View style={[styleHome.itemBarIcon, styleBase.background4]}>
                                <EvilIcons name="search" style={[styleBase.vector26]}/>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextInput placeholder={`Tìm kiếm ${this.state.selected.name.toLowerCase()}...`}
                                           onChangeText={(text) => {
                                               this.setState({searchText: text})
                                           }} style={[styleBase.font16, {flex: 1}]}
                                           value={this.state.searchText}
                                />
                                {
                                    this.state.searchText !== '' &&
                                    <TouchableWithoutFeedback onPress={() => this.setState({searchText: ''})}>
                                        <EvilIcons name="close" style={[styleBase.vector26]}/>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        </View>
                        {/*content*/}
                        {
                            this.state.selected.id === 'allProduct' &&
                            <AllProduct
                                {...this.props}
                                allProduct={this.props.allProduct} openPopup={() => this.props.openPopup()}
                                renderPopup={(renderContent) => this.props.renderPopup(renderContent)}
                                loading={this.props.loading}/>
                        }
                        {
                            this.state.selected.id === 'category' &&
                            <Category
                                {...this.props}
                                allProduct={this.props.allProduct} category={this.props.category}
                                openPopup={() => this.props.openPopup()}
                                previewCategory={(category) => {
                                    this.previewCategory(category)
                                }}
                                loading={this.props.loading}
                                renderPopup={(renderContent) => this.props.renderPopup(renderContent)}/>
                        }
                        {
                            this.state.selected.id === 'previewCategory' &&
                            <CategoryPreview
                                {...this.props}
                                category={this.state.selected.data}
                                allProduct={this.props.allProduct} openPopup={() => this.props.openPopup()}
                                renderPopup={(renderContent) => this.props.renderPopup(renderContent)}/>
                        }
                        {
                            this.state.selected.id === 'discount' &&
                            <Discount
                                {...this.props}
                                allDiscount={this.props.discount}/>
                        }


                    </View>
                </View>
            </View>
        )
    }
}

class AllProduct extends React.PureComponent {
    constructor(props) {
        super(props);
        this.listRow = [];
        this.state = {
            deleteVerification: false
        }
    }

    createItem() {
        this.props.renderPopup(<CreateModifyProductPopup/>);
        this.props.openPopup();
    }

    _renderItem = ({item, index}) => <ProductItem {...this.props} item={item} index={index}/>

    render() {
        return (
            <ScrollView style={[styleHome.scrollView]}>
                <TouchableOpacity onPress={this.createItem.bind(this)}
                                  style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center, {marginTop: 20}]}>
                    <TextNormal style={[styleBase.color2]}>Thêm hàng</TextNormal>
                </TouchableOpacity>
                <View style={[styleHome.listItem, styleHome.borderTop,]}>
                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <FlatList
                                data={this.props.allProduct}
                                extraData={this.state}
                                initialNumToRender={15}
                                keyExtractor={(item) => item._id}
                                renderItem={this._renderItem}
                            />
                    }
                </View>
            </ScrollView>
        )
    }
}

class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.swipeableRef = null;
        this.deleteButton = null;
        this.state = {
            deleteVerification: false
        }
    }

    static propTypes = {
        item: React.PropTypes.object,
        index: React.PropTypes.number
    };

    modifyItem() {
        let {item} = this.props;
        this.props.renderPopup(<CreateModifyProductPopup productData={item}/>);
        this.props.openPopup();
    }

    onDeleteItem() {
        let {item, index} = this.props;
        if (this.state.deleteVerification) {
            let {swipeableItem} = this.refs;
            swipeableItem.transition({height: 40}, {height: 0})
        } else {
            InteractionManager.runAfterInteractions(() => {
                if (this.deleteButton != undefined) {
                    this.deleteButton.transitionTo({width: 150}, 400);
                }
                if (this.swipeableRef != undefined) {
                    Animated.spring(this.swipeableRef.state.pan.x, {
                        toValue: -150,
                        duration: 450,
                        useNativeDriver: true
                    }).start();
                }
                this.setState({deleteVerification: true});
            });
        }
        setTimeout(() => {
            this.setState({deleteVerification: false});
            this.deleteButton.transitionTo({width: 70}, 400);
            Animated.spring(this.swipeableRef.state.pan.x, {
                toValue: 0,
                duration: 450,
                useNativeDriver: true
            }).start();
        }, 2000);
    }

    renderRightItem() {
        return (
            <TouchableOpacityAnimate ref={(rowRef) => {
                this.deleteButton = rowRef;
            }}
                                     onPress={this.onDeleteItem.bind(this)}
                                     style={[styleBase.center, styleProduct.swiperDeleteButton]}>
                <Text style={[styleBase.font16, styleBase.textE5]}>
                    {this.state.deleteVerification ? "Xác Nhận" : "Xoá"}
                </Text>
            </TouchableOpacityAnimate>
        )
    }

    render() {
        let {item, index} = this.props;
        return (
            <Animate.View ref="swipeableItem" style={{overflow: "hidden"}}>
                <Swipeable
                    ref={ref => this.swipeableRef = ref}
                    rightButtons={[this.renderRightItem({item, index})]}>
                    <TouchableWithoutFeedback onPress={() => this.modifyItem(item)}>
                        <View style={[styleHome.itemBar]}>
                            <View style={[styleHome.itemBarIcon]}>
                                <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                                <TextSmall> {item.price.length >1 ? item.price.length + " giá" : numberwithThousandsSeparator(item.price[0].price || 0)+"đ"}</TextSmall>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Swipeable>
            </Animate.View>
        )
    }
}

class Category extends React.PureComponent {

    createCategory() {
        this.props.renderPopup(<CreateCategory allProduct={this.props.allProduct}/>);
        this.props.openPopup();
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.props.previewCategory(item)}>
            <View style={[styleHome.categoryBar]}>
                <TextNormal style={{flex: 1}}>{item.name}</TextNormal>
                <EvilIcons name="chevron-right" style={styleBase.vector32}/>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <ScrollView>
                <View style={[styleHome.scrollView]}>
                    <TouchableWithoutFeedback onPress={() => this.createCategory()}>
                        <View style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center, {marginTop: 20}]}>
                            <TextNormal style={[styleBase.color2]}>Thêm loại</TextNormal>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.listItem,]}>
                        {
                            this.props.loading ?
                                <View style={[styleBase.center, {flex: 1}]}>
                                    <ActivityIndicator size={"large"}/>
                                </View> :
                                <FlatList
                                    data={this.props.category}
                                    extraData={this.state}
                                    initialNumToRender={15}
                                    keyExtractor={(item) => item._id}
                                    renderItem={this._renderItem}
                                />
                        }
                    </View>
                </View>

            </ScrollView>
        )
    }
}

class CategoryPreview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            productInCategory: this.getProductForCategory()
        }

    }

    modifyCategory() {
        this.props.renderPopup(<CreateCategory allProduct={this.props.allProduct} category={this.props.category} type="update"/>);
        this.props.openPopup();
    }

    getProductForCategory() {
        let product = [];
        this.props.allProduct.forEach((item) => {
            if (item.hasOwnProperty("categoryId")) {
                if (item.categoryId === this.props.category._id) {
                    product.push(item)
                }
            }
        });
        return product
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback>
            <View style={styleHome.itemBar}>
                <View style={styleHome.itemBarIcon}>

                    <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
                </View>
                <View style={styleHome.itemBarTitle}>
                    <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                    <TextSmall> {item.price.length > 1 ? `${item.price.length} giá`: `${item.price[0].price}đ`}</TextSmall>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {

        return (
            <View style={[styleHome.scrollView]}>
                <TouchableOpacity onPress={this.modifyCategory.bind(this)}
                                  style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center, {marginTop: 20}]}>
                    <TextNormal style={[styleBase.color2]}>Thêm hàng</TextNormal>
                </TouchableOpacity>
                <View style={[styleHome.listItem, styleHome.borderTop]}>
                    <FlatList
                        data={this.state.productInCategory}
                        extraData={this.state}
                        initialNumToRender={15}
                        keyExtractor={(item) => item._id}
                        renderItem={this._renderItem}
                    />
                </View>
            </View>

        )
    }
}

class DiscountItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.swipeableRef = null;
        this.deleteButton = null;
        this.state = {
            deleteVerification: false
        }
    }

    static propTypes = {
        item: React.PropTypes.object,
        index: React.PropTypes.number
    };

    modifyItem(item) {
        this.props.renderPopup(<CreateDiscount discountData={item}/>);
        this.props.openPopup();
    }

    onDeleteItem() {
        let {item, index} = this.props;
        if (this.state.deleteVerification) {
            let {swipeableDiscount} = this.refs;
            swipeableDiscount.transition({height: 40}, {height: 0})
        } else {
            InteractionManager.runAfterInteractions(() => {
                if (this.deleteButton != undefined) {
                    this.deleteButton.transitionTo({width: 150}, 400);
                }
                if (this.swipeableRef != undefined) {
                    Animated.spring(this.swipeableRef.state.pan.x, {
                        toValue: -150,
                        duration: 450,
                        useNativeDriver: true
                    }).start();
                }
                this.setState({deleteVerification: true});
            });
        }
        setTimeout(() => {
            this.setState({deleteVerification: false});
            this.deleteButton.transitionTo({width: 70}, 400);
            Animated.spring(this.swipeableRef.state.pan.x, {
                toValue: 0,
                duration: 450,
                useNativeDriver: true
            }).start();
        }, 2000);
    }

    renderRightItem() {
        return (
            <TouchableOpacityAnimate ref={(rowRef) => {
                this.deleteButton = rowRef;
            }}
                                     onPress={this.onDeleteItem.bind(this)}
                                     style={[styleBase.center, styleProduct.swiperDeleteButton]}>
                <Text style={[styleBase.font16, styleBase.textE5]}>
                    {this.state.deleteVerification ? "Xác Nhận" : "Xoá"}
                </Text>
            </TouchableOpacityAnimate>
        )
    }

    render() {
        let {item, index} = this.props;
        return (
            <Animate.View ref="swipeableDiscount">
                <Swipeable
                    ref={ref => this.swipeableRef = ref}
                    rightButtons={[this.renderRightItem({item, index})]}>
                    <TouchableWithoutFeedback onPress={() => this.modifyItem(item)}>
                        <View style={[styleHome.itemBar]}>
                            <View style={[styleHome.itemBarIcon]}>
                                <Ionicons name={"ios-pricetags-outline"} style={styleBase.vector18}/>
                            </View>
                            <View style={[styleHome.itemBarTitle]}>
                                <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                                <TextSmall> {item.value}{item.type === 'percent' ? "%" : "đ"}</TextSmall>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Swipeable>
            </Animate.View>
        )
    }
}

class Discount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.listRow = [];
        this.state = {
            deleteVerification: false
        }
    }

    createItem() {
        this.props.renderPopup(<CreateDiscount/>);
        this.props.openPopup();
    }

    _renderItem = ({item, index}) => <DiscountItem {...this.props} item={item} index={index}/>

    render() {
        return (
            <ScrollView style={[styleHome.scrollView]}>
                <TouchableOpacity onPress={this.createItem.bind(this)}
                                  style={[styleHome.boxPadding, styleHome.box, styleBase.background5, styleBase.center, {marginTop: 20}]}>
                    <TextNormal style={[styleBase.color2]}>Thêm khuyến mãi</TextNormal>
                </TouchableOpacity>
                <View style={[styleHome.listItem, styleHome.borderTop,]}>
                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <FlatList
                                data={this.props.allDiscount}
                                extraData={this.state}
                                initialNumToRender={15}
                                keyExtractor={(item) => item._id}
                                renderItem={this._renderItem}
                            />
                    }
                </View>
            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        account: state.account,
        allProduct: state.product.allProduct,
        category: state.product.category,
        loading: state.product.loading,
        discount: state.product.discount

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);