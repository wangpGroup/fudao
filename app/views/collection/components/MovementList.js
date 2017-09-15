import React, {PureComponent} from "react";
import {StyleSheet, View, ListView, RefreshControl,Alert,ToastAndroid,Image,Text,ScrollView} from "react-native";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';


export default class MovementList extends PureComponent {



    render() {
        const listArr=[
            {
                name:'鹿奔运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'手指运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'头部运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'腰部运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
        ]

        return (
            <ScrollView style={styles.listView}>
                {
                    listArr.map((k,i)=>(
                        <ListItem avatar style={styles.listItem} key={i}>
                            <Left>
                                <View style={styles.leftView}>
                                    <View style={{width:22,height:70}}>
                                        <Image source={require('../image/xiaolvren.png')} style={{width:22,height:70}}/>
                                        <Image source={require('../image/play.png')} style={{width:20,height:20,position:'absolute',top:25}}/>
                                    </View>
                                </View>
                            </Left>
                            <Body>
                            <Text style={{fontSize:24,color:'#000'}}>{k.name}</Text>
                            <Text style={{fontSize:8}}>{k.theory}</Text>
                            </Body>
                            <Right style={{flexDirection:'column',justifyContent:'center'}}>
                                <View style={styles.circleView}>
                                    <Text>{k.part}</Text>
                                </View>
                            </Right>
                        </ListItem>
                    ))
                }

            </ScrollView>
        )
    }


}
const styles = {
    listItem:{backgroundColor:'#fff',marginRight:0,marginLeft:0,marginBottom:10,marginTop:10,paddingTop:20,paddingBottom:20},
    leftView:{width:70,height:70,flexDirection:'row',justifyContent:'center'},
    circleView:{width:60,height:60,borderRadius:30,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}
}