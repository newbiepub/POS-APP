import React from "react";
import {connect} from "react-redux";
import {Modal, View, Text, Dimensions, TouchableWithoutFeedback, Animated} from "react-native";
import styleBase from "../style/base";
import styleHome from "../style/home";
import Entypo from 'react-native-vector-icons/Entypo';

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window');

        this.state = {
            height,
            width,
            marginLeft: new Animated.Value(-width * 30 / 100),
        }
    }

    onLayout(evt) {
        let height = evt.nativeEvent.layout.height;
        let width = evt.nativeEvent.layout.width;
        this.setState({
            width,
            height
        })


    }

    closeMenu() {
        let instant = this.props.instant;

        Animated.timing(          // Uses easing functions
            this.state.marginLeft,    // The value to drive
            {
                toValue: -this.state.width * 30 / 100,

            },           // Configuration
        ).start(() => {
            instant.setState({
                menuVisible: false
            })
        });

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.visible == true) {
            Animated.timing(          // Uses easing functions
                this.state.marginLeft,    // The value to drive
                {
                    toValue: 0,

                },           // Configuration
            ).start();
        }

    }

    render() {
        return (
            <Modal
                // animationType="none"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
                supportedOrientations={['portrait', 'landscape']}
            >
                <View style={styleBase.container} onLayout={(event) => this.onLayout(event)}>
                    <TouchableWithoutFeedback onPress={() => this.closeMenu()}>
                        <View style={{flex: 1, backgroundColor: "rgba(60, 60, 61,0.7)"}}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            width: this.state.width * 30 / 100,
                            backgroundColor: 'rgb(60, 60, 61)',
                            position: 'absolute',
                            height: this.state.height,
                            padding: 40,
                            marginLeft: this.state.marginLeft
                        }}>
                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Điểm bán hàng</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Hoá đơn</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Giao dịch</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Báo cáo</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Mặt hàng</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Cài đặt</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback >
                            <View style={[styleHome.menuItem]}>
                                <Text style={[styleBase.font16,{fontWeight:"600", color: 'white'}]}>Trợ giúp</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </Animated.View>


                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(Menu);