import React, {Component} from "react";
import {Modal, View, Image, ListView,WebView,Dimensions,ScrollView} from "react-native";
import {Text} from "native-base";
import {observer} from "mobx-react/native";
/**
 * 我的能量场 > 资料填写
 */
@observer
export default  class Layout extends Component {


    render() {
        let arr=[];
        if(this.props.activity.activitys){
            arr=this.props.activity.activitys
        };



        return (
            <ScrollView style={styles.content}>
                <View style={{width:'100%',height:60,borderBottomWidth:1,borderBottomColor:'#cecece',alignItems:'center'}}>
                    <Text style={{fontSize:16,lineHeight:30,}}>
                        {this.props.num==1?this.props.activity.group_name:this.props.activity.name}
                    </Text>
                </View>
                {this.props.num==1&&this.props.activity.activitys?arr.map((i,k)=>(
                        <View key={k}>
                            <View style={{height:64,backgroundColor:'#eeeeee',flexDirection:'row',marginTop:15}}>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#ccc',margin:4}}>
                                    <Image source={require('../image/play.png')}
                                           style={{width: 56, height: 56}}/>
                                </View>
                                <Text style={{lineHeight:45}}>
                                    {i.name}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, }}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        原理：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {i.effect}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, }}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        方法：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {i.act_method}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10,}}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        注意：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {i.attention}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10,}}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        禁忌：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {i.taboo}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )

                ):(
                    null
                )}
                {this.props.num==2?(
                        <View >
                            <View style={{height:64,backgroundColor:'#eeeeee',flexDirection:'row',marginTop:15}}>
                                <View style={{width:56,height:56,borderWidth:1,borderColor:'#ccc',margin:4}}>
                                    <Image source={require('../image/play.png')}
                                           style={{width: 56, height: 56}}/>
                                </View>
                                <Text style={{lineHeight:45}}>
                                    {this.props.activity.name}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, }}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        原理：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {this.props.activity.effect}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, }}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        方法：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {this.props.activity.act_method}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10,}}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        注意：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {this.props.activity.attention}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10,}}>
                                <View style={{width: '15%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        禁忌：
                                    </Text>
                                </View>

                                <View style={{width: '85%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
                                        {this.props.activity.taboo}
                                    </Text>
                                </View>
                            </View>
                        </View>


                ):(
                    null
                )}

            </ScrollView>
        )
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


 ;


