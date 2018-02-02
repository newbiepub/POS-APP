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
import {TextNormal, TextSmall} from '../../../component/text';
import {client} from '../../../root';
import {QUERY} from '../../../constant/query';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class CategoryView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.categoryWidthOpen = 200;
        this.categoryWidthClose = constantStyle.headerHeight;
        this.state = {
            isCategoryViewOpen: new Animated.Value(0),
            categoryOpen: false,
            categoryWidth: new Animated.Value(this.categoryWidthClose),
            category: []
        };
    }

    async componentWillMount() {
        try {

            client.query({
                query: QUERY.CATEGORIES,
                fetchPolicy: 'cache-first'
            }).then((res) => {
                this.setState({
                    category: res.data.categories
                })
            }).catch(async err => {
                if (err.networkError.response.status === 500) {
                    this.props.loginExpire()
                }
            })

        } catch (e) {
            console.warn(e)
        }
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
        this.setState({
            categoryOpen: true,
        })
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
        this.setState({
            categoryOpen: false,
        })
    }

    switchCategoryView() {
        if (this.state.categoryOpen) {
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
                        <TextNormal style={style.categoryAvatarText}>{item.name.substr(0, 2)}</TextNormal>
                    </View>
                </View>
                <View style={style.categoryName}>
                    <TextNormal>{item.name}</TextNormal>
                </View>
            </View>
        </TouchableWithoutFeedback>


    );

    render() {
        const spinArrow = this.state.isCategoryViewOpen.interpolate({
            inputRange: [0, 1],
            outputRange: ['0 deg', '180 deg']
        });
        return (
            <Animated.View
                style={[style.categoryView, {width: this.state.categoryWidth}]}>
                <TouchableWithoutFeedback onPress={() => this.switchCategoryView()}>
                    <View style={style.categoryButtonSwitch}>
                        <Animated.View style={[style.categoryButtonSwitchIcon, {
                            transform: [{rotate: spinArrow}]
                        }]}>
                            <Entypo name="chevron-thin-right"
                                    style={[{fontSize: constantStyle.sizeLarge, color: constantStyle.color1}]}/>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => {
                        this.onPressCategory("all")
                    }}>
                        <View style={style.categoryItem}>
                            <View style={style.categoryAvatarWrapper}>
                                <View style={style.categoryAvatar}>
                                    <MaterialCommunityIcons name={"paper-cut-vertical"}
                                                            style={style.categoryIconAllProduct}/>
                                </View>
                            </View>
                            <View style={style.categoryName}>
                                <TextNormal>Tất cả</TextNormal>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList
                        data={this.state.category}
                        extraData={this.state}
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
        color: constantStyle.color1
    },
    categoryButtonSwitch: {
        alignItems: 'flex-end'
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
    categoryAvatarText: {
        color: constantStyle.color1
    },
    categoryName: {
        marginLeft: 10,
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default CategoryView;