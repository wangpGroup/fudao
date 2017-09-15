import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Left, Right, Body, Text, Button,Icon} from "native-base";
import {Platform, View, Image, ScrollView, TouchableHighlight, TouchableOpacity, TextInput, NetInfo, Alert} from "react-native";
import styles from "./assets/styles";
import moment from './assets/moment.js'
import {Actions} from "react-native-router-flux";
import DynamicComment from './components/DynamicComments';
import DynamicSupport from './components/DynamicSupports';
import DynamicCommon from './components/DynamicCommon'
import {Container, Header, Content} from "../../components/index";
import dynamicStore from "../../mobx/dynamicStore";
import userStore from "../../mobx/userStore";


/**
 * 动态
 */
@observer
export default class DynamicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
            show: false
        }
    }

    render() {
        let {loginUser} = userStore;
        let {info} = dynamicStore;
        return (
            <Container>
                <Header  {...this.props} title="详情" left={
                    <Left>
                        <Button transparent onPress={() => Actions.pop({refresh: {newnew: true}})}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                }/>
                <Content white>
                    <View style={styles.dynamic}>
                        <DynamicCommon info={info} newnew={this.props.newnew}/>
                        <View style={styles.showContain}>
                            <View style={styles.timeAndDelete}>
                                <Text style={styles.time}>{info.time}</Text>
                                {info.user && info.user.id == loginUser.id ? (
                                    <TouchableOpacity onPress={this._delete.bind(this, info.id)}>
                                        <Text style={styles.delete}>删除</Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                            {this.state.show ? (
                                <View style={styles.show}>
                                    <Button onPress={this._zan.bind(this, info)} transparent dark style={styles.divid}>
                                        {info.flag ? <Text style={styles.showoneText}>取消</Text> :
                                            <Text style={styles.showoneText}>点赞</Text>}
                                    </Button>
                                    <Text style={styles.showoneText}>|</Text>
                                    <Button onPress={this._comment.bind(this, info.id)} transparent dark
                                            style={styles.divid}>
                                        <Text style={styles.showoneText}>评论</Text>
                                    </Button>
                                </View>
                            ) : null}
                            <TouchableHighlight style={styles.showMessage} onPress={this._onMessage.bind(this, info.id)}
                                                underlayColor='#fafafa'>
                                <Image source={require('../../assets/message.png')}/>
                            </TouchableHighlight>
                        </View>
                        <DynamicSupport zan={info.praises}/>
                        <DynamicComment comments={info.comments}/>
                    </View>
                    {this.state.commentShow ? (
                        <View style={styles.textInputContain}>
                            <TextInput
                                placeholder='评论' autoFocus={true}
                                onEndEditing={() => {
                                    this.setState({commentShow: false})
                                }}
                                onSubmitEditing={this._onSubmitEditing.bind(this)}
                                style={styles.textInput}
                                underlineColorAndroid='transparent'/>
                        </View>
                    ) : null}
                </Content>
            </Container>
        )
    }

    _onMessage(id) {
        this.setState({
            show:!this.state.show
        })
    }

    _zan() {
        dynamicStore.zan(dynamicStore.info,()=>{},"detail")
        this.setState({
            show:false
        })
    }


    _comment(infoid){
        this.setState({
            commentShow:true,
        });
        this.commentID = infoid;

    }


    _onSubmitEditing(event){
        dynamicStore.addComment(event, this.commentID,()=>{}, 'detail');
        this.setState({
            commentShow:false,
            show:false
        })
    }


    _delete(id){
        Alert.alert('', '确定删除吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.del(id,()=>{}, 'detail')
            }
        ])
    }


}
