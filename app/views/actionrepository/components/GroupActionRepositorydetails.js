
import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,ListView} from "react-native";
import {Container, Content,Header} from "../../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon} from 'native-base';
import PayModal from "./PayModal";
import OrderModal from "./OrderModal";
import {observer} from "mobx-react/native";

import CircleProgress from '../../consult/components/CircleProgress';
import VideoPlayer from './video/VideoPlayer';
import userStore from "../../../mobx/userStore";
import activityClassifyStore from "../../../mobx/activityClassifyStore";

import ShareAlertDialog from "../../article/components/AlertShare";
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';



/**
 * 局部运动
 */
@observer
export default class GroupActionRepositorydetails extends Component {
    constructor(props) {
        super(props);
        this.obj = [];

        this.state = {
            showSharePop: false,//分享弹窗，默认不显示
        }

    }


    componentWillMount() {
        activityClassifyStore.getOneActtivityGroup(this.props.id);
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

        let {activityGroup} =activityClassifyStore;
        if(activityGroup){
            this.obj = activityGroup.activitys;
        }
        return (
            <Container>
                <Header {...this.props}/>
                <Content>
                    <ScrollView>
                        <View style={{width:'100%',height:300,backgroundColor:'#fff',marginBottom:10,alignItems:'center'}}>
                            <View style={{width:'100%',height:240}}>
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
                                    <Image source={require('../image/dingzhi.png')} style={{width: 50, height: 50}}/>
                                </View>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                                    <Image source={require('../image/dingzhi.png')} style={{width: 50, height: 50}}/>
                                </View>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                                    <Image source={require('../image/dingzhi.png')} style={{width: 50, height: 50}}/>
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
                                    <Image source={require('../image/dingzhi.png')} style={{width: 36, height: 35}}/>
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
                                    <Image source={require('../image/zhushi.png')} style={{width: 36, height: 36}}/>
                                </Button>
                                <Button transparent
                                        style={{
                                            width: 36,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop:10
                                        }}>
                                    <Image source={require('../image/jingyin.png')} style={{width: 36, height: 36}}/>
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

                                    <Image source={require('../../../assets/share.png')} style={{width: 36, height: 36}}/>
                                </Button>
                            </View>


                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                            <View style={{width: '22%',paddingTop:4}}>
                                <Text style={{textAlign: 'right',fontSize:12}}>
                                    方法：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20,fontSize:12}}>
                                    {/*{activityGroup.activitys[0].act_method}*/}
                                    {this.obj?this.obj[0].act_method:''}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                            <View style={{width: '22%',paddingTop:4}}>
                                <Text style={{textAlign: 'right',fontSize:12}}>
                                    效果：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20,fontSize:12}}>
                                    {/*{activityGroup.activitys[0].effect}*/}
                                    {this.obj?this.obj[0].effect:''}

                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                            <View style={{width: '22%',paddingTop:4}}>
                                <Text style={{textAlign: 'right',fontSize:12}}>
                                    注意：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20,fontSize:12}}>
                                    {/*{activityGroup.activitys[0].attention}*/}
                                    {this.obj?this.obj[0].attention:''}

                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                            <View style={{width: '22%',paddingTop:4}}>
                                <Text style={{textAlign: 'right',fontSize:12}}>
                                    禁忌：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20,fontSize:12}}>
                                    {/*{activityGroup.activitys[0].taboo}*/}
                                    {this.obj?this.obj[0].taboo:''}

                                </Text>
                            </View>
                        </View>


                        <PayModal ref={(e) => this._PayModal = e}  />
                        <OrderModal ref={(e) => this._OrderModal = e}/>





                    </ScrollView>
                </Content>
                <ShareAlertDialog show={this.state.showSharePop} closeModal={(show) => {
                    this.setState({showSharePop: show})
                }}  wxShare = {this.wxShare.bind(this)}  wxpyqShare = {this.wxpyqShare.bind(this)} qqShare = {this.qqShare.bind(this)}
                                  qqkjShare = {this.qqkjShare.bind(this)} wbShare = {this.wbShare.bind(this)} haoyouShare={this.haoyouShare.bind(this)} qzShare = {this.qzShare.bind(this)} {...this.props}/>

            </Container>

        )
    }
    openDetailsBox() {
        this._PayModal.show(this.props.id,1);

    }
    openOrderBox(){
        activityClassifyStore.addMySubscribe(1,this.props.id,this._OrderModal.show.bind(this._OrderModal));
        activityClassifyStore.fetchActivityClassifyList(1);

    }
}

const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};



