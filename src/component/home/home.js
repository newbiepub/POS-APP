import React from "react";
import {connect} from "react-redux";
import {Text, View} from "react-native";
import styleBase from "../style/base";
import SortableGrid from "../sortableGrid/sortableGrid";
import styleHome from "../style/home";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleHome.homeWrapper, styleBase.grow]}>
                    <View style={[styleBase.row, styleBase.grow]}>
                        <View style={[styleHome.main, {backgroundColor: "green"}]}>

                        </View>
                        <View style={[styleHome.sidebar, {backgroundColor: "blue"}]}>

                        </View>
                    </View>
                </View>
                <View style={[styleHome.footer]}>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null) (Home);