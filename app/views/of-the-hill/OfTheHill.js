import React, {Component}  from "react";
import {View, Image, Text,ScrollView,WebView} from "react-native";
import {observer} from "mobx-react/native";
import {Container, Content} from "../../components/index";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon} from 'native-base';
import {Actions} from "react-native-router-flux";
import Swiper from "react-native-swiper";
const listArr=[
    {
        imgUrl:require('./image/hill.png'),
        name:'王小二',
        noun:'第一名',
        grade:'99',
        time:22,
        praise:false
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'张三',
        noun:'第二名',
        grade:'107',
        time:34,
        praise:true
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'李四',
        noun:'第3名',
        grade:'33',
        time:2,
        praise:true
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'李四',
        noun:'第3名',
        grade:'33',
        time:2,
        praise:false
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'李四',
        noun:'第3名',
        grade:'33',
        time:2,
        praise:false
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'李四',
        noun:'第3名',
        grade:'33',
        time:2,
        praise:false
    },
    {
        imgUrl:require('./image/hill.png'),
        name:'李四',
        noun:'第3名',
        grade:'33',
        time:2,
        praise:true
    },
]



/**
 * 资讯
 */
@observer
export default class OfTheHill extends Component {


    render() {

        return (
            <Container>
                <Content>
                    <View style={styles.topView}>
                        <Button transparent style={{position:'absolute',zIndex:1000,top:-1,left:-1}}
                                onPress={()=>{Actions.pop()}}>
                            <Icon name="arrow-back"/>
                        </Button>

                        <Swiper style={styles.wrapper}
                                showsButtons={false}
                                paginationStyle={{bottom:10}}
                                activeDot={(<View style={{backgroundColor:'#000', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}}
                                dot={(<View style={{backgroundColor:'#fff', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />)}/>)}>
                            <View style={styles.slide1}>
                                <View style={{width:260,height:120,position:'absolute',bottom:0}}>
                                    <Image source={require('./image/hill.png')} style={{width:260, height:120}} />
                                    <Image source={require('./image/line1.png')}  style={{width:50, height:22, position: 'absolute',top:18, left:55}} />
                                    <View style={{width:100, height:12,position:'absolute', top:-10, left:-10}}>
                                        <Text>主子,快来替我赎身 我被霸占了</Text>
                                    </View>
                                </View>
                                <View style={{width:50,height:50,position:'absolute',top:30}}>
                                    <Image source={require('./image/himanshu.png')} style={{width:50,height:50,borderRadius:25}}/>
                                    <Image source={require('./image/line2.png')} style={{width:30,height:15,position:'absolute', top:20, left:47}}/>
                                    <View style={{width:100, height:12,position:'absolute', top:-10, left:72}}>
                                        <Text>哇哈哈哈  娃哈哈</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.slide2}>
                                <Image source={require('./image/bj.png')} style={{width:'100%',height:'100%',position:'absolute'}}/>
                                <View style={{width:200,height:40, marginTop:20}}>
                                    <Text style={{textAlign:'center',color:'#fff'}}>您已占领 31 名好友的山头</Text>
                                    <Text style={{textAlign:'center',color:'#fff'}}>厉害了我的哥</Text>
                                </View>

                                <View style={{width:300,height:50,flexDirection:'row',justifyContent:'center',marginTop:10}}>
                                    <Image source={require('./image/himanshu.png')} style={{width:50, height:50, borderRadius: 50,}} />
                                    <Image source={require('./image/himanshu.png')} style={{width:50, height:50, borderRadius: 50,}} />
                                    <Image source={require('./image/himanshu.png')} style={{width:50, height:50, borderRadius: 50,}} />
                                    <Image source={require('./image/himanshu.png')} style={{width:50, height:50, borderRadius: 50,}} />
                                </View>
                                <View style={{width:200,height:20,marginTop:16}}>
                                    <Text style={{textAlign:'center',color:'#fff'}}>在此输入占山狂语</Text>
                                </View>
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.bottomView}>
                        <ScrollView>
                            <ListItem avatar style={{marginBottom:15,
                                marginLeft:0,
                                backgroundColor:'#e3e7f3',
                                paddingLeft:10,
                                marginTop:15
                            }}>
                                <Left>
                                    <Thumbnail source={require('./image/hill.png')} />
                                </Left>
                                <Body>
                                <Text>王朋</Text>
                                <Text note>第二十二名</Text>
                                </Body>
                                <Right >
                                    <Text style={styles.colorFont}>69分</Text>
                                </Right>
                                <Right style={{flexDirection:'column',justifyContent:'center'}}>
                                    <Text note style={{textAlign:'center',width:20}}>11</Text>
                                    <Image source={require('./image/heart.png')}
                                           style={styles.heartImage} >
                                    </Image>
                                </Right>
                            </ListItem>

                            {
                                listArr.map((k,i)=>(
                                    <ListItem avatar key={i} style={styles.listView}>
                                        <Left>
                                            <Thumbnail source={k.imgUrl} />
                                        </Left>
                                        <Body>
                                        <Text>{k.name}</Text>
                                        <Text note>{k.noun}</Text>
                                        </Body>
                                        <Right >
                                            <Text style={styles.colorFont}>{k.grade} 分</Text>
                                        </Right>
                                        <Right style={{flexDirection:'column',justifyContent:'center'}}>
                                            <Text note style={{textAlign:'center',width:20}}>{k.time}</Text>
                                            {k.praise?(<Image source={require('./image/heart.png')}
                                                              style={styles.heartImage} >
                                            </Image>):<Image source={require('./image/nullheart.png')}
                                                             style={styles.heartImage} >
                                            </Image>}

                                        </Right>
                                    </ListItem>
                                ))
                            }


                        </ScrollView>
                    </View>


                </Content>
            </Container>
        )

    }


}


const styles = {
    listView:{
        marginBottom:10,
        marginLeft:0,
        backgroundColor:'#f4f4f4',
        paddingLeft:10
    },
    bottomView:{
        width:'100%',
        height:'70%',
        backgroundColor:'#fff'
    },
    topView:{
        width:'100%',
        height:'30%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'#e3e7f3'
    },
    colorFont:{
        color:'#e76200',
        fontSize:26
    },
    image:{
        width:'64%',
        height:102,
        position:'absolute',
        top:90


    },
    heartImage:{
        width:20,
        height:18,
        marginLeft:20
    },
    tabView: {
        flex: 1,
        flexGrow: 1,
    },
    wrapper: {
    },
    slide1: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#e3e7f3',
    },
    slide2: {
        flex: 1,
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
};