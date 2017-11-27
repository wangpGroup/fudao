import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,ListView} from "react-native";
import {observer} from "mobx-react/native";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';
import GiftedListView from "./GiftedListView";


import {Actions} from "react-native-router-flux";
import activityClassifyStore from "../../../mobx/activityClassifyStore";



/**
 * 局部运动
 */
@observer
export default class PartMotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '头',
            head:true,//头
            neck:false,//颈
            upperLimb:false,//上肢
            lowerLimbs:false,//下肢
            trunk:false,//躯干
        }



    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        activityClassifyStore.getSearchActivityList(nextProps.text,this.state.text,1,this.refs.hill._postRefresh)
    }
    render() {

        return (
            <ScrollView style={{marginTop:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
                    <TouchableOpacity onPress={()=>{this.changepart('头')}}>
                        <View style={{width:30,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:this.state.head?'#ffffeb':'#cbd4ee'}}>
                            <Text style={{fontSize:12}}>头部</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.changepart('颈')}}>
                        <View style={{width:30,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:this.state.neck?'#ffffeb':'#cbd4ee'}}>
                            <Text style={{fontSize:12}}>颈部</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.changepart('躯干')}}>
                        <View style={{width:30,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:this.state.trunk?'#ffffeb':'#cbd4ee'}}>
                            <Text style={{fontSize:12}}>躯干</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.changepart('上肢')}}>
                        <View style={{width:30,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:this.state.upperLimb?'#ffffeb':'#cbd4ee'}}>
                            <Text style={{fontSize:12}}>上肢</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.changepart('下肢')}}>
                        <View style={{width:30,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:this.state.lowerLimbs?'#ffffeb':'#cbd4ee'}}>
                            <Text style={{fontSize:12}}>下肢</Text>
                        </View>
                    </TouchableOpacity>
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






            </ScrollView>
        )
    }
    changepart(part){
        let state = this.state;
        state.text=part;
        if(part=='头'){
            state.head=true;
            state.neck=false;
            state.upperLimb=false;
            state.lowerLimbs=false;
            state.trunk=false;
        }else if(part=='颈'){
            state.head=false;
            state.neck=true;
            state.upperLimb=false;
            state.lowerLimbs=false;
            state.trunk=false;
        }else if(part=='躯干'){
            state.head=false;
            state.neck=false;
            state.upperLimb=false;
            state.lowerLimbs=false;
            state.trunk=true;
        }else if(part=='上肢'){
            state.head=false;
            state.neck=false;
            state.upperLimb=true;
            state.lowerLimbs=false;
            state.trunk=false;
        }else{
            state.head=false;
            state.neck=false;
            state.upperLimb=false;
            state.lowerLimbs=true;
            state.trunk=false;
        }
        this.setState(state);
        activityClassifyStore.getSearchActivityList(this.props.text,part,1,this.refs.hill._postRefresh)

    }
    _onFetch(page = 1, callback ) {
        let{text}=this.props;
        activityClassifyStore.getSearchActivityList(text,this.state.text,page,callback)
    }

    _renderRowView(rowData,index,aaa) {




        return (
            <ListItem avatar style={styles.listItem} onPress={() => {Actions.partActionRepositorydetails({id:rowData.id})}}>
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
                    <Text style={{fontSize: 16, color: '#000'}}>{rowData.name}</Text>
                    <Text style={{fontSize: 12,marginLeft:10,color:'#666'}}>123</Text>
                </View>
                <Text style={{fontSize: 8}}>功效很重要，没有脖子不得了</Text>
                </Body>
                <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                    <View
                        style={[styles.circleView, {backgroundColor: '#cccccc'}]}>
                        <Text style={{fontSize:10}}>已打卡</Text>
                    </View>
                </Right>

                <Image source={require('../image/yipay.png')} style={{
                    width: 14,
                    height: 14,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}/>
            </ListItem>
        )
    }

};

const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};



