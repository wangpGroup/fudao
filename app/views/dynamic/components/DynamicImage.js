import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import {View, TouchableHighlight, Image,NativeModules} from "react-native";
import Video from "react-native-video";


/**
 * 动态
 */
class DynamicImage extends Component {
    state={
        paused:false,
    };

    render() {
        let {imagePath} =this.props;
        if(imagePath.indexOf(".mp4") > 0 ){
            return (
                <TouchableHighlight style={styles.allImage} underlayColor="#fafafa" onPress={()=>Actions['videoDetail']({imagePath})}>
                    <Video source={{uri: urls.getImage(imagePath)}}
                           style={styles.newVideo}
                           rate={0} volume={1} muted={true}
                           resizeMode="cover" repeat={true} key="video1"/>

                </TouchableHighlight>
            )
        }else{
            if (imagePath) {
                var arr_pic = imagePath.split(',');
                let pic = arr_pic.map((p, i) => {
                    return (
                        <TouchableHighlight key={i} onPress={() => Actions['dynamicPicture']({image: imagePath, i: i})}
                                            style={styles.imageTouch}>
                            <Image source={{uri: urls.getImage(p, 650, 650)}} style={styles.msgImage} />
                        </TouchableHighlight>
                    )
                });
                return (
                    <View style={styles.allImage}>
                        {pic}
                    </View>
                )
            }
        }



        return (null);
    }

    loadStart(){
        let that = this;
        setTimeout(function(){
            that.setState({ paused: true })
        },100)
    }

}

const styles = {
    imageTouch: {
        marginRight: 7,
        width: 78,
        height: 78,
        marginBottom:3,
        marginTop:2,
    },
    allImage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    msgImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
    },
    newVideo:{
        width: 78,
        height: 78,
        marginLeft: 10,
        marginBottom: 10,
    }
};

DynamicImage.propsTypes = {
    imagePath: React.PropTypes.string,
};
DynamicImage.defaultProps = {
    imagePath: "",
};

export default (DynamicImage);
