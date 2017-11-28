import React, {Component} from "react";
import {Modal, View, Image, ListView,Dimensions} from "react-native";
import {Icon,Button, ListItem, Text,Switch,CheckBox,Body} from "native-base";
import {observer} from "mobx-react/native";
import activityStore from "../../../mobx/activityStore";
import activityClassifyStore from "../../../mobx/activityStore";
import {Container, Header, Content, WebView} from "../../../components";
const time=[{index:1,name:'周一'},
    {index:2,name:'周二'},
    {index:3,name:'周三'},
    {index:4,name:'周四'},
    {index:5,name:'周五'},
    {index:6,name:'周六'},
    {index:7,name:'周日'},];

/**
 * 我的能量场 > 资料填写
 */
@observer
export default class OrderModal extends Component {

    constructor(props) {
        super(props);


        this.state = {
            ...props,
            visible: false,
            text:'{"imgPath":"zixun/1.3.jpg","title":"点一支薰衣草窗前明月光的休息一下吧~","content":"以两手搓热环摸脐周，谁知盘中餐，少用力按摩腹部提拿腹肌，以一手会当临绝顶，一览众山小"}',
            zu:{},
            week:[{index:0,name:'周一',sta:false},
                {index:1,name:'周二',sta:false},
                {index:2,name:'周三',sta:false},
                {index:3,name:'周四',sta:false},
                {index:4,name:'周五',sta:false},
                {index:5,name:'周六',sta:false},
                {index:6,name:'周日',sta:false},],
            time:{shi:'0',fen:'0'},
            id:''
        }
    }

    /**
     * 分组
     */




    render() {
        let {visible} = this.state;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
                onLayout={({nativeEvent:e})=>this.layout(e)}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <View style={styles.header}>

                        <View style={{width:25}}>
                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color:'#FFF', fontSize: 20}}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{width:'100%',height:150,borderBottomWidth:1,borderBottomColor:'#cecece',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../image/succeed.jpg')} style={{width: 90, height: 62}}/>
                        <Text style={{fontSize:16}}>
                            成功加入私人订制
                        </Text>

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50,backgroundColor:'#eeeeee',padding:20}}>
                        <Text>设定活动时间</Text>
                        <Switch value={true}/>

                    </View>
                    <View style={{width:'100%',height:170}}>
                        <WebView uri={urls.pages.MODIFICATIONTIME} onMessage={(event)=>this.accept(event.nativeEvent.data)}/>
                    </View>
                    <View style={{width:'100%',height:40,padding:20,flexDirection:'row',flexWrap:'wrap'}}>
                        {this.state.week.map((i,k)=>(
                            <View style={{width:'25%',height:50,flexDirection:'row',alignItems:'center' }} key={k}>
                                <CheckBox  checked={i.sta} onPress={()=>{this.changeSta(i.index,!i.sta)}}/>
                                <Body>
                                <Text >{i.name}</Text>
                                </Body>
                            </View>
                        ))}


                    </View>

                    <Button style={{position:'absolute',bottom:0,width:'100%',height:50,justifyContent:'center'}} onPress={()=>{this.finish()}}>
                        <Text style={{color:'#fff'}}>
                            完成
                        </Text>
                    </Button>





                </View>


            </Modal>
        )
    }
    finish(){

        let shi=parseInt(this.state.time.shi)+1
        let fen=this.state.time.fen*5;
        if(fen<10){
            fen='0'+fen;
        }
        let time=shi+':'+fen;
        let arr=[];
        this.state.week.map((i)=>{
            if(i.sta){
                arr.push(i.index+1);
            }
        })
        let str=arr.join(',');
        request.getJson(urls.apis.PUSHMYSUBSCRIBE,{id:this.state.id,pushTime:time,pushDay:str})
        .then((result) => {
            if (result.ok) {
                tools.showToast("添加成功！")
                this.hide();

            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    accept(data){

        let arr=data.split('+')
        let state=this.state;
        if(arr[0]==0){
            state.time.shi=arr[1]
        }else{
            state.time.fen=arr[1]
        }
        this.setState(state);

    }

    changeSta(indx,sta){
        let state= this.state;
        this.state.week[indx].sta=sta;
        state.week=this.state.week;
        this.setState(state);

    }



    /**
     * 打开对话框
     * @param data
     */
    show(id) {
        let state = {
            visible: true,
            id: id,

        };
        this.setState(state);



    }

    /**
     * 关闭对话框
     */
    hide() {
        this.setState({
            visible: false
        })
    }


}


const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
        justifyContent:'center'
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
        borderRadius: 3,
        opacity: 1,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 6,
        flexDirection: 'row',
        position: "absolute",
        zIndex:10000

    },
    headerText: {
        fontSize: theme.fontSizeH4
    },
    closeButton: {
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        borderRadius: 12,
        width: 24,
        height: 24,
        paddingLeft: 0,
        paddingRight: 0,
    },
};





