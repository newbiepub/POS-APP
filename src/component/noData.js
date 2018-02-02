import React from "react";
import {Tile, Title, Image, View} from "@shoutem/ui";

class NoData extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <View styleName="xl-gutter-top" style={this.props.style}>
                <Tile styleName="text-centric">
                    <Image
                        styleName="medium-square"
                        style={{width: 142, height: 142}}
                        source={require("../asset/img/open-box.png")}
                    />
                    <Title styleName="md-gutter-top">KHÔNG CÓ DỮ LIỆU</Title>
                </Tile>
            </View>
        )
    }
}

export default NoData