import React, {Component} from "react";
import {Modal, View, Image, ListView,WebView,Dimensions} from "react-native";
import {Icon,Button, ListItem, Text} from "native-base";
import {observer} from "mobx-react/native";


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
            zu:{}
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
                    <View style={{width:'100%',height:80,borderBottomWidth:1,borderBottomColor:'#cecece',justifyContent:'center',alignItems:'center'}}>
                        <Image/>
                        <Text style={{fontSize:16}}>
                            成功加入私人订制
                        </Text>

                    </View>
                    <View style={{width:'100%',height:200}}>
                        <WebView uri={urls.pages.MODIFICATIONTIME}/>
                    </View>





                </View>


            </Modal>
        )
    }



    /**
     * 打开对话框
     * @param data
     */
    show(data,zu) {
        let state = {
            visible: true,
            text: data,
            zu:zu
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





