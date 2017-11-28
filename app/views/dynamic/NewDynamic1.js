import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Right, Button, Left, Text, Body, Title} from "native-base";
import {Image, View, DeviceEventEmitter, TextInput, TouchableHighlight, TouchableOpacity, Alert} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Camera from 'react-native-camera';
import {Container, Header, Content} from "../../components/index";
import dynamicStore from "../../mobx/dynamicStore";
import Editor from './components/Editor'
import NewPicture from './components/NewPicture'
import NewShare from './components/NewShare'
import {Actions} from "react-native-router-flux";
import DialogSelected from './components/AlertSelect'
const selectedArr = ["拍摄", '从手机相册选择'];
/**
 * 动态
 */
@observer
export default class NewDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    componentWillMount() {

    }

    render() {
        let {right, imgList, imgUpload, changeImg, videoPath} = dynamicStore;
        let {leixing,id} = this.props;

        return (
            <Container>
                <Header  {...this.props} right={
                    <Right style={{flex: 1}}>
                        <Button transparent onPress={this.send.bind(this)}><Text style={{color: '#000'}}>{right}</Text></Button>
                    </Right>
                } left={
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => Actions.pop()}><Text
                            style={{color: '#000'}}>取消</Text></Button>
                    </Left>
                }/>
                <Content white>
                    <Editor
                        placeholder="说点什么吧..."
                        onChangeText={(text) => {
                            this.setState({text: text})
                        }}
                        text={this.state.text}/>
                    {!leixing ? <NewPicture
                        changeImg={changeImg}
                        videoPath={videoPath}
                        imgArr={imgList}
                        imgUpload={imgUpload}
                        addImage={this.addImage.bind(this)}
                        // delVideo={this.delVideo.bind(this)}
                        delImage={this.delImage.bind(this)}/> : null}
                    {leixing ? (
                        <View style={styles.containerView}>
                            <NewShare id={id} type={leixing}/>
                        </View>
                    ): null}

                </Content>
                <DialogSelected ref={(dialog) => {
                    this.dialog = dialog;
                }}/>
                <DialogSelected ref={(dialog) => {
                    this.dialog1 = dialog;
                }}/>

            </Container>
        )
    }

    addImage() {
        let {imgList} = dynamicStore;
        if(imgList.length>0){
            this.dialog.show("请选择", ['拍照','从手机相册选择'], '#333333', this.callbackSelectedPic.bind(this));

        }else{
            this.dialog.show("请选择", selectedArr, '#333333', this.callbackSelected.bind(this));
        }

    }

    callbackSelected(i) {
        switch (i) {
            case 0: // 拍照
                this.dialog1.show("请选择", ['拍照', '视频'], '#333333', this.callbackSelectedNow.bind(this));
                // this.takePhoto();
                break;
            case 1: // 图库
                this.dialog1.show("请选择", ['从手机相册选择相片', '从手机相册选择视频'], '#333333', this.callbackSelectedBefore.bind(this));
                // Actions.cameraVideo();
                break;

        }
    }

    callbackSelectedNow(i) {
        switch (i) {
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 视频
                Actions.cameraVideo();
                break;
        }
    }

    callbackSelectedBefore(i) {
        switch (i) {
            case 0: // 从手机相册选择相片
                this.pickPhoto();
                break;
            case 1: // 从手机相册选择视频
                this.pickVideo();
                break;

        }
    }

    callbackSelectedPic(i) {
        switch (i) {
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 从手机相册选择相片
                this.pickPhoto();
                break;

        }
    }


    takePhoto() {
        ImagePicker.openCamera({
            includeBase64: true,
            mediaType: 'any'
        }).then(image => {
            dynamicStore.uploadImg(image)
        }).catch(e => alert(e));
    }

    pickPhoto() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            mediaType: 'photo'
        }).then(images => {
            dynamicStore.uploadImg(images, true)

        }).catch(e => alert(e));
    }

    pickVideo() {
        ImagePicker.openPicker({
            waitAnimationEnd: false,
            mediaType: 'video'
        }).then(images => {
            dynamicStore.refreshNewVideo(images.path)

        }).catch(e => alert(e));
    }


    delImage(i) {
        Alert.alert('', '确定删除图片吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.delImg(i)
            }
        ])
    }

    delVideo(i) {
        Alert.alert('', '确定删除视频吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.delVideo()
            }
        ])
    }

    send() {
        let {text} = this.state;
        let {leixing,id} =this.props;
        if (text || dynamicStore.imgList.length > 0 || dynamicStore.videoPath || leixing) {
            if (!leixing) {
                dynamicStore.addNewDynamic(text)
            } else {
                dynamicStore.addNewDynamic(text, leixing, id)
            }
        } else {
            Alert.alert('', '内容不能为空~~', [{text: '确定'}])
        }
    }
}

const styles = {
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: '#fff'
    },
    textInput: {
        height: 100,
    },
    containerView: {
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
    },
}