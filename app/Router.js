import React, {Component} from "react";
import {Platform} from "react-native";
import {Router, Scene, Reducer} from "react-native-router-flux";
import Start from "./views/login/Start";
import Index from "./views/index/Index";
import Login from "./views/login/Login";
import Register from "./views/login/Register";
import StartInformation from "./views/login/StartInformation";
import GetPassword2 from "./views/login/GetPassword2";
import GetPassword1 from "./views/login/GetPassword1";
import CityPick from "./views/login/CityPick";
import ArticleDetail from "./views/article/ArticleDetail";

import Friend from "./views/friend/Friend";
import FriendApply from "./views/friend/FriendApply";
import BarcodeScannerApp from "./views/friend/components/BarcodeScanner";
import FriendMessage from "./views/friend/FriendMessage";

import Qrcode from "./views/friend/components/Qrcode"
import AgreeFriendApply from "./views/friend/AgreeFriendApply";
import NewFriend from "./views/friend/NewFriend";
import AddFriend from "./views/friend/AddFriend";

import UserDetail from "./views/user/UserDetail";
import RemarkSet from "./views/user/RemarkSet";
import MyInfo from "./views/my/MyInfo";

import Dynamic from "./views/dynamic/Dynamic";
// import NewDynamic from "./views/dynamic/NewDynamic";
// import DynamicDetail from "./views/dynamic/DynamicDetail";
// import DynamicPicture from "./views/dynamic/DynamicPicture";


import About from "./views/about/About";
import UserAgreement from "./views/about/UserAgreement";
import PrivacyStatement from "./views/about/PrivacyStatement";
import Collection from "./views/collection/Collection";
import Activity from "./views/activity/Activity";
import OfTheHill from "./views/of-the-hill/OfTheHill";
import Consult from "./views/consult/Consult";

export default class FudaoRouter extends Component {
    render() {
        return (
            <Router hideNavBar>
                <Scene key="root" hideNavBar>
                    <Scene key="start" component={Start} title="启动页" hideNavBar initial/>
                    <Scene key="index" component={Index} hideNavBar />
                    <Scene key="register" component={Register} title="注册" hideNavBar/>
                    <Scene key="login" component={Login} title="登录" hideNavBar/>
                    <Scene key="startInformation" component={StartInformation} title="基本信息" chideNavBar/>
                    <Scene key="getPassword1" component={GetPassword1} title="找回密码" hideNavBar/>
                    <Scene key="getPassword2" component={GetPassword2} title="设置新密码" hideNavBar  />
                    <Scene key="cityPick" component={CityPick} title="选择位置" hideNavBar  />
                    <Scene  key="articleDetail" component={ArticleDetail} title="资讯详情" hideNavBar/>

                    {/*动态*/}
                    <Scene key="dynamic" component={Dynamic} title="圈子" hideNavBar/>
                    {/*<Scene key="newDynamic" component={NewDynamic} title="新动态" hideNavBar/>*/}
                    {/*<Scene key="dynamicDetail" component={DynamicDetail} title="动态详情" hideNavBar/>*/}
                    {/*<Scene key="dynamicPicture" component={DynamicPicture} title="动态图片" hideNavBar/>*/}

                    <Scene key="consult" component={Consult}   title="计划"  />
                    <Scene key="activity" component={Activity}   title="活动"/>
                    <Scene key="ofTheHill" component={OfTheHill}  hideNavBar />
                    {/*关于福道*/}
                    <Scene key="about" component={About} title="关于福道" hideNavBar/>
                    <Scene key="privacyStatement" component={PrivacyStatement} title="隐私声明"  hideNavBar/>
                    <Scene key="userAgreement" component={UserAgreement} title="用户协议" hideNavBar/>
                    {/*收藏*/}
                    <Scene  key="collection" component={Collection} title="收藏" hideNavBar/>
                    {/*好友*/}
                    <Scene key="friend" component={Friend} title="好友" hideNavBar />
                    <Scene key="friendMessage" component={FriendMessage} title="好友信息" hideNavBar />
                    <Scene key="barcodescanner" component={BarcodeScannerApp} title="二维码/条码" hideNavBar/>
                    <Scene key="qrcode" component={Qrcode} title="我的二维码" hideNavBar/>

                    <Scene key="friendApply" component={FriendApply} title="好友申请" hideNavBar/>
                    <Scene key="newFriend" component={NewFriend} title="新的朋友" hideNavBar/>
                    <Scene key="addFriend" component={AddFriend} title="添加好友" hideNavBar/>
                    <Scene key="agreeFriendApply" component={AgreeFriendApply} title="好友验证" hideNavBar/>

                    {/*用户*/}
                    <Scene key="userDetail" component={UserDetail} title="用户详情" hideNavBar />
                    <Scene key="remarkSet" component={RemarkSet} title="设置备注" hideNavBar/>
                    {/*我的*/}
                    <Scene key="myInfo" component={MyInfo} title="我的信息" hideNavBar />
                </Scene>
            </Router>
        )
    }
}

