import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,AppRegistry,
    ListView,
    StyleSheet,
    TouchableHighlight} from "react-native";
import {Container, Content} from "../../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';
import PayModal from "./PayModal";
import OrderModal from "./OrderModal";
import PayModalBox from "./PayModalBox";
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';

import CircleProgress from '../../consult/components/CircleProgress';
import VideoPlayer from './video/VideoPlayer';
import userStore from "../../../mobx/userStore";
import activityClassifyStore from "../../../mobx/activityClassifyStore";
import GiftedListView from "./GiftedListView";


import {observer} from "mobx-react/native";



/**
 * 局部运动
 */
@observer
export default class GroupMotion extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this._rows = {};
        this.openCellId = null;

    }

    componentWillMount() {

        activityClassifyStore.fetchActivityClassifyList(1);

    }
    safeCloseOpenRow() {
        // if the openCellId is stale due to deleting a row this could be undefined
        if (this._rows[this.openCellId]) {
            this._rows[this.openCellId].closeRow();
        }
    }


    render() {
        let {groupActivityList,activityGroup,videoPath}=activityClassifyStore;





        return (
            <ScrollView ref="list">
                <View style={{width:'100%',height:320,backgroundColor:'#fff',marginBottom:10,alignItems:'center'}}>
                    <View style={{width:'100%',height:240}}>
                        <VideoPlayer
                            source={{uri: urls.apis.VIDEONEW + '?filePath=/video/activity/dianroutaiyang.mp4'}}

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
                    <View style={{width:200,height:60,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,marginBottom:10}}>
                        <View style={{width:60,height:60,borderWidth:2,borderColor:'#a198ae',justifyContent:'center',alignItems:'center',marginRight:6}}>
                            <Image source={require('../image/dongzuo.png')} style={{width: 40, height: 40}}/>
                        </View>
                        <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                            <Image source={require('../image/dongzuo.png')} style={{width: 40, height: 40}}/>
                        </View>
                        <View style={{width:56,height:56,borderWidth:1,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginRight:6}}>
                            <Image source={require('../image/dongzuo.png')} style={{width: 40, height: 40}}/>
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
                            <Image source={require('../image/dingzhi.png')} style={{width: 30, height: 30}}/>
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
                            <Image source={require('../image/zhushi.png')} style={{width: 30, height: 30}}/>
                        </Button>
                        <Button transparent
                                style={{
                                    width: 36,
                                    height: 36,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop:10
                                }}>
                            <Image source={require('../image/jingyin.png')} style={{width: 30, height: 30}}/>
                        </Button>

                    </View>


                </View>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true}
                    pagination={true}
                    refreshable={true}
                    withSections={false}
                    enableEmptySections={true}
                    locked={true}
                    ref="hill"

                />



                <View style={{width:'100%',height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text>热门推荐</Text>
                </View>
                {groupActivityList.map((i,k)=>(
                        <ListItem avatar style={styles.listItem} key={k} onPress={()=>{this.changeList(i.id)}}>
                            <Left>
                                <View style={styles.leftView}>
                                    <Image source={require('../image/play.png')}
                                           style={{width: 62, height: 62}}/>
                                    <Image source={require('../image/play.png')} style={{
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

                            {i.is_free == 1 && i.ispay==false? (<Image source={require('../image/daler.png')} style={{
                                width: 14,
                                height: 14,
                                position: 'absolute',
                                right: 0,
                                top: 0
                            }}/>) : (null)}
                            {i.ispay==true? (<Image source={require('../image/yipay.png')} style={{
                                width: 14,
                                height: 14,
                                position: 'absolute',
                                right: 0,
                                top: 0
                            }}/>) : (null)}
                        </ListItem>
                    )

                )}



                <PayModalBox ref={(e) => this._PayModalBox = e} onChangeMsg={this.postMsg.bind(this)}/>
                <PayModal ref={(e) => this._PayModal = e}  />
                <OrderModal ref={(e) => this._OrderModal = e}/>





            </ScrollView>
        )
    }
    _onFetch(page = 1, callback ) {

        activityClassifyStore.fetchSubscribeActivityList(1,page,callback)
    }

    _renderRowView(rowData,secId, rowId, rowMap) {

        return (
        <SwipeRow
            rightOpenValue={-75}
            onRowOpen = {_ => this.onRowOpen(secId, rowId, this._rows)}
            ref={row => this._rows[`${secId}${rowId}`] = row}
        >
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowData.subscribeid,secId, rowId, this._rows) }>
                    <Text style={styles.backTextWhite}>取消订制</Text>
                </TouchableOpacity>
            </View>
            <View>
                <ListItem avatar style={styles.listItem} onPress={() => {this.changeListb(rowData.id,rowData.subscribeid,rowData.is_free)}}>
                    <Left>
                        <View style={styles.leftView}>
                            <Image source={require('../image/play.png')}
                                   style={{width: 62, height: 62}}/>
                            <Image source={require('../image/play.png')} style={{
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
                        <Text style={{fontSize: 16, color: '#000'}}>{rowData.group_name}</Text>
                        <Text style={{fontSize: 12,marginLeft:10,color:'#666'}}>123</Text>
                    </View>
                    <Text style={{fontSize: 8}}>{rowData.effect}</Text>
                    </Body>
                    <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                        <View
                            style={[styles.circleView, {backgroundColor: rowData.isread ? '#cccccc' : '#726585'}]}>
                            {rowData.isread ? (<Text style={{fontSize:10}}>已打卡</Text>) : (<Text style={{color: '#fff',fontSize:10}}>打卡</Text>)}
                        </View>
                    </Right>
                    {rowData.is_free == 1 && rowData.ispay==false? (<Image source={require('../image/daler.png')} style={{
                        width: 14,
                        height: 14,
                        position: 'absolute',
                        right: 0,
                        top: 0
                    }}/>) : (null)}
                    {rowData.ispay==true? (<Image source={require('../image/yipay.png')} style={{
                        width: 14,
                        height: 14,
                        position: 'absolute',
                        right: 0,
                        top: 0
                    }}/>) : (null)}


                </ListItem>
            </View>
        </SwipeRow>

        )
    }
    onRowOpen(secId, rowId, rowMap) {
        const cellIdentifier = `${secId}${rowId}`;
        if (this.openCellId && this.openCellId !== cellIdentifier) {
            this.safeCloseOpenRow();
        }
        this.openCellId = cellIdentifier;
        this.props.onRowOpen && this.props.onRowOpen(secId, rowId, rowMap);
    }

    deleteRow(id,secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        activityClassifyStore.deleteMySubscribe(id);
        activityClassifyStore.fetchRefreshSubscribeActivityList(1,1,this.refs.hill._postRefresh)
    }
    changeList(id){
        activityClassifyStore.grouplistId=id;
        activityClassifyStore.getOneActtivityGroup(id);
        this.refs.list.scrollTo([0, 0]);
    }
    changeListb(id,subscribeid,isfree){


        this.refs.list.scrollTo([0, 0]);
        if(isfree==1){
            this.openPayBox(id);
        }else{
            activityClassifyStore.grouplistId=id;
            activityClassifyStore.getOneActtivityGroup(id);
            activityClassifyStore.subscribeId=subscribeid;
        }
    }
    postMsg(){
        activityStore.fetchRefreshSubscribeActivityList(1,1,this.refs.hill._postRefresh);
    }
    openPayBox(){
        let {grouplistId}=activityClassifyStore;
        this._PayModalBox.show(grouplistId);
    }
    openDetailsBox() {
        let {grouplistId}=activityClassifyStore;
        this._PayModal.show(grouplistId,1);

    }
    openOrderBox(){
        let {grouplistId}=activityClassifyStore
        activityClassifyStore.addMySubscribe(1,grouplistId,this._OrderModal.show.bind(this._OrderModal));
        activityClassifyStore.fetchActivityClassifyList(1);



    }
}

const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10,backgroundColor:'#fff',flex:1},
    leftView: {width: 62, height: 62},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'},

    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,

    },
    backRightBtnRight: {
        backgroundColor: '#726585',
        right: 10
    },
    backTextWhite: {
        color: '#FFF'
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },

};



