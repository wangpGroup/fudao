import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';
import Parabola from 'react-native-smart-parabola'
import CircleProgress from '../consult/components/CircleProgress'
import VideoPlayer from './components/VideoPlayer'
import DetailsModal from "./components/DetailsModal";

import activityClassifyStore from "../../mobx/activityClassifyStore";

import userStore from "../../mobx/userStore";

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56
let duan = Platform.OS == 'ios'

/**
 * 活动
 */
@observer
export default class ThemeActivity extends Component {

    componentWillMount(){
        let {themeId} = this.props;
        activityClassifyStore.getThemeActivityList(themeId);
    }

    render() {
        let {title} = this.props;
        let {themeActivityList} = activityClassifyStore;




        return (
            <Container>
                <Header style={{backgroundColor: '#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="ios-arrow-back" style={{color: '#000'}}/>
                        </Button>
                    </Left>

                    <Text style={{marginLeft:-70,color:'#000',fontSize:18,marginTop:12}}>
                        {title}
                    </Text>


                    <Right>

                    </Right>

                </Header>
                <Content delay>

                    <ScrollView ref="list" style={{height: '84%', backgroundColor: '#ebeef6'}}>
                        <View style={{backgroundColor: '#fff', width:'100%',height: 300,marginBottom:10,alignItems:'center'}}>
                            <View style={{
                                width: '100%',
                                height: 240,
                            }}>
                                <VideoPlayer
                                    source={{uri: urls.apis.VIDEONEW + '?filePath=/video/activity/anzhi.mp4&authorization='+userStore.token}}

                                    seekColor={ '#000' }
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor:'#fff'
                                    }}
                                    resizeMode='cover'
                                    rate={0}


                                />
                            </View>
                            <View style={{width:200,height:60,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View style={{width:60,height:60,borderWidth:2,borderColor:'#a198ae',justifyContent:'center',alignItems:'center',marginRight:6}}>
                                    <Image source={require('./image/dingzhi.png')} style={{width: 50, height: 50}}/>
                                </View>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                                    <Image source={require('./image/dingzhi.png')} style={{width: 50, height: 50}}/>
                                </View>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                                    <Image source={require('./image/dingzhi.png')} style={{width: 50, height: 50}}/>
                                </View>
                            </View>

                            <View style={{width:40,height:200,flexDirection:'column',position:'absolute',right:20,top:20}}>
                                <CircleProgress totalNum={700}
                                                progress={70}
                                                radius={20}
                                                baseWidth={4}
                                                progressWidth={5}
                                >
                                    <Text>{70}</Text>
                                </CircleProgress>
                                <Button transparent
                                        onPress={()=>{
                                            this.openOrderBox()
                                        }}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop:20
                                        }}>
                                    <Image source={require('./image/dingzhi.png')} style={{width: 36, height: 35}}/>
                                </Button>
                                <Button transparent
                                        onPress={()=>{
                                            this.openDetailsBox()
                                        }}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop:10
                                        }}>
                                    <Image source={require('./image/zhushi.png')} style={{width: 36, height: 36}}/>
                                </Button>
                                <Button transparent
                                        style={{
                                            width: 36,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop:10
                                        }}>
                                    <Image source={require('./image/jingyin.png')} style={{width: 36, height: 36}}/>
                                </Button>
                            </View>

                        </View>
                        {themeActivityList.map((i,k)=>(
                                <ListItem avatar style={styles.listItem} key={k} onPress={()=>{this.changeList(i.id)}}>
                                    <Left>
                                        <View style={styles.leftView}>
                                            <Image source={require('./image/play.png')}
                                                   style={{width: 62, height: 62}}/>
                                            <Image source={require('./image/play.png')} style={{
                                                width: 29,
                                                height: 29,
                                                position: 'absolute',
                                                top: 16,
                                                left: 16
                                            }}/>
                                        </View>
                                    </Left>
                                    <Body style={{borderBottomWidth:0}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:8}}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#fff',
                                            backgroundColor: '#d2d2d2',
                                            marginRight: 10
                                        }}>123</Text>
                                        <Text style={{fontSize: 16, color: '#000'}}>{i.group_name}</Text>
                                        <Text style={{fontSize: 12,marginLeft:10,color:'#666'}}>123</Text>
                                    </View>
                                    <Text style={{fontSize: 8}}>{i.effect}</Text>
                                    </Body>
                                    <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                                        <View
                                            style={[styles.circleView, {backgroundColor: '#cccccc'}]}>
                                            <Text style={{fontSize:10}}>已打卡</Text>
                                        </View>
                                    </Right>

                                    <Image source={require('./image/yipay.png')} style={{
                                        width: 14,
                                        height: 14,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}/>
                                </ListItem>
                            )

                        )}



                    </ScrollView>


                </Content>
                <DetailsModal ref={(e) => this._PayModal = e}  />

            </Container>
        )

    }
    changeList(id){
        activityClassifyStore.themelistId=id;
        this.refs.list.scrollTo([0, 0]);
    }
    openDetailsBox() {
        let {themelistId}=activityClassifyStore;
        this._PayModal.show(themelistId,1);

    }
    openOrderBox(){
        let {themelistId}=activityClassifyStore
        activityClassifyStore.addMySubscribe(1,themelistId)
        activityClassifyStore.fetchActivityClassifyList(1);

    }



}


const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};
