import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity,ListView} from "react-native";
import {observer} from "mobx-react/native";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header,Item,Input} from 'native-base';
import {Actions} from "react-native-router-flux";
import GiftedListView from "./GiftedListView";
import activityClassifyStore from "../../../mobx/activityClassifyStore";





/**
 * 组合运动
 */
@observer
export default class GroupMotion extends Component {


    componentWillReceiveProps(nextProps) {
        activityClassifyStore.getSearchActivityGroup(nextProps.text,1,this.refs.hill._postRefresh)
    }
    render() {



        return (
            <ScrollView style={{marginTop:10}}>
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
    _onFetch(page = 1, callback ) {
        let{text}=this.props;
        activityClassifyStore.getSearchActivityGroup(text,page,callback)
    }

    _renderRowView(rowData,index,aaa) {

        return (
            <ListItem avatar style={styles.listItem} onPress={() => Actions.groupActionRepositorydetails({id:rowData.id})}>
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
                <Text style={{fontSize: 8}}>功效很重要，没有脖子不得了</Text>
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
        )
    }

}

const styles = {
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10,backgroundColor:'#fff'},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};



