import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image} from "react-native";
import styles from "../assets/styles";

/**
 * 动态头部
 */
export default class DynamicHeader extends Component {
    render() {
        let {user} = this.props;
        return (
            <View>
                <View style={styles.content1}>
                    <Image source={require('../assets/bj.jpg')} style={styles.bgImg}/>
                </View>
                <View style={styles.person}>
                    <Text style={styles.colorfff}>本  尊</Text>
                    {/*<Text style={styles.color9b}>{user.nickname||"用户"+JSON.stringify(user.id).substr(0,4)}</Text>*/}
                </View>
                <View style={styles.touxiangView}>
                    <Image source={{uri: urls.getImage(user.photo, 700, 500)}} style={styles.touxiang}/>
                </View>
            </View>
        )
    }
}

DynamicHeader.propTypes = {
    article: React.PropTypes.object, // 资讯
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
}
