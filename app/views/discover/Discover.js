import React, {Component} from "react";

import {Dimensions, Image, Platform, WebView,View,Text,Modal,AppRegistry} from "react-native";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from "./components/TabBar";
import {Actions} from "react-native-router-flux";



import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import DiscoverJob from "./DiscoverJob"
import DiscoverTraffic from "./DiscoverTraffic"
import DiscoverHome from "./DiscoverHome"
import DiscoverElse from "./DiscoverElse"


const tabTitles = [
    '工作','交通' ,'家','其他'
];

const tabIcons = [
    'ios-paper-outline','ios-bus-outline' ,'ios-home-outline' , 'ios-add-circle-outline'
];
const tabSelectedIcon = [
    'ios-paper','ios-bus' ,'ios-home' , 'ios-add-circle'
];
const tabComponents = [
    DiscoverJob,DiscoverTraffic,DiscoverHome,DiscoverElse
];


export default class Discover extends Component {



    constructor(props) {
        super(props);
        this.state={
            Job:true,
            Traffic:false,
            Home:false,
            Else:false
        }


    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }
    _renderTabBar = () => <TabBar tabNames={tabTitles} tabIconNames={tabIcons} selectedTabIconNames={tabSelectedIcon}/>

    render() {


        return (
            <View style={{width:"100%",height:'100%',backgroundColor:'#fff'}}  >
                <Header  style={{backgroundColor:'#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>发现</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View style={{flexDirection:'row',justifyContent:'space-around',height:60,alignItems:'center',backgroundColor:'#bec5da'}}>
                    <View style={this.state.Job?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={()=>{this.setState({Job:true, Traffic:false, Home:false, Else:false})}}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-paper-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>工作</Text>
                    </View>
                    <View style={this.state.Traffic?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={()=>{this.setState({Job:false, Traffic:true, Home:false, Else:false})}}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-bus-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>交通</Text>
                    </View>
                    <View style={this.state.Home?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={()=>{this.setState({Job:false, Traffic:false, Home:true, Else:false})}}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-home-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>家</Text>
                    </View>
                    <View style={this.state.Else?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={()=>{this.setState({Job:false, Traffic:false, Home:false, Else:true})}}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-add-circle-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>其他</Text>
                    </View>
                </View>
                {this.state.Job?(<DiscoverJob/>):(null)}
                {this.state.Traffic?(<DiscoverTraffic/>):(null)}
                {this.state.Home?(<DiscoverHome/>):(null)}
                {this.state.Else?(<DiscoverElse/>):(null)}





            </View>
        )

    }





}
const styles = {
    icon: {
        fontSize: 24,
        marginBottom: 2
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width:50,
        height:54
    },
    tabItem1:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width:50,
        height:54,
        marginBottom:-6,
        borderTopLeftRadius:22,
        borderTopRightRadius:22,
        backgroundColor:'#fff'
    },
};