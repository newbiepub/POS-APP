import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../../styles/base";
import DiscountInput from "./discountInput/index";
import {Navigator} from 'react-native-deprecated-custom-components';
import ListDiscount from "./listDiscount/index";

class Discount extends React.Component {
    constructor(props) {
        super(props);

        this.navigator = null;
        this.configureScene = this.configureScene.bind(this);
        this.renderScene    = this.renderScene.bind(this);
    }

    configureScene(route, navigator) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'list_discount':
                return <ListDiscount navigator={navigator}/>
            case 'discount_input':
                return <DiscountInput navigator={navigator}
                                      discountId={route.discountId}
                                      modifiedType={route.modifiedType}/>
        }
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>
                <Navigator
                    ref={(ref) => {
                        this.navigator = ref;
                    }}
                    initialRoute={{id: 'list_discount', index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        )
    }
}

Discount.propTypes = {};

Discount.defaultProps = {};

export default Discount;