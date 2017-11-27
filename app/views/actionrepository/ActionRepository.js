import React, {PureComponent} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,ListView} from "react-native";

import {Actions} from "react-native-router-flux";
import {Item,Input,Icon,Header,Left,Button} from "native-base";
import {Container, Content} from "../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import SubTabBar from "./components/SubTabBar";
import GroupMotion from "./components/GroupMotion";
import PartMotion from "./components/PartMotion";

export default class ActionRepository extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text:''


        }



    }
    render() {
        return (
            <Container>
                <View style={{width:'100%'}}>

                    <Button transparent onPress={() => Actions.pop()} style={{position:'absolute',left:0}}>
                        <Icon name="ios-arrow-back" style={{color: '#000'}}/>
                    </Button>

                    <Item rounded style={{height: 40,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 50,
                        marginRight: 50,
                        marginTop: 5,
                        marginBottom: 5}}>
                        <TouchableOpacity>
                            <Icon name="search" style={{color: '#666666'}}/>
                        </TouchableOpacity>
                        <Input
                            onChangeText={(text) => this.setState({text:text})}
                            style={{color: '#666666', marginBottom: 2}}/>
                    </Item>
                </View>
                <Content  style={{backgroundColor:'#ebeef6'}}>
                    <ScrollableTabView
                        renderTabBar={() => (<SubTabBar subTabNames={['组合动作','局部动作']}/>)}
                        tabBarPosition='top'
                        scrollWithoutAnimation={false}
                    >
                        <GroupMotion text={this.state.text}/>
                        <PartMotion text={this.state.text}/>

                    </ScrollableTabView>

                </Content>
            </Container>
        );
    }
}

const styles = {
    desc: {
        lineHeight: 24
    },
    bold: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    statement: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
};