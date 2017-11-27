/**
 * Created by Administrator on 2017/11/21.
 */
import React, {Component} from "react";
import {Header, Left, Right, Body, Title,Button} from "native-base";
import {View, Image, Text} from "react-native";
import {Actions} from "react-native-router-flux";

export default class TitleHeader extends Component {

    render() {
        return (
            <Header style={{backgroundColor:theme.contentBgColor}} noShadow>
                <Left style={{flex:1}}/>
                <Body style={{flex:1,alignItems: 'center'}}>
                <Title style={{color: theme.toolbarTextColor}}>{this.props.title}</Title>
                </Body>
                <Right style={{flex:1}}>
                    <Button style={{
                        flexDirection: 'row',
                        width: 96,
                        height: 25,
                        backgroundColor: '#726585',
                        borderBottomLeftRadius: 15,
                        borderTopLeftRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: -10
                    }} onPress={() => Actions.actionRepository()}>
                        <Text style={{color: '#fff',fontSize:12}}>动作库</Text>
                        <Image source={require('./image/jia.png')}
                               style={{width: 15, height: 15, marginLeft: 10}}/>
                    </Button>

                </Right>
            </Header>
        )
    }
};
