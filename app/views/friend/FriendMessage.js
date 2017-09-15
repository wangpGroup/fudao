import React, {Component} from "react";
import {Alert,ToastAndroid,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Header, Content, List, Separator} from "../../components/index";
import {Body, Left, Right, ListItem, Text, Button, Thumbnail, Icon, View} from "native-base";
import {observer} from "mobx-react/native";
import friendStore from "../../mobx/friendStore";

/**
 * 用户详情
 */
@observer
export default class FriendMessage extends Component {

    state = {
        user: {
            name:'阿布',
            id:'123456'
        }
    }

    render() {
        let {user}  = this.state;
        return (
            <Container >
                <Header {...this.props}/>
                <Content white>
                    <List style={styles.mar}>
                        <View style={styles.leftViewTop}>
                            <Image style={{width:60,height:60}} source={require('../../assets/avatar.jpg')}/>
                        </View>
                        <View style={{borderBottomWidth:0}}>
                            <Text style={{flex:1}}>
                                {user.name}
                            </Text>
                            <Text note  style={{flex:1}}>
                                登录号：{user.id}
                            </Text>
                        </View>
                    </List>
                    <List style={styles.mar}>
                        <View style={styles.leftView}>
                            <Text>活力值：</Text>
                        </View>
                        <Text>123分</Text>
                    </List>
                    <List style={styles.mar}>
                            <View style={styles.leftView}>
                                <Text style={{lineHeight:40}}>圈子：</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{width:60,height:60,marginRight:10}} source={require('../../assets/avatar.jpg')}/>
                                <Image style={{width:60,height:60,marginRight:10}} source={require('../../assets/avatar.jpg')}/>
                                <Image style={{width:60,height:60}} source={require('../../assets/avatar.jpg')}/>
                            </View>
                            <View style={{justifyContent:'flex-end',}}>
                                <Icon  style={{lineHeight:40}} name="ios-arrow-forward"/>
                            </View>
                    </List>
                    <Button block style={styles.button} onPress={this._sendMsg.bind(this)}>
                        <Text>发消息</Text>
                    </Button>
                    <Button bordered  block style={styles.buttonBor} onPress={this._deleteFriend.bind(this)}>
                        <Text style={styles.btnText}>删除好友</Text>
                    </Button>
                </Content>
            </Container>
        );
    }



    componentDidMount() {
        let {dispatch, userId} = this.props;

        // 获取用户信息
        //dispatch(showLoading());
        request.getJson(urls.apis.USER_DETAIL, {
            userId
        }).then((result) => {
            dispatch(hideLoading());
            if (result.success) {
                let user = Object.assign({}, {
                    ...result.obj.acountInfo,
                    ...result.obj.userInformation,
                })
                this.setState({
                    user
                })
            } else {
                tools.showToast('获取用户信息失败', ToastAndroid.SHORT);
            }
        }, (error) => {
            dispatch(hideLoading());
        });

    }

    // 发消息
    _sendMsg() {


    }

    // 删除好友
    _deleteFriend() {
        let {user} = this.state;
        Alert.alert("删除好友", '您确定要删除好友' + user.username + '吗？', [{
            text: '取消'
        }, {
            text: '确定', onPress: () => this.deleteFriend()
        }])
    }

    deleteFriend() {
        let {user} = this.state;


        // 获取用户信息
        //dispatch(showLoading());
        request.getJson(urls.apis.FRIEND_DELETEMYFRIEND, {
            friendId:user.id
        }).then((result) => {
            if (result.ok) {
                tools.showToast('删除成功', ToastAndroid.SHORT);
                friendStore.fetchMyFriendList()
                Actions.pop()
                let {friendNickMap} = friendStore
                delete friendNickMap[user.id]
            } else {
                tools.showToast('删除失败', ToastAndroid.SHORT);


            }
        }, (error) => {
            dispatch(hideLoading());
        });
    }

}

const styles = {
    button: {
        marginLeft: 15,
        marginRight: 15,
        marginTop:30
    },
    buttonBor:{
        marginLeft: 15,
        marginRight: 15,
        marginTop:10,
        borderColor:'#726585',
        borderWidth:1
    },
    manIcon: {
        fontSize: 15,
        color: '#50A1F2'
    },
    womanIcon: {
        fontSize: 15,
        color: '#EF7155'
    },
    bgWhite:{
        backgroundColor:'#fff'
    },
    mar:{
        flexDirection:'row',
        marginTop:20,
        backgroundColor:'#e3e7f3',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:10,
    },
    btnText:{
        color:'#726585'
    },
    leftView:{
        width:60,
        flexDirection:'row',
        justifyContent:'center',
    },
    leftViewTop:{
        width:60,
        flexDirection:'row',
        justifyContent:'center',
        marginRight:10
    }

};

FriendMessage.propTypes = {
    userId: React.PropTypes.string, // 用户ID
}

FriendMessage.defaultProps = {
    userId: '867200022156895,86720002215690328312757'
}


