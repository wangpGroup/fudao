import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableHighlight} from "react-native";
import DynamicImage from './DynamicImage';
import {Actions} from "react-native-router-flux";
import dynamicStore from "../../../mobx/dynamicStore";

/**
 * 动态公共部分
 */
export default class DynamicCommon extends Component {
    render() {
        let {info} = this.props;
        if (!info.user) {
            return null;
        }
        return (
            <View style={styles.dynamicCommon}>
                <View>
                    <Image source={{uri: urls.getImage(info.user.photo, 700, 500)}} style={styles.dynamicTouxiang}/>
                </View>
                <TouchableHighlight style={styles.dynamicDetail} underlayColor='#fafafa'
                                    onPress={this._skipToDetail.bind(this)}>
                    <View>
                        <Text
                            style={styles.dynamicName}>{info.user.nickname || "用户" + JSON.stringify(info.user.id).substr(0, 4)}</Text>
                        <View style={styles.dynamicContain}>
                            <Text style={styles.dynamicContent}>{info.content}</Text>
                            <DynamicImage imagePath={info.path}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _skipToDetail() {
        let {info} = this.props;
        dynamicStore.dynamicDetail(info);
        Actions.dynamicDetail()
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
        marginTop: 14,
    },
    dynamicTouxiang: {
        width: 50,
        height: 50,
        marginRight: 12,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: '#CECECE',
        borderWidth: 0.5,
    },
    dynamicName: {
        color: '#786e7f',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContent: {
        marginTop: 6,
        color: '#282828',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContain:{
        // padding
    }
};

DynamicCommon.propsTypes = {
    info: React.PropTypes.object,
};
DynamicCommon.defaultProps = {
    info: {},
};

