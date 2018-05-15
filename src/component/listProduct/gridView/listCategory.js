import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Easing,
    Animated,
    Alert
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../../style/base';
import {TextNormal, TextSmall} from '../../text';
import {getCategory} from '../productAction';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { switchCategoryView} from '../productAction';
import {connect} from'react-redux';
class CategoryView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.categoryWidthOpen = 200;
        this.categoryWidthClose = constantStyle.headerHeight;
        this.state = {
            isCategoryViewOpen: new Animated.Value(this.props.isCategoryViewOpen ? 1: 0),
            categoryWidth: new Animated.Value(this.props.isCategoryViewOpen? this.categoryWidthOpen: this.categoryWidthClose),
        };
    }

    componentWillMount(){
        this.props.getCategory()
    }

    openCategoryView() {
        Animated.timing(
            // Animate value over time
            this.state.categoryWidth, // The value to drive
            {
                toValue: this.categoryWidthOpen, // Animate to final value of 1
            }
        ).start();

        Animated.timing(
            this.state.isCategoryViewOpen,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        this.props.switchCategoryView()
    }

    closeCategoryView() {
        Animated.timing(
            // Animate value over time
            this.state.categoryWidth,
            {
                toValue: this.categoryWidthClose, // Animate to final value of 1
            }
        ).start();
        Animated.timing(
            this.state.isCategoryViewOpen,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        this.props.switchCategoryView()
    }

    switchCategoryView() {
        if (this.props.isCategoryViewOpen) {
            this.closeCategoryView()
        } else {
            this.openCategoryView()
        }
    }

    onPressCategory(string) {
        this.props.onChangeCategoryFilter(string);
        this.closeCategoryView()
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.onPressCategory(item._id)}>
            <View style={style.categoryItem}>
                <View style={style.categoryAvatarWrapper}>
                    <View style={style.categoryAvatar}>
                        <TextNormal
                            style={[style.categoryAvatarText,
                            this.props.categoryFilter === item._id && {color: constantStyle.color1}]}>{item.name.substr(0, 2)}</TextNormal>
                    </View>
                </View>
                <View style={style.categoryName}>
                    <TextNormal
                        style={this.props.categoryFilter === item._id && {color: constantStyle.color1}}>{item.name}</TextNormal>
                </View>
            </View>
        </TouchableWithoutFeedback>


    );

    render() {
        const spinArrow = this.state.isCategoryViewOpen.interpolate({
            inputRange: [0, 1],
            outputRange: ['0 deg', '180 deg']
        });
        // console.warn(this.props.categoryFilter)
        return (
            <Animated.View
                style={[style.categoryView, {width: this.state.categoryWidth}]}>

                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => this.switchCategoryView()}>
                        <View style={style.categoryItem}>
                            <Animated.View style={[style.categoryButtonSwitchIcon, {
                                transform: [{rotate: spinArrow}]
                            }]}>
                                <Entypo name="chevron-thin-right"
                                        style={[{fontSize: constantStyle.sizeLarge, color: constantStyle.color1}]}/>
                            </Animated.View>
                            <View style={style.categoryName}>
                                <TextNormal>Loại hàng</TextNormal>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.onPressCategory("all")
                    }}>
                        <View style={style.categoryItem}>
                            <View style={style.categoryAvatarWrapper}>
                                <View style={style.categoryAvatar}>
                                    <MaterialCommunityIcons name={"paper-cut-vertical"}
                                                            style={[style.categoryIconAllProduct,
                                                                this.props.categoryFilter === 'all' && {color: constantStyle.color1}]}/>
                                </View>
                            </View>
                            <View style={style.categoryName}>
                                <TextNormal
                                    style={this.props.categoryFilter === 'all' && {color: constantStyle.color1}}>Tất
                                    cả</TextNormal>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList
                        data={this.props.category}
                        extraData={this.props}
                        initialNumToRender={5}
                        keyExtractor={(item) => item._id}
                        renderItem={this._renderItem}
                    />
                </ScrollView>
            </Animated.View>
        )
    }
}

const style = EStyleSheet.create({
    categoryView: {
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder
    },
    categoryIconAllProduct: {
        fontSize: constantStyle.sizeNormal,

    },
    categoryButtonSwitch: {
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    categoryButtonSwitchIcon: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryItem: {
        height: constantStyle.headerHeight,
        flexDirection: 'row',
        alignItems: "center",
    },
    categoryAvatarWrapper: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryAvatar: {
        height: constantStyle.headerHeight - 20,
        width: constantStyle.headerHeight - 20,
        borderRadius: 50,
        backgroundColor: constantStyle.color2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryAvatarText: {},
    categoryName: {
        marginLeft: 10,
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
// let CategoryViewApollo = graphql(QUERY.CATEGORIES, {
//     name: 'category', options: {
//         fetchPolicy: "cache-and-network"
//     }
// })(CategoryView);

const mapStateToProps = (state)=>{
    return{
        isCategoryViewOpen: state.productReducer.isCategoryViewOpen,
        category: state.productReducer.category,
    }
};
const mapDispatchToProps={
    switchCategoryView,
    getCategory
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryView);