import React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Video from 'react-native-video'
import {Actions,ActionConst} from "react-native-router-flux";
import dynamicStore from "../../mobx/dynamicStore";


export default class RecVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let {data} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Video source={{uri: data.path}}
                       style={styles.backgroundVideo}
                       rate={1} volume={1} muted={true}
                       resizeMode="cover" repeat={true} key="video1"/>

                <View style={[styles.overlay, styles.bottomOverlay]}>
                    {/*<View style={styles.buttonsSpace} />*/}
                    <TouchableOpacity onPress={() => Actions.pop()}
                                      style={styles.captureButton}
                    >
                        <Image
                            style={{width: 36, height: 36}}
                            source={require('./assets/fanhui.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.recOk.bind(this)}
                        style={styles.captureButton}
                    >
                        <Image
                               style={{width: 36, height: 36}}
                               source={require('./assets/dui.png')}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    recOk() {
        let {data} = this.props;

        Actions.newDynamic({type:ActionConst.POP_TO});
        dynamicStore.refreshNewVideo(data.path)
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
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonsSpace: {
        width: 10,
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
});