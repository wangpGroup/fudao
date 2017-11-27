
import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,ListView} from "react-native";
import {Container, Content,Header} from "../../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon} from 'native-base';
import PayModal from "./PayModal";
import OrderModal from "./OrderModal";

import CircleProgress from '../../consult/components/CircleProgress';
import VideoPlayer from './video/VideoPlayer';
import userStore from "../../../mobx/userStore";
import activityClassifyStore from "../../../mobx/activityClassifyStore";



/**
 * 局部运动
 */

export default class PartActionRepositorydetails extends Component {

    componentWillMount() {
        activityClassifyStore.getOneActtivity(this.props.id);
    }
    render() {
        let {activityDetails} = activityClassifyStore;
        return (
        <Container>
            <Header {...this.props}/>
            <Content>
                <ScrollView>
                    <View style={{width:'100%',height:300,backgroundColor:'#fff',marginBottom:10}}>
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
                                {activityDetails.act_method}
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
                                {activityDetails.effect}
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
                                {activityDetails.attention}
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
                                {activityDetails.taboo}
                            </Text>
                        </View>
                    </View>


                    <PayModal ref={(e) => this._PayModal = e}  />
                    <OrderModal ref={(e) => this._OrderModal = e}/>





                </ScrollView>
            </Content>

        </Container>

        )
    }
    openDetailsBox() {
        this._PayModal.show();

    }
    openOrderBox(){
        this._OrderModal.show();
    }
}

const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};



