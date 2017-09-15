import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {Title, Right, Body, Text, Button, Icon} from "native-base";
import {View, Image, TouchableHighlight, TextInput, Alert, TouchableOpacity} from "react-native";
import {Container, Header, HeaderIcon, Content} from "../../components/index";
import userStore from "../../mobx/userStore";
import dynamicStore from "../../mobx/dynamicStore";
import moment from './assets/moment';
import styles from "./assets/styles";
import DynamicList from './components/DynamicList';
import DynamicHeader from './components/DynamicHeader';
import DynamicCommon from './components/DynamicCommon'
import DynamicSupport from './components/DynamicSupports';
import DynamicComment from './components/DynamicComments';

/**
 * 动态
 */
@observer
export default class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        dynamicStore.fetchDynamicList({refresh: true}, this.refs.gifted._postRefresh);
    }


    render() {
        return (
            <Container>
                <Header menu {...this.props} right={
                    <Right>
                        <Button transparent onPress={this.skipToNew.bind(this)}><Icon
                            name="ios-create-outline"/></Button>
                    </Right>
                }/>
                <Content white>
                    <DynamicList
                        renderHeader={this._renderHeader.bind(this)}
                        enableEmptySections={true}
                        rowView={this._renderRowView.bind(this)}
                        onFetch={this._onFetch.bind(this)}
                        firstLoader={true}
                        pagination={true}
                        refreshable={true}
                        withSections={false}
                        ref="gifted"
                    />
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

    _renderHeader() {
        let {loginUser} = userStore;
        return (
            <DynamicHeader
                user={loginUser}
            />
        );
    }

    _renderRowView(info, sectionID, rowID) {
        let {loginUser} = userStore;

        // var m = '刚刚';
        // if (info.createTime) {
        //     m = moment(info.createTime).fromNow();
        // }
        return (
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
                    {info.show ? (
                        <View style={styles.show}>
                            <Button onPress={this._zan.bind(this, info)} transparent dark style={styles.divid}>
                                {info.flag ? <Text style={styles.showoneText}>取消</Text> :
                                    <Text style={styles.showoneText}>点赞</Text>}
                            </Button>
                            <Text style={styles.showoneText}>|</Text>
                            <Button onPress={this._comment.bind(this, info.id)} transparent dark style={styles.divid}>
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
        )
    }


    _onFetch(page, callback, options, flag) {
        dynamicStore.fetchDynamicList(options, callback);
    }

    /*
     * 发表动态
     * */
    skipToNew() {
        dynamicStore.clearImgList();
        Actions.newDynamic()
    }

    _delete(id) {
        Alert.alert('', '确定删除吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.del(id, this.refs.gifted._postRefresh, 'list')
            }
        ])
    }

    _onMessage(id) {
        dynamicStore.show(id, this.refs.gifted._postRefresh);
    }

    _zan(info) {
        dynamicStore.zan(info, this.refs.gifted._postRefresh, 'list');
    }

    _comment(infoid) {
        this.setState({
            commentShow: true,
        });
        this.commentID = infoid;
    }

    _onSubmitEditing(event) {
        dynamicStore.addComment(event, this.commentID, this.refs.gifted._postRefresh, 'list');
        this.setState({
            commentShow: false,
        })
    }
}
