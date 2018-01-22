import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../../style/base';
import EStyleSheet from "react-native-extended-stylesheet";
import ModalWrapper from './@modalWrapper';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            menuVisible: false
        }
    }

    closeMenu(){
        this.setState({
            menuVisible: false
        })
    }
    render() {
        return (
            <View style={[style.container]}>
                <View>
                    <TouchableWithoutFeedback onPress={()=> this.setState({menuVisible: true})}>
                        <View style={style.menuButton}>
                            <Entypo name="menu" style={style.menuIcon}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    this.props.tabView ?
                        <View style={{flex: 1}}>
                            {this.props.children}
                        </View> :
                        <View>
                        </View>
                }
                <Menu visible={this.state.menuVisible} closeMenu={()=>{this.closeMenu()}}/>
            </View>

        )
    }
}

class Menu extends PureComponent {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height
        }
    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        })
    }

    render() {
        return (
            <ModalWrapper
                containerStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
                onRequestClose={() => {
                    this.props.closeMenu();
                }}
                position="left"
                shouldAnimateOnRequestClose={true}
                supportedOrientations={['portrait', 'landscape']}
                visible={this.props.visible}>

                <View style={{flex:1}}>
                    <View
                        style={{
                            width: this.state.width * 30 / 100,
                            height: this.state.height,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
                            padding: 40,
                        }}>

                        {/*<FlatList*/}
                        {/*data={this.props.routeMap}*/}
                        {/*keyExtractor={item => item.name}*/}
                        {/*renderItem={this._MenuItem}*/}
                        {/*/>*/}

                    </View>
                </View>
            </ModalWrapper>

        )
    }
}


const style = EStyleSheet.create({
    container: {
        height: constantStyle.headerHeight,
        backgroundColor: constantStyle.color1,
        flexDirection: 'row',
        borderBottomColor:constantStyle.colorBorder,
        borderBottomWidth:1,
    },
    menuButton: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuIcon: {
        fontSize: constantStyle.sizeLarge
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default Header;