import React, {Component} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {Button, Text} from "native-base";
import {Container, Content} from "../../components";
import {Actions, ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import UserStore from "../../mobx/userStore";
import UserButton from "./components/UserButton";
import * as Wechat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';
let resolveAssetSource = require('resolveAssetSource');
@observer
export default class Start extends Component {

    componentWillMount() {
        if (UserStore.isLogin) {
            Actions.index({type: ActionConst.REPLACE});
        }
    }

    wxLogin() {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        Wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    Wechat.shareToTimeline({
                        type: 'news',
                        title: '福道健康环',
                        description: '福道健康环',
                        webpageUrl: 'www.baidu.com',
                        imageUrl: resolveAssetSource(require('../../assets/pyq.png')).uri
                    }).then(res => {
                        console.log(res)
                    })
                } else {
                    Toast.showShortCenter('没有安装微信软件，请您安装微信之后再试');
                }
            });
        // Wechat.isWXAppInstalled()
        //     .then((isInstalled) => {
        //         if (isInstalled) {
        //             Wechat.sendAuthRequest(scope, state)
        //                 .then(responseCode => {
        //                     console.log(responseCode)
        //                     // this.getAccessToken(responseCode.code);
        //                 })
        //             // .catch(err => {
        //             //     alert('登录授权发生错误：', err.message, [
        //             //         {text: '确定'}
        //             //     ]);
        //             // })
        //         } else {
        //             alert('没有安装微信')
        //         }
        //     })
    }

    qqLogin() {
        let scope = 'get_simple_userinfo';
        let url;
        QQAPI.login(scope)
            .then(res => {
                url = 'https://graph.qq.com/user/get_user_info?access_token=' + res.access_token + '&oauth_consumer_key=' + res.oauth_consumer_key + '&openid=' + res.openid;
                console.log({
                    access_token: "CFA4801ACEA19D218687BC2D1C8543EC",
                    errCode: 0,
                    expires_in: 1505370037958,
                    oauth_consumer_key: "1106338651",
                    openid: "5444E7A9E072532A8079B3F0231F6799"
                })
            })
            .then(() => {
                    request.getJson(url)
                        .then((res) => {
                            console.log({
                                city: "墨尔本",
                                figureurl: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/30",
                                figureurl_1: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/50",
                                figureurl_2: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/100",
                                figureurl_qq_1: "http://q.qlogo.cn/qqapp/1106338651/5444E7A9E072532A8079B3F0231F6799/40",
                                figureurl_qq_2: "http://q.qlogo.cn/qqapp/1106338651/5444E7A9E072532A8079B3F0231F6799/100",
                                gender: "男",
                                is_lost: 0,
                                is_yellow_vip: "0",
                                is_yellow_year_vip: "0",
                                level: "0",
                                msg: "",
                                nickname: "ZhaN",
                                province: "维多利亚",
                                ret: 0,
                                vip: "0",
                                year: "1992",
                                yellow_vip_level: "0",
                            })
                        });
                }
            )
    }

    wbLogin() {
        let url;
        WeiboAPI.login()
            .then(res => {
                // url = 'https://api.weibo.com/2/eps/user/info.json?access_token=' + res.accessToken + '&uid=' + res.userID;
                url = 'https://api.weibo.com/2/users/show.json?access_token=' + res.accessToken + '&uid=' + res.userID;
                // console.log({
                //     accessToken: "2.00udoWOG0y9F3e7a76904d7cbvYnkC",
                //     errCode: 0,
                //     expirationDate: 1663064368338,
                //     refreshToken: "2.00udoWOG0y9F3ea6576aeaebQenAPD",
                //     type: "WBAuthorizeResponse",
                //     userID: "5711486866",
                // })
            })
            .then(() => {
                    request.getJson(url)
                        .then((res) => {
                            console.log({
                                allow_all_act_msg: false,
                                allow_all_comment: true,
                                avatar_hd: "http://tva1.sinaimg.cn/crop.0.617.1394.1394.1024/006ewODUjw1f5369s4kgrj312w2131kx.jpg",
                                avatar_large: "http://tva1.sinaimg.cn/crop.0.617.1394.1394.180/006ewODUjw1f5369s4kgrj312w2131kx.jpg",
                                bi_followers_count: 2,
                                block_app: 0,
                                block_word: 0,
                                city: "5",
                                class: 1,
                                cover_image_phone: "http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg",
                                created_at: "Fri Dec 04 15:41:30 +0800 2015",
                                credit_score: 80,
                                description: "",
                                domain: "",
                                favourites_count: 0,
                                follow_me: false,
                                followers_count: 6,
                                following: false,
                                friends_count: 32,
                                gender: "m",
                                geo_enabled: true,
                                id: 5711486866,
                                idstr: "5711486866",
                                insecurity: {sexual_content: false},
                                lang: "zh-cn",
                                like: false,
                                like_me: false,
                                location: "北京 朝阳区",
                                mbrank: 0,
                                mbtype: 0,
                                name: "盖斯和乔布茨",
                                online_status: 0,
                                pagefriends_count: 0,
                                profile_image_url: "http://tva1.sinaimg.cn/crop.0.617.1394.1394.50/006ewODUjw1f5369s4kgrj312w2131kx.jpg",
                                profile_url: "u/5711486866",
                                province: "11",
                                ptype: 0,
                                remark: "",
                                screen_name: "盖斯和乔布茨",
                                star: 0,
                                status: {
                                    created_at: "Thu Sep 07 00:03:46 +0800 2017",
                                    id: 4149132869949089,
                                    mid: "4149132869949089",
                                    idstr: "4149132869949089",
                                    text: "转发微博",
                                },
                                statuses_count: 318,
                                story_read_state: -1,
                                urank: 4,
                                url: "",
                                user_ability: 0,
                                vclub_member: 0,
                                verified: false,
                                verified_reason: "",
                                verified_reason_url: "",
                                verified_source: "",
                                verified_source_url: "",
                                verified_trade: "",
                                verified_type: -1,
                                weihao: "",
                            })
                        });
                }
            )
    }

    render() {
        return (
            <Container>
                <Content gray>
                    <View style={styles.box}>
                        <Image style={styles.logo} source={require('../../assets/avatar.jpg')}/>
                    </View>
                    <UserButton icon underline text="手机号注册/登录" onPress={() => Actions.login()}/>
                    <View style={styles.box}>
                        <Text style={{marginTop: 30}}>----</Text>
                        <Text style={{marginTop: 30}}>其他登录方式</Text>
                    </View>
                    <View style={styles.imgBox}>
                        <TouchableOpacity activeOpacity={1} onPress={this.wxLogin.bind(this)}>
                            <Image style={styles.img} source={require('../../assets/weixin.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={this.qqLogin.bind(this)}>
                            <Image style={styles.img} source={require('../../assets/qq.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={this.wbLogin.bind(this)}>
                            <Image style={styles.img} source={require('../../assets/pyq.png')}/>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}
const styles = {
    viewButton: {
        backgroundColor: 'pink',
        marginTop: 120,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn: {
        width: 100,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.24)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: theme.DefaultFontSize + 2
    },
    logo: {
        marginTop: 40,
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    box: {justifyContent: 'center', alignItems: 'center'},
    imgBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    img: {
        width: 60,
        height: 60
    }
};
