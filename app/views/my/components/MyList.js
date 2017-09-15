import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {SeparatorArea} from "../../../components";

import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";

const Item = props => {
    return (
        <ListItem
            icon
            style={{backgroundColor:'#E3E7F3',marginLeft: 0,paddingLeft: 15}}
            onPress={props.router ? () => Actions[props.router]() : null}>
            <Left>
                <Icon name={props.icon}/>
            </Left>
            <Body style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.text}</Text>
            </Body>
            <Right style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Icon name="ios-arrow-forward"/>
            </Right>
        </ListItem>
    );
}

export default class MyList extends PureComponent {

    render() {
        return (
            <View>
                <Item icon="ios-aperture-outline" text="圈子" router="dynamic" bordered/>
                <Item icon="ios-aperture-outline" text="好友" router="friend"/>
                <SeparatorArea style={{height: 30}}/>
                <Item icon="ios-star-outline" text="收藏" router="collection"/>
                <SeparatorArea style={{height: 30}}/>
                <Item icon="ios-settings-outline" text="设置" bordered/>
                <Item icon="ios-information-circle-outline" text="关于福道" router="about"/>
            </View>
        )
    }
}
