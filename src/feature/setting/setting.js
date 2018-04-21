import React from "react";
import {
    ActivityIndicator,
    Alert,
    AsyncStorage,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';
import {client} from '../../root';
import {ASYNC_STORAGE} from '../../constant/constant';
import {logout} from '../../feature/login/userAction';
import {connect} from 'react-redux';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.item = [
            {id: 'logout', name: 'Đăng xuất'}
        ]
    }

    onItemPress(id) {
        if (id === this.item[0].id) {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn đăng xuất khỏi thiết bị này không!',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'OK', onPress: async () => {
                            if(this.props.asyncTransaction.length>0)
                            {
                                Alert.alert(
                                    'Thông báo !',
                                    'Ứng dụng có dữ liệu chưa đồng bộ lên server, nếu đăng xuất sẽ bị mất. Bạn có muốn đăng xuất không ?',
                                    [
                                        {text: 'Không', style: 'cancel'},
                                        {
                                            text: 'OK', onPress: async () => {
                                                await AsyncStorage.clear();
                                                this.props.navigator.resetTo({id: "login"});
                                                this.props.logout()
                                                // client.resetStore()
                                            }
                                        },
                                    ],
                                    {cancelable: false}
                                )
                            }else{
                                await AsyncStorage.clear();
                                this.props.navigator.resetTo({id: "login"});
                                this.props.logout()
                            }

                            // client.resetStore()
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    }

    render() {
        console.warn(this.props.asyncTransaction)
        return (
            <View style={style.container}>
                <Header type={"normal"} titleLeft={"Cài đặt"} titleRight={"Thông tin điểm bán hàng"}/>
                <View style={style.body}>

                    <View style={style.leftView}>
                        <ScrollView>

                            {
                                this.item.map((item) => {
                                    return (
                                        <TouchableWithoutFeedback key={item.id}
                                                                  onPress={() => this.onItemPress(item.id)}>
                                            <View style={style.item}>
                                                <TextNormal style={style.itemText}>{item.name}</TextNormal>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={style.rightView}>

                    </View>
                </View>

            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    leftView: {
        flex: 0.3,
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder,
    },
    rightView: {
        flex: 0.7,
    },
    item: {
        width: '100%',
        height: constantStyle.headerHeight,
        padding: constantStyle.md,
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
    },
    itemText: {}
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    logout
};
const mapStateToProps = (state)=>{
    return {
        asyncTransaction : state.transactionReducer.asyncTransaction
    }

};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);