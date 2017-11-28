import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableHighlight,TouchableOpacity} from "react-native";
import DynamicImage from './DynamicImage';
import NewShare from './NewShare';
import {Actions} from "react-native-router-flux";
import dynamicStore from "../../../mobx/dynamicStore";
import userStore from "../../../mobx/userStore";

/**
 * 动态公共部分
 */
export default class DynamicCommonDetail extends Component {
    render() {
        let {info} = this.props;
        if (!info.user) {
            return null;
        }
        return (
            <View style={styles.dynamicCommon}>
                <TouchableOpacity activeOpacity={1} onPress={()=>userStore.loginUser.id!=info.user.id?Actions.friendMessage({userId: info.user.id}):null}>
                    <Image source={{uri: urls.getImage(info.user.photo,500,500)}} style={styles.dynamicTouxiang}/>
                </TouchableOpacity>
                <TouchableHighlight style={styles.dynamicDetail} underlayColor='#fafafa'
                                    onPress={this._skipToDetail.bind(this)}>
                    <View>
                        <Text
                            style={styles.dynamicName}>{info.user.friendremark ||p.user.nickname||info.user.phone || "用户" + JSON.stringify(info.user.id).substr(1, 4)}</Text>
                        <View style={styles.dynamicContain}>
                            <Text style={styles.dynamicContent}>{info.content}</Text>
                            {info.type==2||info.type==6?(<DynamicImage imagePath={info.path}/>):null}
                            {info.type==3||info.type==4||info.type==5?(<NewShare id={info.path} type={info.type} from="list"/>):null}

                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _skipToDetail() {
        let {info,from,newnew} = this.props;

        if(from=='list'){
            dynamicStore.dynamicDetail(info);
            Actions.dynamicDetail({newnew})
        }
        // const {dispatch} = this.props;
        // dispatch(skipToDetail(this.props.info, this.props.newnew));
    }

}

const styles = {
    dynamicCommon: {
        flexDirection: 'row',
    },
    dynamicDetail: {
        flex: 1,
        marginTop: 10,
    },
    dynamicTouxiang: {
        width: 50,
        height: 50,
        marginRight: 12,
        borderRadius: 25,
        overflow: 'hidden',
        borderColor: '#CECECE',
        borderWidth: 0.5,
    },
    dynamicName: {
        color: '#786e7f',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContent: {
        color: '#282828',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContain:{
        marginTop: 6,
        padding:10,
        // backgroundColor:'#f3f3f5'
    }
};

DynamicCommonDetail.propsTypes = {
    info: React.PropTypes.object,
};
DynamicCommonDetail.defaultProps = {
    info: {},
};

