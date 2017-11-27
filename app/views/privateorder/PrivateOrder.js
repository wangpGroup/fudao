import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from "react-native-scrollable-tab-view";
import SubTabBar from "./components/SubTabBar";
import GroupMotion from "./components/GroupMotion";
import PartMotion from "./components/PartMotion";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';

/**
 * 私人订制
 */
@observer
export default class PrivateOrder extends Component {
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="ios-arrow-back" style={{color: '#000'}}/>
                        </Button>
                    </Left>
                    <Text style={{marginLeft:-70,color:'#000',fontSize:18,marginTop:12}}>
                        {this.props.title}
                    </Text>
                    <Right>
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
                <Content delay>
                    <ScrollableTabView
                        renderTabBar={() => (<SubTabBar subTabNames={['组合动作','局部动作']}/>)}
                        tabBarPosition='top'
                        scrollWithoutAnimation={true}
                        locked={true}
                    >
                        <GroupMotion/>
                        <PartMotion/>

                    </ScrollableTabView>
                </Content>
            </Container>
        )
    }
}


const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};