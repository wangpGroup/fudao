import React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Video from 'react-native-video'
import {Actions} from "react-native-router-flux";

export default class VideoDetail extends React.Component {

    render() {
        let {imagePath} = this.props;
        return (
        <TouchableOpacity onPress={Actions.pop} style={{flex: 1}} activeOpacity={1}>
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Video source={{uri: urls.getImage(imagePath)}}
                       style={styles.backgroundVideo}
                       rate={1} volume={1} muted={true}
                       resizeMode="cover" repeat={true} key="video1"/>
            </View>
        </TouchableOpacity>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});