import React, {Component} from "react";
import {View, Image, Text,ScrollView,WebView,Dimensions,Platform,TouchableOpacity,Alert} from "react-native";
import {Actions, ActionConst} from "react-native-router-flux";
import {Container, Content, Header,TitleHeader} from "../../components";

import {Body, Icon, Left, ListItem, Right,Button} from "native-base";
import ImagePicker from "react-native-image-picker";
import {observer} from "mobx-react/native";
import userStore from "../../mobx/userStore";
import QRCode from 'react-native-qrcode';


const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const defaultPhoto = require('../../assets/avatar.jpg');

const Item = props => {
    return (
        <ListItem
            icon
            style={{backgroundColor:'#E3E7F3',marginLeft: 0,paddingLeft: 15,borderBottomWidth:1}}
        >
            <Left>
                <Text>{props.title}</Text>
            </Left>
            <Body>

            </Body>

            <Right>
                <Text>{props.name}</Text>
            </Right>
        </ListItem>
    );
}

@observer
export default class MyInfo extends Component {
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response && response.fileName && response.uri) {
                userStore.updateUserPhoto(response.uri, response.fileName);
            }
        })
    }

    render() {
        const {loginUser} = userStore;
        return (
            <Container>
                <Header {...this.props}/>
                <Content white>
                    <View style={{width:'100%',height:'24%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.cameraAction()}>
                            <Image style={styles.myPhoto} source={loginUser.photo ? {uri: urls.getImage(loginUser.photo, 300, 300)} : defaultPhoto}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{width:'100%',height:'60%'}}>
                        <Item title="昵称" name="本尊"/>
                        <Item title="性别" name="男"/>
                        <Item title="出生日期" name="1992-07-20"/>
                        <View
                            style={{backgroundColor:'#E3E7F3',marginLeft: 0,paddingLeft: 15,paddingTop:10}}
                        >
                            <Text>我的二维码</Text>
                        </View>
                        <View
                            style={{backgroundColor:'#E3E7F3',marginLeft: 0,paddingLeft: 15,paddingTop:20,paddingBottom:20,height:160}}
                        >
                            <Body>
                                <View style={{width:120,height:120,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                    <QRCode
                                        value={userStore.phone}
                                        size={100}
                                        bgColor='purple'
                                        fgColor='white'/>
                                </View>
                            </Body>
                        </View>

                    </View>
                    <View style={{width:'100%',height:'30%',flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:200,height:40,backgroundColor:'#726585',justifyContent:'center'}} onPress={this.quitAlert.bind(this)}>
                            <Text style={{color:'#fff'}}>退出登录</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
    quitAlert() {
        Alert.alert('提示信息', '确定要退出吗？', [
            {text: '取消'},
            {text: '确定', onPress: () => this.quit()},
        ])
    }

    quit() {
        userStore.logout();
        tools.showToast(JSON.stringify(ActionConst))
        Actions.start();
    }
}

const styles = {
    myCover: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E7F3',
        padding: 15,
        marginTop: 15,
        marginBottom: 30
    },
    myPhoto: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    myInfo: {
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
    }
};
