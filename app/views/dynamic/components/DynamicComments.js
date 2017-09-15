import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, ToastAndroid} from "react-native";
import styles from "../assets/styles";

/**
 * 动态
 */
export default class DynamicComments extends Component {
    render() {
        let {comments} = this.props;
        if (comments) {
            let comment = comments.map((p, i) => {
                return (
                    <View key={i} style={styles.oneComment}>
                        <Text style={styles.commentName}>
                            {p.user.nickname||"用户"+JSON.stringify(p.user.id).substr(0,4)}:
                        </Text>
                        <Text style={styles.commentContent}>
                            {p.content}
                        </Text>
                    </View>
                )
            })
            return (
                <View style={styles.allComments}>
                    {comment}
                </View>
            )
        }
        return (null);
    }
}
