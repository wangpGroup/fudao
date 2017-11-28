/**
 * Created by Administrator on 2017/11/20.
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, Alert,StyleSheet, Dimensions, Modal, Text, Image,ScrollView} from 'react-native';
// import Separator from "./Separator";

const {width, height} = Dimensions.get('window');
const dialogH = 160;

export default class ShareAlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <Text style={styles.title}>分享到</Text>
                <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.qzShare.bind(this)}>
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/quanzi.png')}/>
                            <Text  style={styles.font}>圈子</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.haoyouShare.bind(this)}>
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/haoyou1.png')}/>
                            <Text  style={styles.font}>好友</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.wxShare.bind(this)} >
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/wx.png')}/>
                            <Text style={styles.font}>微信好友</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.wxpyqShare.bind(this)} >
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/pengyouquan.png')}/>
                            <Text  style={styles.font}>朋友圈</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.item} activeOpacity={1} onPress={this.props.wbShare.bind(this)}>
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/weibo.png')}/>
                            <Text  style={styles.font}>微博</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.qqShare.bind(this)}>
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/QQ_share.png')}/>
                            <Text  style={styles.font}>QQ好友</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this.props.qqkjShare.bind(this)}>
                            <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/qqZone.png')}/>
                            <Text  style={styles.font}>QQ空间</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                    <TouchableOpacity onPress={() => this.closeModal()}>
                        <View >
                            <TouchableOpacity style={styles.item} activeOpacity={1}  onPress={() => this.closeModal()} >
                                <Image  resizeMode='contain' style={styles.image} source={require('../../../assets/close.png')}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {

        return (
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} activeOpacity={1}
                                      onPress={() => this.closeModal()}>
                        {this.renderDialog()}
                    </TouchableOpacity>
                </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalStyle: {
        /*position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: dialogH,
        backgroundColor:"red"*/
    },
    subView: {
        width: width,
        height: dialogH,
        backgroundColor: '#ffffff'
    },
    text: {
        flex: 1,
        fontSize: 18,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    item: {
        width: width / 4,
        alignItems: 'center',
        justifyContent: 'center',
        height:100
    },
    image: {
        width: 46,
        height: 46,
        marginBottom: 8
    },
    imgBox:{
        height:80,
        width:'100%',
    },
    view:{
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff',
        width:'100%',
        height:120,
    },
    quxiao:{
        textAlign:"center",
        lineHeight:30,
        fontSize:16,
        color:'#4f4351'
    },
    font:{
        fontSize:12,
        color:'#fff'
    },
    title:{
        color:'#fff',
        fontSize:16,
        marginBottom:10,
        textAlign:"center"
    },
    btn: {
        /*backgroundColor:'pink',*/
        width:100,
        justifyContent:'center',
        alignItems:'center'

    },
    img: {
        width: 40,
        height: 40
    }
});



