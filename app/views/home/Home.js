import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Dimensions, Image, Platform, WebView,View,Text,Modal,AppRegistry} from "react-native";
import {Actions} from "react-native-router-flux";


import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import {Container, Content} from "../../components/index";
import MyEnter from "./components/MyEnter"
import CircleProgress from '../consult/components/CircleProgress'



/**
 * 主页
 */
@observer
export default class Home extends Component {



    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            weather: '',
            wendu: '',
            img: '1',
            status: true,
            callMsgAndMsg:'333'
        };

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    render() {
        console.log(this.props.newnew);
        return (
            <Container>
                <Header  style={{backgroundColor:'#e3e7f3'}}>
                    <Left>
                        <Button style={{flexDirection:'row',width:140,height:30,backgroundColor:'#726585',borderBottomRightRadius:15,borderTopRightRadius:15,
                            alignItems:'center',justifyContent:'center',marginLeft:-10}}
                            onPress={()=>{Actions.consult()}}
                        >
                            <Text style={{color:'#fff'}}>今日运动 28组</Text>
                            <Image source={require('./image/arrows.png')} style={{width:14,height:22,marginLeft:10}}/>
                        </Button>

                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        <View style={{flexDirection:'row',width:140,height:30, alignItems:'center',justifyContent:'center'}}>

                            <Image source={require('./image/weather.png')} style={{width:35,height:27.5}}/>
                            <Text style={{color:'#424242',marginLeft:10,fontSize:16}}>28℃</Text>
                            <Text style={{color:'#424242',marginLeft:10,fontSize:16}}>120良</Text>
                        </View>

                    </Right>

                </Header>
                <Content style={{backgroundColor:'#fff'}}>
                    <Image source={require('./image/bj.png')} style={{width:'100%',height:'100%',position:'absolute',top:0}}/>

                    <View style={{width:'100%',height:'40%', alignItems:'center',justifyContent:'center'}}>

                        <CircleProgress
                            totalNum={100}
                            progress={70}
                        >
                            <Text style={{fontSize:8}}>活力值</Text>
                            <Text style={{fontSize:30}}>70分</Text>
                            <View style={{width:200,height:30,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('./image/bj.png')} style={{width:30,height:30,borderRadius:15}}>

                                </Image>
                                <Button transparent style={{position:'absolute',top:-10,left:100,}}
                                        onPress={()=>{Actions.ofTheHill()}}
                                >
                                    <Text style={{fontSize:8}}>占你山头</Text>
                                </Button>
                            </View>

                            <Image source={require('./image/hill.png')} style={{width:45,height:35}}/>

                        </CircleProgress>

                    </View>
                    <View style={{width:'100%',height:100,flexDirection:'column',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',marginTop:10}}>
                            90分，恭喜您已超过90%的圈子用户
                        </Text>
                        <Text style={{textAlign:'center',marginTop:10}}>
                            请您再接再厉
                        </Text>

                    </View>
                    <View style={{width:'100%',height:50,flexDirection:'row',justifyContent:'center'}}>
                        <Button style={{width:102,height:32,borderRadius:16,backgroundColor:'#726585',justifyContent:'center'}}
                                onPress={()=>{Actions.activity()}}
                        >
                            <Text style={{color:'#fff'}}>一键运动</Text>
                        </Button>
                    </View>
                    <View style={{width:'100%',height:141,position:'absolute',bottom:65}}>
                        <MyEnter onChangMsg={(msg)=> this.props.onChangMsg(msg)}/>
                    </View>



                </Content>


            </Container>
        )
    }
}

const styles = {

};
