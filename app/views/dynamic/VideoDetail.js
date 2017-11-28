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
import dynamicStore from "../../mobx/dynamicStore";

export default class VideoDetail extends React.Component {

    render() {
        let {imagePath,path,from} = this.props;
        return (
        <TouchableOpacity onPress={Actions.pop} style={{flex: 1}} activeOpacity={1}>
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Video source={{uri: from=='new'?path:urls.getImage(imagePath)}}
                       style={styles.backgroundVideo}
                       rate={1} volume={1.0} muted={false}
                       resizeMode="cover" repeat={true} key="video1"/>
                {from=='new'?(
                    <View style={[styles.overlay, styles.topOverlay]}>
                        <TouchableOpacity
                            style={styles.typeButton}
                            onPress={this.delVideo.bind(this)}
                        >
                            <Image
                                source={require('./assets/delVideo.png')}
                                style={styles.del}
                            />
                        </TouchableOpacity>

                    </View>
                ):null}
            </View>
        </TouchableOpacity>

        );
    }

    delVideo(){
        dynamicStore.delVideo()
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
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    typeButton: {
        padding: 5,
    },
    del:{
        width:24,
        height:24
    }
});