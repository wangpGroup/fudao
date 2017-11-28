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
import OrderModal from "./components/OrderModal";
import PayModalBox from "./components/PayModalBox";

import activityClassifyStore from "../../mobx/activityClassifyStore";

import userStore from "../../mobx/userStore";
import ShareAlertDialog from "../article/components/AlertShare";
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56
let duan = Platform.OS == 'ios'

/**
 * 活动
 */
@observer
export default class ThemeActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSharePop: false,//分享弹窗，默认不显示
        }

    }

    componentWillMount(){
        let {themeId} = this.props;
        activityClassifyStore.getThemeActivityList(themeId);
    }


    wxShare() {

        let {activityGroup}=activityClassifyStore;
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {

                WeChat.shareToSession({
                    title:activityGroup.group_name,
                    description: '分享自:活动',
                    thumbImage:'',
                    type: 'news',
                    webpageUrl: urls.pages.ZH_ACTIONSHARE + '?id=' + activityGroup.id
                })
                .catch((error) => {
                    alert(error.message);
                });
            } else {
                tools.showToast('没有安装微信软件，请您安装微信之后再试');
            }
        });
        this.setState({showSharePop: false})



    }
    wxpyqShare(){


        let {activityGroup}=activityClassifyStore;
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToTimeline({
                    title:activityGroup.group_name,
                    description: '分享自:活动',
                    thumbImage: '',
                    type: 'news',
                    webpageUrl: urls.pages.ZH_ACTIONSHARE + '?id=' + activityGroup.id,
                }).then(res => {
                    //alert(res)

                    //tools.showToast("微信朋友圈")
                })
            } else {
                tools.showToast("没有安装微信软件，请您安装微信之后再试");
            }
        });
        this.setState({showSharePop: false})
    }
    qqShare() {
        let {activityGroup}=activityClassifyStore;
        QQAPI.shareToQQ({
                type: 'news',
                title:activityGroup.group_name,
                description: '分享自:活动',
                webpageUrl: urls.pages.ZH_ACTIONSHARE + '?id=' + activityGroup.id,
                imageUrl:''
            }
        );
        this.setState({showSharePop: false})

    }
    qqkjShare() {
        let {activityGroup}=activityClassifyStore;
        QQAPI.shareToQzone({
                type: 'news',
                title:activityGroup.group_name,
                description: '分享自:活动',
                webpageUrl: urls.pages.ZH_ACTIONSHARE + '?id=' + activityGroup.id,
                imageUrl:''
            }
        );
        this.setState({showSharePop: false})

    }
    wbShare() {
        let {activityGroup}=activityClassifyStore;
        WeiboAPI.share({
            type: 'image',
            text: '快来看看我分享的内容吧'+urls.pages.ZH_ACTIONSHARE + '?id=' + activityGroup.id,
            imageUrl:  '',
        });
        this.setState({showSharePop: false})
    }
    haoyouShare() {
        this.setState({showSharePop: false})

    }
    qzShare() {
        let {grouplistId}=activityClassifyStore;
        Actions.newDynamic({
            leixing: 5,
            id:grouplistId
        })
        this.setState({showSharePop: false})
    }
    onSharePress() {
        this.setState({showSharePop: !this.state.showSharePop})
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
                                <Button transparent
                                        onPress={() => this.onSharePress()}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop:10
                                        }}>

                                    <Image source={require('../../assets/share.png')} style={{width: 36, height: 36}}/>
                                </Button>
                            </View>

                        </View>
                        {themeActivityList.map((i,k)=>(
                                <ListItem avatar style={styles.listItem} key={k} onPress={()=>{this.changeList(i.id,i.is_free)}}>
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
                                            style={[styles.circleView, {backgroundColor: i.isread ? '#cccccc' : '#726585'}]}>
                                            {i.isread ? (<Text style={{fontSize:10}}>已打卡</Text>) : (<Text style={{color: '#fff',fontSize:10}}>打卡</Text>)}
                                        </View>
                                    </Right>

                                    {i.is_free == 1 && i.ispay==false? (<Image source={require('./image/daler.png')} style={{
                                        width: 14,
                                        height: 14,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}/>) : (null)}
                                    {i.ispay==true? (<Image source={require('./image/yipay.png')} style={{
                                        width: 14,
                                        height: 14,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}/>) : (null)}
                                </ListItem>
                            )

                        )}



                    </ScrollView>


                </Content>
                <DetailsModal ref={(e) => this._PayModal = e}  />
                <OrderModal ref={(e) => this._OrderModal = e}/>
                <PayModalBox ref={(e) => this._PayModalBox = e} onChangeMsg={this.postMsg.bind(this)}/>
                <ShareAlertDialog show={this.state.showSharePop} closeModal={(show) => {
                    this.setState({showSharePop: show})
                }}  wxShare = {this.wxShare.bind(this)}  wxpyqShare = {this.wxpyqShare.bind(this)} qqShare = {this.qqShare.bind(this)}
                                  qqkjShare = {this.qqkjShare.bind(this)} wbShare = {this.wbShare.bind(this)} haoyouShare={this.haoyouShare.bind(this)} qzShare = {this.qzShare.bind(this)} {...this.props}/>

            </Container>
        )

    }
    postMsg(){
        let {themeId} = this.props;
        activityClassifyStore.getThemeActivityList(themeId);
    }
    openPayBox(){
        let {themelistId}=activityClassifyStore;
        this._PayModalBox.show(themelistId);
    }
    changeList(id,free){

        this.refs.list.scrollTo([0, 0]);
        if(free==1){
            this.openPayBox(id);
        }else{
            activityClassifyStore.themelistId=id;
            activityClassifyStore.getOneActtivityGroup(id);
        }
    }
    openDetailsBox() {
        let {themelistId}=activityClassifyStore;
        this._PayModal.show(themelistId,1);

    }
    openOrderBox(){
        let {themelistId}=activityClassifyStore;
        activityClassifyStore.addMySubscribe(1,themelistId,this._OrderModal.show.bind(this._OrderModal))
        activityClassifyStore.fetchActivityClassifyList(1);

    }




}


const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};
