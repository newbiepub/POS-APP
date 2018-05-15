import React from "react";
import {Navigator} from "react-native-deprecated-custom-components";
import Login from "../feature/login/container/login";
import EStyleSheet from "react-native-extended-stylesheet";
import {View} from "react-native";
import Home from "../feature/home/container/home";
import Popup from "../component/popup/popup";
import styleBase from "../styles/base";
import POSDetail from "../feature/pos/container/posDetail";
import ProductManagement from "../feature/inventory/productManagement/container/productManagement";
import emitter from "../event/emitter";
import {EVENT_TYPE} from "../constant/eventType";
import IngredientManagement from "../feature/inventory/ingredientManagement/container/ingredientManagement";
import ImportExportManagement from "../feature/inventory/importExportManagement/index";
import ConfirmExport from "../feature/inventory/importExportManagement/confirmExport";
import ProductDetail from "../feature/inventory/productManagement/component/product/productDetail";
import ErrorBoundary from "../component/errorBoundary/errorBoundary";
import ListPos from "../feature/inventory/importExportManagement/listPos";
import ListExportProducts from "../feature/inventory/importExportManagement/listProduct";
import ActivityLoggerContainer from "../feature/inventory/activityLogger/index";

EStyleSheet.build(); //Build Extended StyleSheet

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = null;
    }

    static propTypes = {};

    static defaultProps = {};

    componentDidMount() {
        // User logout handler
        emitter.addListener(EVENT_TYPE.USER_LOGOUT, () => {
            this.navigator.resetTo({id: 'login'}); // Reset to login view
        })
    }

    componentWillUnmount () {
        emitter.removeAllListeners();
    }

    configureScene(route, navigator) {
        if(route.id === "pos_detail")
            return Navigator.SceneConfigs.FloatFromBottom;

        return Navigator.SceneConfigs.FadeAndroid;
    }
    renderScene(route, navigator) {
        switch (route.id) {
            case "login":
                return <Login navigator={navigator}/>;
            case "home":
                return <Home navigator={navigator}/>;
            case "pos_detail":
                return <ErrorBoundary>
                    <POSDetail navigator={navigator} title={route.title} user={route.user}/>
                </ErrorBoundary>;
            case "pos_product_management":
                return <ErrorBoundary>
                    <ProductManagement navigator={navigator} title={route.title} user={route.user} type={"employee"}/>
                </ErrorBoundary>;
            case "company_product_management":
                return <ErrorBoundary>
                    <ProductManagement navigator={navigator}
                                       title={route.title}
                                       user={route.user}
                                       type={"company"}/>
                </ErrorBoundary>;
            case 'company_ingredient_management':
                return <IngredientManagement navigator={navigator} title={route.title} user={route.user} type="company"/>;
            case 'company_inventory_activity_management':
                return <ImportExportManagement navigator={navigator} title={route.title} user={route.user} type="company"/>;
            case 'company_inventory_export_list_pos':
                return <ListPos navigator={navigator} title="CHỌN ĐIỂM BÁN HÀNG"/>
            case 'company_inventory_export_list_product':
                return <ListExportProducts navigator={navigator} title="SẢN PHẨM XUẤT KHO" employee={route.employee}/>
            case  'product_detail':
                return <ProductDetail navigator={navigator}
                                      title={route.product.product.name}
                                      item={route.product}/>
            case 'company_inventory_activity_logger_management':
                return <ActivityLoggerContainer navigator={navigator} title={route.title}/>
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <Navigator
                    ref={(ref) => {
                        this.navigator = ref;
                    }}
                    initialRoute={{id: 'login', index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                />
                <Popup/>
            </View>
        )
    }
}

export default AppContainer