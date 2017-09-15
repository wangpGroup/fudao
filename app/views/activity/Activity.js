import React, {Component} from "react";
import {View, Image, Text,ScrollView,WebView,Dimensions,Platform} from "react-native";
import {Actions} from "react-native-router-flux";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../components/index";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import Parabola from 'react-native-smart-parabola'
import CircleProgress from '../consult/components/CircleProgress'
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
let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56

/**
 * 活动
 */
@observer
export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state={
            collect:false,
            isTrigger: false,
            start: {x:0,y:0},
            end: {x:0,y:0},
        }
        this._startPositions = {}
        this._endPositions = {}


    }


    render() {
        let {title} = this.props;
        let requ=this.state.collect?require('./image/heart.png'):require('./image/nullheart.png')
        let chahe= title=='活动'?'选择场合':'更多场合'

        return (
            <Container>
                <Header  style={{backgroundColor:'#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>
                            {title}
                        </Text>

                    </Body>
                    <Right>
                        <Button style={{flexDirection:'row',width:120,height:30,backgroundColor:'#726585',borderBottomLeftRadius:15,borderTopLeftRadius:15,
                        alignItems:'center',justifyContent:'center',marginRight:-10}} onPress={() => Actions.index({page:1})}>
                            <Text style={{color:'#fff'}}>{chahe}</Text>
                            <Image source={require('./image/jia.png')} style={{width:21.5,height:22,marginLeft:10}}/>
                        </Button>
                    </Right>

                </Header>
                <Content>

                    <View style={{backgroundColor:'#fff',flex:1}}>
                        <View style={{width:'100%',height:220,paddingTop:50,flexDirection:'row',justifyContent:'center',flex:1}}>
                            <View style={{width:70,height:220}}>
                                <Image source={require('./image/xiaolvren.png')} style={{width:70,height:220}}/>
                                <Image source={require('./image/play.png')} style={{width:70,height:70,position:'absolute',top:80}}/>
                            </View>

                        </View>
                        <View style={{padding:10}}>

                            <Text style={{fontSize:26,paddingLeft:20,color:'#000'}}>
                                3/10
                            </Text>
                        </View>
                        <View  onLayout={this._onLayoutCart1}
                               style={{width:60,height:60,position:'absolute',top:10,right:10}}>
                            <CircleProgress totalNum={100}
                                            progress={70}
                                            radius={24}
                                            baseWidth={4}
                                            progressWidth={5}
                            >
                                <Text>70</Text>
                            </CircleProgress>


                        </View>
                        <Button transparent onPress={()=>{this.setState({collect:!this.state.collect, isTrigger: false})}}
                                style={{width:45,
                                    height:45,
                                    position:'absolute',
                                    top:70,
                                    right:24,
                                    borderRadius:30,
                                    borderColor:'#b5b5b5',
                                    borderWidth:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                            <Image source={requ} style={{width:22,height:20}}/>
                        </Button>


                    </View>
                    <ScrollView style={{height:'46%',backgroundColor:'#ebeef6'}}>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'center',flex:1,marginTop:30}}>

                            <Button onLayout={ this._onLayout1.bind(this, 'key-1') }
                                    onPress={this._onPressHandler_1.bind(this, 'key-1')}
                                    touchableType={'blur'}
                                style={{width:82,height:32,borderRadius:16,backgroundColor:'#726585',justifyContent:'center'}}>
                                <Text style={{color:'#fff'}}>完成</Text>
                                <View style={{position: 'absolute',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#fff',
                                    borderColor:'#817c88',
                                    borderWidth:1,
                                    top:0,
                                    right:0,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{color:'red'}}>+5</Text>
                                </View>
                            </Button>

                        </View>
                        <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                            <View style={{width:'26%'}}>
                               <Text style={{textAlign:'right'}}>
                                   原理：
                               </Text>
                            </View>

                            <View style={{width:'66%'}}>
                                <Text style={{lineHeight:20}}>
                                    腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。
                                    <Text style={{fontSize:8,color:'#8b6ab3'}}>展开全文∨</Text>
                                </Text>

                            </View>
                        </View>
                        {
                            listArr.map((k,i)=>(
                                <ListItem avatar style={styles.listItem} key={i}>
                                    <Left>
                                        <View style={styles.leftView}>
                                            <View style={{width:22,height:70}}>
                                                <Image source={require('./image/xiaolvren.png')} style={{width:22,height:70}}/>
                                                <Image source={require('./image/play.png')} style={{width:20,height:20,position:'absolute',top:25}}/>
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




                    <Parabola
                        isTrigger={this.state.isTrigger}
                        rate={0.9}
                        start={this.state.start}
                        end={this.state.end}
                        renderParabola={this._renderParabola}
                    />
                </Content>
            </Container>
        )

    }
    _onLayout1 = (key, e) => {

        let {x, y} = e.nativeEvent.layout
        console.log(`x: ${x}, y: ${y}, dw: ${deviceWidth}, dh: ${deviceHeight}, contentTop: ${contentTop}`)
        this._startPositions[ key ] = {
            start: {
                x: x + 80,
                y: y + 300,
            },

        }
    }
    _onLayoutCart1 = (e) => {
        let {x, y} = e.nativeEvent.layout
        this._endPositions[ 'cart-1' ] = {
            x: x + 16,
            y: y + 35,
        }
    }
    _onPressHandler_1 (key, e) {
        let startPositions = this._startPositions[ key ]

        startPositions.end = this._endPositions[ 'cart-1' ]

        let {start, end} = startPositions

        this.setState({
            isTrigger: true,
            start,
            end,
        })
    }
    _renderParabola = ({index, translateX, translateY}) => {
        return (
            <View
                key={`'parabola-ball-'${index}`}
                style={[
                    {position: 'absolute',},    //Don't forget to set this
                    {width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',borderColor:'#817c88',borderWidth:1},
                    {transform: [{translateX}, {translateY}]},
                ]}
            >
                <Text style={{color:'red'}}>+5</Text>
            </View>

        )
    }


}


const styles = {
    listItem:{backgroundColor:'#fff',marginRight:10,marginLeft:10,marginBottom:10,flex:1},
    leftView:{width:70,height:70,flexDirection:'row',justifyContent:'center'},
    circleView:{width:60,height:60,borderRadius:30,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}

};