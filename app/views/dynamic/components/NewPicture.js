import React, {Component} from "react";
import {View, Image, TouchableHighlight} from "react-native";
import Video from "react-native-video";
import {Actions} from "react-native-router-flux";

/**
 * 上传图片
 */
export default class NewPicture extends Component {
    state = {
        paused: false,
    }


    render() {
        var {imgArr, addImage, delImage, videoPath, delVideo, imgUpload} = this.props;

        // alert(JSON.stringify(imgArr))
        var item = imgArr.map((p, i) => {
            return (
                <TouchableHighlight key={i} onPress={() => delImage(i)} underlayColor='#fafafa'>
                    <Image source={p} style={styles.addPicture}/>
                </TouchableHighlight>
            )
        });
        let arr_video = [];
        // if (videoPath) {
        //
        //     if (imgUpload.length>0&&imgUpload[0].indexOf(".mp4") > 0) {
        //         arr_video = imgUpload[0].split(',');
        //
        //         return (
        //             <TouchableHighlight style={styles.pictureView} underlayColor='#fafafa'>
        //                 <View>
        //                     <Image source={{uri: urls.getImage(arr_video[0])}} style={styles.newVideo}/>
        //                     <Image source={require('../assets/videoType.png')} style={styles.videoType}/>
        //                 </View>
        //             </TouchableHighlight>
        //         )
        //     }
        // }

        return videoPath ? (
            <TouchableHighlight style={styles.pictureView} underlayColor='#fafafa' onPress={()=>Actions['videoDetail']({path:videoPath,from:'new'})}>
                <View>
                    {/*<Video source={{uri: videoPath}}*/}
                           {/*style={styles.newVideo} paused={this.state.paused}*/}
                           {/*rate={0} volume={1} muted={true} onLoadStart={this.loadStart.bind(this)}*/}
                           {/*resizeMode="cover" repeat={true} key="video1"/>*/}
                    <Image source={{uri:videoPath}} style={styles.newVideo}/>
                    <Image source={require('../assets/videoType.png')} style={styles.videoType}/>
                </View>
            </TouchableHighlight>
        ) : (
            <View style={styles.pictureView}>
                {item}

                {imgArr.length<9?(
                    <TouchableHighlight onPress={() => addImage()} underlayColor='#fafafa'>
                        <Image source={require('../assets/addPicture.png')} style={styles.addPicture}/>
                    </TouchableHighlight>
                ):null}

            </View>
        )
    }

    loadStart() {
        let that = this;
        setTimeout(function () {
            that.setState({paused: true})
        }, 100)

        // this.setState({ paused: true })

    }

    //
    // selectPhotoTapped() {
    //     const {dispatch} = this.props;
    //     dispatch(selectPhotoTapped())
    // }


}

const styles = {
    pictureView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        alignItems: 'flex-start',
    },
    addPicture: {
        width: 68,
        height: 68,
        marginLeft: 10,
        marginBottom: 10,
    },
    newVideo: {
        width: 68,
        height: 68,
        marginLeft: 10,
        marginBottom: 10,
    },
    videoType: {
        position: 'absolute',
        top: 15,
        left: 22,
        width: 40,
        height: 40,
    }
}


NewPicture.propTypes = {
    addImage: React.PropTypes.func,
};