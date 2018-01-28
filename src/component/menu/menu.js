import React, {PureComponent} from "react";
import {
    Platform,
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import {TextLarge} from '../text';
import {constantStyle} from '../../style/base';
import {connect} from 'react-redux';
import EStyleSheet from "react-native-extended-stylesheet";
import ModalWrapper from '../@modalWrapper';
import {changeRoute,switchMenu} from './menuAction';

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
    changeRoute(item)
    {
        this.props.switchMenu();
        this.props.changeRoute(item)
    }

    _MenuItem = ({item}) => (
        <TouchableOpacity onPress={()=> this.changeRoute(item)}>
            <View
                style={[style.menuItemWrapper, this.props.currentItem.id === item.id && {backgroundColor: constantStyle.color2}]}>
                <TextLarge
                    style={[style.menuItemText, this.props.currentItem.id === item.id && {color: constantStyle.color1}]}>{item.name}</TextLarge>
            </View>
        </TouchableOpacity>
    )


    render() {
        return (
            <ModalWrapper
                containerStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
                onRequestClose={() => {
                    this.props.switchMenu();
                }}
                position="left"
                shouldAnimateOnRequestClose={true}
                supportedOrientations={['portrait', 'landscape']}
                visible={this.props.menuVisible}>

                <View style={{flex: 1}}>
                    <View
                        style={[style.menuContainer, {
                            width: this.state.width * 30 / 100,
                            height: this.state.height,
                        }]}>

                        <FlatList
                            data={this.props.menuItems}
                            keyExtractor={item => item.name}
                            renderItem={this._MenuItem}
                        />

                    </View>
                </View>
            </ModalWrapper>

        )
    }
}


const style = EStyleSheet.create({
    menuContainer: {
        backgroundColor: constantStyle.color1,
        position: 'absolute',
        paddingVertical: 40,
    },
    menuItemWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    menuItemText: {
        color: constantStyle.color2,

    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        menuItems: state.menuReducer.menuItems,
        currentItem: state.menuReducer.currentItem,
        menuVisible: state.menuReducer.menuVisible
    }
}
const mapDispatchToProps = {
    changeRoute,
    switchMenu
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);