import React from "react";
import {createIconSetFromFontello} from "react-native-vector-icons";
import config from "../../asset/font/config.json";

const Icon = createIconSetFromFontello(config);

class Fontello extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        name: React.PropTypes.string
    };

    static defaultProps = {};

    render() {
        return (
            <Icon {...this.props} name={this.props.name}/>
        )
    }
}

export default Fontello;