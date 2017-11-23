import React from "react";
import {Text, View, TouchableWithoutFeedback, TextInput, ScrollView} from "react-native";
import {TextLarge, TextSmall, TextNormal} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import style from '../../style/POS';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ViewItem from '../../popup/product/viewProduct';
import {connect} from "react-redux";
import {openPopup,renderPopup} from '../../../action/popup';
class Library extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentViewLibrary: 'Danh sách',
            searchText: '',

        }
    }

    getDataSearch() {
        try {
            let data = [];
            if (this.state.searchText !== '') {
                if (this.state.currentViewLibrary === 'Danh sách' || this.state.currentViewLibrary === 'Mặt hàng') {
                    this.props.dataItems.forEach((item) => {
                        if (item.hasOwnProperty("name") && item.name.includes(this.state.searchText)) {
                            data.push(item)
                        }
                    });
                }

                if (this.state.currentViewLibrary === 'Danh sách' || this.state.currentViewLibrary === 'Khuyến mãi') {
                    this.props.dataDiscounts.forEach((item) => {
                        if (item.hasOwnProperty("name") && item.name.includes(this.state.searchText)) {
                            data.push(item)
                        }
                    });
                }
            }
            return data;
        } catch (e) {
            return [];
            console.warn(e)
        }


    }

    componentWillMount() {
        this.getDataSearch();
    }

    render() {
        return (
            <View style={[styleBase.background4, styleHome.container, styleHome.box]}>
                {/*------Title------------*/}
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({currentViewLibrary: 'Danh sách'})
                }}>
                    <View style={[styleHome.boxTitle, style.itemHeight, styleHome.borderBottom]}>

                        {
                            this.state.currentViewLibrary !== 'Danh sách' &&
                            <EvilIcons name="arrow-left"
                                       style={[styleBase.vector26, {alignSelf: 'center'}]}/>
                        }

                        <TextLarge>
                            {this.state.currentViewLibrary}
                        </TextLarge>


                    </View>
                </TouchableWithoutFeedback>
                <View style={{flex: 1}}>
                    {/*------Search------------*/}

                    <View style={[styleHome.borderBottom, style.itemHeight, {
                        flexDirection: 'row'
                    }]}>
                        <View style={[styleBase.background4, style.backgroundIconWidth, {
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }]}>
                            <EvilIcons name="search"
                                       style={[styleBase.vector26, styleBase.background4, {alignSelf: 'center'}]}/>
                        </View>
                        <View style={[styleHome.boxTitle, styleHome.boxTitle, {flex: 1}]}>
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
                        this.state.currentViewLibrary === 'Danh sách' &&
                        (
                            <LibraryHome instant={this} data={this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary === 'Mặt hàng' &&
                        (
                            <LibraryItems instant={this}
                                          openPopup={()=>this.props.openPopup()}
                                          renderPopup={(item)=>this.props.renderPopup(item)}
                                          data={this.state.searchText === '' ? this.props.dataItems : this.getDataSearch()}/>
                        )
                    }
                    {
                        this.state.currentViewLibrary === 'Khuyến mãi' &&
                        (
                            <LibraryItems instant={this}
                                          data={this.state.searchText === '' ? this.props.dataDiscounts : this.getDataSearch()}/>
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
                                this.changeView('Mặt hàng')
                            }}>
                                <View style={[styleHome.borderBottom, style.itemHeight, {
                                    flexDirection: 'row'
                                }]}>
                                    <View style={[styleBase.background2, style.backgroundIconWidth, styleHome.box, {
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }]}>
                                        <EvilIcons name="archive"
                                                   style={[styleBase.vector26, styleBase.background2, {alignSelf: 'center'}]}/>
                                    </View>
                                    <View style={[styleHome.boxTitle, {flex: 1}]}>
                                        <Text style={[styleBase.font14, {flex: 1}]}>
                                            Mặt hàng
                                        </Text>
                                        <EvilIcons name="chevron-right" style={styleBase.vector26}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*------discount------------*/}
                            <TouchableWithoutFeedback onPress={() => {
                                this.changeView('Khuyến mãi')
                            }}>
                                <View style={[styleHome.borderBottom, style.itemHeight, {
                                    flexDirection: 'row'
                                }]}>
                                    <View style={[styleBase.background2, style.backgroundIconWidth, styleHome.box, {
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }]}>
                                        <EvilIcons name="tag"
                                                   style={[styleHome.boxTitle, styleBase.vector26, styleBase.background2, {alignSelf: 'center'}]}/>
                                    </View>
                                    <View style={[styleHome.boxTitle, {flex: 1}]}>
                                        <Text style={[styleBase.font14, {flex: 1}]}>
                                            Khuyến mãi
                                        </Text>
                                        <EvilIcons name="chevron-right" style={styleBase.vector26}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> :
                        <LibraryItems data={this.props.data}/>
                }

            </View>
        )
    }
}


class LibraryItems extends React.PureComponent {

    onPressItem(item){
        this.props.renderPopup(
            <ViewItem itemData={item}/>
        );
        this.props.openPopup();
    }

    render() {
        try {
            var listAllItems = this.props.data.map((data) => {
                if (data.hasOwnProperty("name"))
                    return (
                        <TouchableWithoutFeedback key={data.name} onPress={()=> this.onPressItem(data)}>
                            <View style={[styleHome.borderBottom, styleBase.background2, style.itemHeight, {
                                flexDirection: 'row',
                                flex: 1
                            }]}>
                                <View style={[styleBase.background2, style.backgroundIconWidth, {
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}>

                                    <TextNormal style={styleBase.background2}>{data.name.substr(0, 2)}</TextNormal>
                                </View>
                                <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
                                    <TextSmall style={{flex: 1}}>{data.name}</TextSmall>
                                    <TextSmall> {Object.keys(data.prices).length} giá</TextSmall>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
            })
        } catch (e) {
            console.warn(e);
            return <NotFound/>
        }

        return (
            <View style={{flex: 1}}>
                {/*------Items------------*/}
                {
                    this.props.data.length > 0 && this.props.data !== undefined ?
                        <ScrollView>
                            {listAllItems}
                        </ScrollView> :
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

const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(null,mapDispatchToProps)(Library);