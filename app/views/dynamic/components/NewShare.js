import React, {Component} from "react";
import {View, Image, TouchableHighlight, Text} from "react-native";
import Video from "react-native-video";
import {Actions} from "react-native-router-flux";

/**
 * 圈子分享内容
 */
export default class NewShare extends Component {
    state = {
        title: '',
        img: '',
        effect:''
    };

    componentWillMount() {
        let {id, type, from} = this.props;
        if (type == 3) {
            request.getJson(urls.apis.IMGAPI_GETSHAREARTICLE, {
                id
            }).then((res) => {
                if (res.ok) {
                    this.setState({
                        title: from == 'list' ? res.obj.title.substring(0, 10) + (res.obj.title.length > 10 ? '...' : '') : res.obj.title.substring(0, 15) + (res.obj.title.length > 10 ? '...' : ''),
                        img: res.obj.img.split(',')[0]
                    })
                }
            })
        } else if (type == 4) {
            request.getJson(urls.apis.ACTIVITY_GETONEACTTIVITY, {
                actId: id
            }).then((res) => {
                if (res.ok) {
                    this.setState({
                        title: from == 'list' ? res.obj.activity.name.substring(0, 10) +  (res.obj.activity.name.length > 10 ? '...' : '') : res.obj.activity.name.substring(0, 15) +  (res.obj.activity.name.length > 10 ? '...' : ''),
                        effect: from == 'list' ? res.obj.activity.effect.substring(0, 10) +  (res.obj.activity.effect.length > 10 ? '...' : '') : res.obj.activity.effect.substring(0, 15) +  (res.obj.activity.effect.length > 10 ? '...' : ''),
                        img: res.obj.activity.pic_path
                    })
                }
            })
        }else if (type==5){

            request.getJson(urls.apis.GETONEACTTIVITYGROUP, {
                groupId: id
            }).then((res) => {
                if (res.ok) {
                    this.setState({
                        title: from == 'list' ? res.obj.activityGroup.group_name.substring(0, 10) +  (res.obj.activityGroup.group_name.length > 10 ? '...' : '') : res.obj.activityGroup.group_name.substring(0, 15) +  (res.obj.activityGroup.group_name.length > 10 ? '...' : ''),
                        effect: from == 'list' ? res.obj.activityGroup.effect.substring(0, 10) +  (res.obj.activityGroup.effect.length > 10 ? '...' : '') : res.obj.activityGroup.effect.substring(0, 15) +  (res.obj.activityGroup.effect.length > 10 ? '...' : ''),
                        img: res.obj.activityGroup.activitys[0].pic_path
                    })
                }
            })
        }

    }

    render() {
        let {id, type} = this.props;
        let {title, img,effect} = this.state;
        return (
            <TouchableHighlight onPress={this.actionsPush.bind(this)}>
                <View style={styles.pictureView}>
                    {img == '' || img == '无' ? <Image source={require('../assets/bj.jpg')} style={styles.image}/> :
                        <Image source={{uri: urls.getImage(img)}} style={styles.image}/>}
                    {type == 3 ? (
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                    ) : (
                        <View style={styles.titleViewActivity}>
                            <View>
                                <Text style={styles.titleTextActivity}>{title}</Text>
                            </View>
                            <View>
                                <Text style={styles.effectTextActivity}>{effect}</Text>
                            </View>

                        </View>
                    )}

                </View>
            </TouchableHighlight>
        )

    }

    actionsPush() {
        let {id, type} = this.props;
        if (type == 3) {
            Actions.articleDetail({
                articleId: id
            })
        }else if(type==4){
            Actions.partActionRepositorydetails({
                id
            })

        }else if(type == 5){
            Actions.groupActionRepositorydetails({
                id
            })
        }

    }


}

const styles = {
    pictureView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#eee',
        height: 60,
        width: '100%',
    },
    image: {
        width: 44,
        height: 44,
        margin: 8,
        marginLeft: 12,
    },
    titleView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    titleText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '400',
        paddingTop: 20,
    },
    titleViewActivity: {
        flexDirection: 'column',
    },
    titleTextActivity: {
        fontSize: 14,
        color: '#000',
        fontWeight: '400',
        paddingTop: 10,
    },
    effectTextActivity:{
        paddingTop:3,
        fontSize: 12,

    }

}


NewShare.propTypes = {
    addImage: React.PropTypes.func,
};